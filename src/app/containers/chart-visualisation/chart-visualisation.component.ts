import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TransactionsState } from "../../store/state/transactions.state";
import { TransactionsStateModel } from './../../store/state/transactions.state';
import { TransactionsDatesState } from "../../store/state/dates.state";
import { TransactionDate } from "../../models/date-transaction.model";
import { UpdateCurrentChartDisplay } from '../../store/actions/transactions.actions';

@Component({
  selector: "app-chart-visualisation",
  templateUrl: "./chart-visualisation.component.html",
  styleUrls: ["./chart-visualisation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartVisualisationComponent {
  @Select(TransactionsState) public transaction$: Observable<TransactionsStateModel>;
  @Select(TransactionsDatesState.CurrentTransactionDate) public currentDate$: Observable<TransactionDate>;

  constructor(private store: Store) {}

  a(e) {
    this.store.dispatch(new UpdateCurrentChartDisplay(e));
  }
}
