import { TestBed, async, inject } from '@angular/core/testing';

import { TransactionGuard } from './transaction.guard';

describe('TransactionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionGuard]
    });
  });

  it('should ...', inject([TransactionGuard], (guard: TransactionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
