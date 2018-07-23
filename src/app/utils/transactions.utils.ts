import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as XLSX from "xlsx";
import { DaylyTransaction } from "../models/date-transaction.model";

enum Transaction {
  DEPARTMENT_FAMILY,
  ENTITY,
  DATE,
  EXPENSE_TYPE,
  EXPENSE_AREA,
  SUPPLIER,
  TRANSACTION_NUMBER,
  AMOUNT,
  INVOICE_CURRENCY_UNIT
}

export const convertToJson = (excelFile: Blob): Observable<any[]> => {
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(excelFile);
  return fromEvent(reader, "load").pipe(
    map((e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* return json data */
      return XLSX.utils.sheet_to_json(ws, { header: 1 });
    })
  );
};

export const transactionsArrayToMap = (array: any[][]): Map<string, DaylyTransaction> => {
  let dataPerDay: Map<string, DaylyTransaction> = new Map();
  array.forEach(
    (daylyTransaction: string[]) => {
      if (daylyTransaction.length !== 9) {
        return;
      }
      const currentDay: string = daylyTransaction[Transaction.DATE];
      if (dataPerDay.has(currentDay) === false) {
        dataPerDay.set(
          currentDay, { total: 0, suppliers: new Map(), expenseType: new Map() }
        );
      }
      dataPerDay.get(currentDay).total += Number(daylyTransaction[Transaction.AMOUNT]);
      // suppliers
      const currentSupplier: string = daylyTransaction[Transaction.SUPPLIER];
      if (dataPerDay.get(currentDay).suppliers.has(currentSupplier) === true) {
        const currentAmount: number = dataPerDay.get(currentDay).suppliers.get(currentSupplier);
        dataPerDay.get(currentDay).suppliers.set(currentSupplier, currentAmount + Number(daylyTransaction[Transaction.AMOUNT]));
      } else {
        dataPerDay.get(currentDay).suppliers.set(currentSupplier, Number(daylyTransaction[Transaction.AMOUNT]));
      }
      // expense type
      const currentExpenseType: string = daylyTransaction[Transaction.EXPENSE_TYPE];
      if (dataPerDay.get(currentDay).expenseType.has(currentExpenseType) === true) {
        const currentAmount: number = dataPerDay.get(currentDay).expenseType.get(currentExpenseType);
        dataPerDay.get(currentDay).expenseType.set(currentExpenseType, currentAmount + Number(daylyTransaction[Transaction.AMOUNT]));
      } else {
        dataPerDay.get(currentDay).expenseType.set(currentExpenseType, Number(daylyTransaction[Transaction.AMOUNT]));
      }
    }
  );

  return dataPerDay;
};
