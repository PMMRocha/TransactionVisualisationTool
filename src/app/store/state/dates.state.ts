import { TransactionsService } from "../../services/transactions.service";
import {
  LoadTransactionsDates,
  LoadTransactionsDatesSuccess,
  LoadTransactionsDatesFail,
  UpdateCurrentTransactionDate
} from "../actions/dates.actions";
import {
  TransactionDatesData,
  TransactionDate
} from "../../models/date-transaction.model";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";

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

@State<TransactionsDatesStateModel>({
  name: "TransactionsDates",
  defaults: TransactionsDatesDefaultState
})
export class TransactionsDatesState {
  @Selector()
  static TransactionsDates(
    state: TransactionsDatesStateModel
  ): TransactionsDatesStateModel {
    return state;
  }
  @Selector()
  static CurrentTransactionDate(
    state: TransactionsDatesStateModel
  ): TransactionDate {
    return state.currentDate;
  }

  constructor(private transactionsService: TransactionsService) {}

  @Action(LoadTransactionsDates)
  LoadTransactionsDates({
    dispatch,
    patchState
  }: StateContext<TransactionsDatesStateModel>) {
    patchState({ loading: true });
    return this.transactionsService.getDateTransactions().pipe(
      map((tDates: TransactionDatesData[]) =>
        dispatch(new LoadTransactionsDatesSuccess(tDates))
      ),
      catchError(err => dispatch(new LoadTransactionsDatesFail(err)))
    );
  }

  @Action(LoadTransactionsDatesSuccess)
  LoadTransactionsDatesSuccess(
    { patchState }: StateContext<TransactionsDatesStateModel>,
    { payload }: LoadTransactionsDatesSuccess
  ) {
    patchState({
      data: payload,
      loading: false,
      failed: false
    });
  }

  @Action(UpdateCurrentTransactionDate)
  UpdateCurrentTransactionDate(
    { patchState }: StateContext<TransactionsDatesStateModel>,
    { payload }: UpdateCurrentTransactionDate
  ) {
    patchState({ currentDate: payload });
  }
}
