export interface TransactionDatesData {
  name: string;
  list?: DateTransactionList[];
}

export interface DateTransactionList {
  name: string;
  key: string;
}

export class TransactionDate {
  private _year: string;
  private _month: string;
  private _day: string;

  constructor() {
    this.resetDates();
  }

  // getters
  get year() { return this._year; }
  get month() { return this._month; }
  get day() { return this._day; }
  // setters
  set year(year: string) { this._year = year; }
  set month(month: string) { this._month = month; }
  set day(day: string) { this._day = day; }

  public isValid(target: TransactionDate = this): boolean {
    return !Object.values(target).includes(null);
  }

  public resetDates(): void {
    this._year = null;
    this._month = null;
    this._day = null;
  }
}
