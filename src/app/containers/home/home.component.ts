import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TransactionDate } from "../../models/date-transaction.model";
import { TransactionsDatesState } from "../../store/state/dates.state";
import { NavigateToChartViewer } from "./../../store/actions/router.actions";
import { TransactionsDatesStateModel } from "./../../store/state/dates.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @Select(TransactionsDatesState.TransactionsDates)
  public transactionsDates$: Observable<TransactionsDatesStateModel>;
  public dateSelected: TransactionDate = new TransactionDate();

  constructor(private store: Store) {}

  ngOnInit() {}

  public submitDate(): void {
    if (this.dateSelected.isValid()) {
      this.store.dispatch(new NavigateToChartViewer(this.dateSelected));
    }
  }
}
