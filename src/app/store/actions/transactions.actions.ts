import { TransactionDatesData, TransactionDate } from "../../models/date-transaction.model";

export class LoadTransactionsDates {
  static readonly type: string = '[ Transactions ] Load Transactions Dates';
}

export class LoadTransactionsDatesSuccess {
  static readonly type: string = '[ Transactions ] Load Transactions Dates Success';
  constructor(public payload: TransactionDatesData[]) {}
}

export class LoadTransactionsDatesFail {
  static readonly type: string = '[ Transactions ] Load Transactions Dates Fail';
  constructor(public payload: any) {}
}

export class UpdateCurrentTransactionDate {
  static readonly type: string = '[ Transactions ] Update Current Transaction Date';
  constructor(public payload: TransactionDate) {}
}
