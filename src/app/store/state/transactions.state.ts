import { TransactionsService } from "./../../services/transactions.service";
import {
  LoadTransactionsDates,
  LoadTransactionsDatesSuccess,
  LoadTransactionsDatesFail,
  UpdateCurrentTransactionDate
} from "./../actions/transactions.actions";
import { TransactionDatesData, TransactionDate } from "./../../models/date-transaction.model";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { map, catchError, tap } from "rxjs/operators";

export interface TransactionsStateModel {
  dates: TransactionsDatesStateModel;
}

export interface TransactionsDatesStateModel {
  loading: boolean;
  failed: boolean;
  data: TransactionDatesData[];
  currentDate: TransactionDate;
}

const TransactionsDatesDefaultState: TransactionsDatesStateModel = {
  loading: false,
  failed: false,
  data: [],
  currentDate: null
};

@State<TransactionsStateModel>({
  name: "Transactions",
  defaults: {
    dates: TransactionsDatesDefaultState
  }
})
export class TransactionsState {
  @Selector() static TransactionsDates(state: TransactionsStateModel): TransactionsDatesStateModel { return state.dates }
  @Selector() static CurrentTransactionDate(state: TransactionsStateModel): TransactionDate { return state.dates.currentDate }

  constructor(private transactionsService: TransactionsService) {}

  @Action(LoadTransactionsDates)
  LoadTransactionsDates({
    dispatch,
    getState,
    patchState
  }: StateContext<TransactionsStateModel>) {
    patchState({ dates: { ...getState().dates, loading: true } });
    return this.transactionsService.getDateTransactions().pipe(
      map((tDates: TransactionDatesData[]) => dispatch(new LoadTransactionsDatesSuccess(tDates))),
      catchError(err => dispatch(new LoadTransactionsDatesFail(err)))
    );
  }

  @Action(LoadTransactionsDatesSuccess)
  LoadTransactionsDatesSuccess(
    { getState, patchState }: StateContext<TransactionsStateModel>,
    { payload }: LoadTransactionsDatesSuccess
  ) {
    patchState({
      dates: {
        ...getState().dates,
        data: payload,
        loading: false,
        failed: false
      }
    });
  }

  @Action(UpdateCurrentTransactionDate)
  UpdateCurrentTransactionDate(
    { getState, patchState }: StateContext<TransactionsStateModel>,
    { payload }: UpdateCurrentTransactionDate
  ) {
    patchState({
      dates: {
        ...getState().dates,
        currentDate: payload
      }
    });
  }
}
