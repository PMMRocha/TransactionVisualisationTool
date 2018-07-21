import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { TransactionDatesData } from '../../models/date-transaction.model';

@Component({
  selector: 'app-expansible-menu',
  templateUrl: './expansible-menu.component.html',
  styleUrls: ['./expansible-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansibleMenuComponent implements OnInit {
  @Input() public menus: TransactionDatesData[];
  @Output() public listItemSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
