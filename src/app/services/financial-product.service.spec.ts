import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FinancialProductService } from './financial-product.service';
import { FinancialProduct } from '../models/financialProduct';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService]
    });
    service = TestBed.inject(FinancialProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve financial products via GET', () => {
    const mockProducts: FinancialProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date(),
        date_revision: new Date()
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: new Date(),
        date_revision: new Date()
      }
    ];

    service.getFinancialProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create financial product', () => {
    const mockFinancialProduct = {
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'logo.png',
      date_release: new Date('2022-01-01'),
      date_revision: new Date('2023-01-01')
    };

    const expectedResponse = [mockFinancialProduct];

    service.createFinancialProduct(mockFinancialProduct).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(service.URL);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should validate financial product', () => {
    const mockId = 'mock-id';
    const expectedResponse = true;

    service.validateFinancialProduct(mockId).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service.URL}/verification?id=${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should update financial product', () => {

    const mockFinancialProduct = {
      id: '123',
      name: 'Product Name Test',
      description: 'Product Description',
      logo: 'logo.png',
      date_release: new Date('2022-01-01'),
      date_revision: new Date('2023-01-01')
    };

    const expectedResponse = [mockFinancialProduct];

    service.updateFinancialProduct(mockFinancialProduct).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(service.URL);
    expect(req.request.method).toBe('PUT');
    req.flush(expectedResponse);
  });

  it('should delete a financial product', waitForAsync(() => {
    const id = '123';
    service.deleteFinancialProduct(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(req => req.method === 'DELETE' && req.url === service.URL);
    expect(req.request.params.get('id')).toEqual(id);

    req.flush({});

  }));


});
