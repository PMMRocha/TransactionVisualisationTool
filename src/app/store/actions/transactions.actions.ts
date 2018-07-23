import { DaylyTransaction, TransactionDate } from "../../models/date-transaction.model";

export class LoadTransaction {
  static readonly type: string = '[ Transactions ] Load Transaction';
  constructor(public payload: TransactionDate) {}
}

export class LoadTransactionSuccess {
  static readonly type: string = '[ Transactions ] Load Transaction Success';
  constructor(public payload: Map<string, DaylyTransaction>) {}
}

export class LoadTransactionFail {
  static readonly type: string = '[ Transactions ] Load Transaction Fail';
  constructor(public payload: any) {}
}

// export class CheckCurrentTransaction {
//   static readonly type: string = '[ Transactions ] Check Current Transaction';
//   constructor(public payload: TransactionDate) {}
// }

export class UpdateCurrentTransaction {
  static readonly type: string = '[ Transactions ] Update Current Transaction';
  constructor(public payload: string) {}
}
