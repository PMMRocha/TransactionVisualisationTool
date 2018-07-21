import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {
  TransactionDate,
  TransactionDatesData
} from "../../models/date-transaction.model";

@Component({
  selector: "app-expansible-menu",
  templateUrl: "./expansible-menu.component.html",
  styleUrls: ["./expansible-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansibleMenuComponent {
  @Input() public menus: TransactionDatesData[];
  @Input() public currentTransaction: TransactionDate;
  @Output()
  public listItemSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
}
