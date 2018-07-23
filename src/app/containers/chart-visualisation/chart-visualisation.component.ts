import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { Select } from "@ngxs/store";
import { TransactionsState } from "../../store/state/transactions.state";
import { DaylyTransaction } from '../../models/date-transaction.model';

@Component({
  selector: "app-chart-visualisation",
  templateUrl: "./chart-visualisation.component.html",
  styleUrls: ["./chart-visualisation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartVisualisationComponent implements OnInit {
  @Select(TransactionsState) public transaction$: Observable<any>;



  ngOnInit() {
    this.transaction$.subscribe(x => console.log('In Component ', x));
  }



}
