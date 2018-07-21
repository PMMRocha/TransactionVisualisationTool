import { TransactionDatesData } from '../models/date-transaction.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  public getDateTransactions(): Observable<TransactionDatesData[]> {
    return this.http.get<TransactionDatesData[]>('../../assets/db/dates_data.json');
  }

  public getTransaction(month: string, year: string): Observable<any> {
    return this.http.get(
      `../assets/db/2016/${month}_${year}.xlsx`,
      { responseType: "blob" }
    );
  }
}
