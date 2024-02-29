import { TestBed } from '@angular/core/testing';

import { FinancialProductService } from './financial-product.service';

describe('FinancialProductService', () => {
  let service: FinancialProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
