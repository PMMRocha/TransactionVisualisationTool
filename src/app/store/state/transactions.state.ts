import { ChartType } from './../../components/chart-canvas/chart-canvas.component';
import { DaylyTransaction } from './../../models/date-transaction.model';
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { LoadTransaction, LoadTransactionSuccess, UpdateCurrentTransaction, UpdateCurrentChartDisplay } from "../actions/transactions.actions";
import { TransactionsService } from "../../services/transactions.service";
import { switchMap, map, tap } from "rxjs/operators";
import { convertToJson, transactionsArrayToMap } from "../../utils/transactions.utils";
import * as Chart from "chart.js";

export interface TransactionsStateModel {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Map<string, DaylyTransaction>;
  currentTransaction: DaylyTransaction;
  currentChartDisplay: ChartType;
  transactionsChart: Chart;
}

const TransactionsDefaultState: TransactionsStateModel = {
  loading: false,
  loaded: false,
  failed: false,
  data: new Map(),
  currentTransaction: null,
  currentChartDisplay: ChartType.PIE,
  transactionsChart: null
};

@State<TransactionsStateModel>({
  name: "Transactions",
  defaults: TransactionsDefaultState
})
export class TransactionsState {
  @Selector() static Transactions(state: TransactionsStateModel): Map<string, DaylyTransaction> { return state.data };
  @Selector() static CurrentTransaction(state: TransactionsStateModel): DaylyTransaction { return state.currentTransaction };

  constructor(private transactionsService: TransactionsService) {}

  @Action(LoadTransaction)
  LoadTransaction(
    { dispatch, patchState }: StateContext<TransactionsStateModel>,
    { payload }: LoadTransaction
  ): any {
    patchState({ loading: true, loaded: false });
    return this.transactionsService
      .getTransaction(payload.month, payload.year)
      .pipe(
        switchMap(convertToJson),
        map((transactionsArray: string[][]) => {
          transactionsArray.shift();
          dispatch(new LoadTransactionSuccess(transactionsArrayToMap(transactionsArray)));
          dispatch(new UpdateCurrentTransaction(payload.mapKey()));
        })
      );
  }

  @Action(LoadTransactionSuccess)
  LoadTransactionSuccess(
    { getState, patchState }: StateContext<TransactionsStateModel>,
    { payload }: LoadTransactionSuccess
  ): void {
    const a = Array.from( getState().data );
    const b = Array.from( payload );
    const resultMap = new Map( [...a, ...b] );
    patchState({ loading: false, loaded: true, data: resultMap });
  }

  @Action(UpdateCurrentTransaction)
  UpdateCurrentTransaction(
    { getState, patchState }: StateContext<TransactionsStateModel>,
    { payload }: UpdateCurrentTransaction
  ): void {
    patchState({ currentTransaction: getState().data.get(payload) });
  }

  @Action(UpdateCurrentChartDisplay)
  UpdateCurrentChartDisplay(
    { patchState }: StateContext<TransactionsStateModel>,
    { payload }: UpdateCurrentChartDisplay
  ): void {
    patchState({ currentChartDisplay: payload });
  }
}
