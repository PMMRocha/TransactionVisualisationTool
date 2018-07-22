import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TransactionDate } from "../../models/date-transaction.model";
import { NavigateTo } from "../../store/actions/router.actions";
import { NavigateToChartViewer } from "./../../store/actions/router.actions";
import {
  TransactionsDatesState,
  TransactionsDatesStateModel
} from "./../../store/state/dates.state";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Select(TransactionsDatesState.TransactionsDates)
  public menus$: Observable<TransactionsDatesStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {}

  public goHome(): void {
    this.store.dispatch(new NavigateTo("home"));
  }

  public updateCurrentDate(
    currentDate: TransactionDate,
    newValue: string[]
  ): void {
    const property: string = newValue[0].toLowerCase();
    const value: string = newValue[1].toLowerCase();
    currentDate[property] = value;
    this.store.dispatch(new NavigateToChartViewer(currentDate));
  }
}
