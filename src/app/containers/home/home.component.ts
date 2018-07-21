import { NavigateToChartViewer } from './../../store/actions/router.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TransactionDate } from '../../models/date-transaction.model';
import { TransactionsState } from '../../store/state/transactions.state';
import { TransactionsDatesStateModel } from './../../store/state/transactions.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @Select(TransactionsState.TransactionsDates) public transactionsDates$: Observable<TransactionsDatesStateModel>;
  public dateSelected: TransactionDate = new TransactionDate();

  constructor(private store: Store) { }

  ngOnInit() {
  }

  public submitDate(): void {
    if (this.dateSelected.isValid()) {
      this.store.dispatch(new NavigateToChartViewer(this.dateSelected));
    }
  }

}
