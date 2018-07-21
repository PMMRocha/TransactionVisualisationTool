import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { TransactionDate } from "../models/date-transaction.model";
import { UpdateCurrentTransactionDate } from "./../store/actions/transactions.actions";

@Injectable({
  providedIn: "root"
})
export class TransactionGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentDate: TransactionDate = new TransactionDate(
      route.paramMap.get("year"),
      route.paramMap.get("month"),
      route.paramMap.get("day")
    );
    this.store.dispatch(new UpdateCurrentTransactionDate(currentDate));
    return of(true);
  }
}
