import { TransactionDate } from "../../models/date-transaction.model";

export class LoadTransaction {
  static readonly type: string = '[ Transactions ] Load Transaction';
  constructor(public payload: TransactionDate) {}
}
