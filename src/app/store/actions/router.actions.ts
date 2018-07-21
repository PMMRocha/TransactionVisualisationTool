import { TransactionDate } from "../../models/date-transaction.model";

export class NavigateTo {
  static readonly type: string = '[ Router ] Navigate';
  constructor(public payload: string) {}
}

export class NavigateToChartViewer {
  static readonly type: string = '[ Router ] Navigate To Chart Viewer';
  constructor(public payload: TransactionDate) {}
}
