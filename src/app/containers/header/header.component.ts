import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TransactionDatesData } from '../../models/date-transaction.model';
import { NavigateTo } from '../../store/actions/router.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public menus: TransactionDatesData[];

  constructor(private store: Store) { }

  ngOnInit() {
    this.menus = [
      // {
      //   name: 'Year',
      //   submenus: [
      //     {
      //       name: '2016',
      //       key: '2016'
      //     },
      //     {
      //       name: '2017',
      //       key: '2017'
      //     }
      //   ]
      // },
      {
        name: 'Month',
        list: [
          {
            name: 'December',
            key: 'dec'
          },
          {
            name: 'October',
            key: 'oct'
          }
        ]
      },
      {
        name: 'Day',
        list: [
          {
            name: '1',
            key: 'one'
          },
          {
            name: '2',
            key: 'two'
          }
        ]
      }
    ]
  }

  public updateCurrentDate(key: string): void {
    this.store.dispatch(new NavigateTo(key));
  }

}
