import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import {
  DaylyTransaction,
  TransactionDate
} from "../models/date-transaction.model";
import { UpdateCurrentTransactionDate } from "../store/actions/dates.actions";
import {
  LoadTransaction,
  UpdateCurrentTransaction
} from "../store/actions/transactions.actions";
import { TransactionsState } from "../store/state/transactions.state";

@Injectable({
  providedIn: "root"
})
export class TransactionGuard implements CanActivate {
  @Select(TransactionsState.Transactions)
  private transaction$: Observable<Map<string, DaylyTransaction>>;
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentDate: TransactionDate = new TransactionDate(
      route.paramMap.get("year"),
      route.paramMap.get("month"),
      route.paramMap.get("day")
    );
    this.checkAllTransactions(currentDate.mapKey()).subscribe(
      (hasTransaction: boolean) => {
        if (hasTransaction) {
          this.store.dispatch(
            new UpdateCurrentTransaction(currentDate.mapKey())
          );
          return;
        }
        this.store.dispatch(new LoadTransaction(currentDate));
      }
    );
    this.store.dispatch(new UpdateCurrentTransactionDate(currentDate));
    return of(true);
  }

  private checkAllTransactions(key: string): any {
    return this.transaction$.pipe(
      switchMap(
        (transaction: Map<string, DaylyTransaction>) =>
          transaction.has(key) ? of(true) : of(false)
      ),
      take(1)
    );
  }
}
