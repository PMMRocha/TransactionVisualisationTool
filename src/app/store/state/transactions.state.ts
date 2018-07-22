import { State } from "@ngxs/store";

export interface TransactionsStateModel {
  loading: boolean;
  failed: boolean;
  data: any[];
  currentTransaction: any;
}

const TransactionsDefaultState: any = {
  loading: false,
  failed: false,
  data: [],
  currentTransaction: null
};

@State<TransactionsStateModel>({
  name: "Transactions",
  defaults: TransactionsDefaultState
})
export class TransactionsState {
}
