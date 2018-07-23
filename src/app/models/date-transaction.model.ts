export interface DaylyTransaction {
  total: number;
  suppliers: Map<string, number>;
  expenseType: Map<string, number>;
}

export interface TransactionDatesData {
  name: string;
  list?: DateTransactionList[];
}

export interface DateTransactionList {
  name: string;
  key: string;
}

export class TransactionDate {
  constructor(
    private _year: string = null,
    private _month: string = null,
    private _day: string = null
  ) {}

  // getters
  get year() {
    return this._year;
  }
  get month() {
    return this._month;
  }
  get day() {
    return this._day;
  }
  // setters
  set year(year: string) {
    this._year = year;
  }
  set month(month: string) {
    this._month = month;
  }
  set day(day: string) {
    this._day = day;
  }

  public isValid(target: TransactionDate = this): boolean {
    return !Object.values(target).includes(null);
  }

  public mapKey(): string {
    return `${this.day}/${this.month}/${this.year}`;
  }
}
