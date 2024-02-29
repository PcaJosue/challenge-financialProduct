import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ListOfFinancialProductComponent } from './list-of-financial-product.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { FinancialProduct } from 'src/app/models/financialProduct';
import { of, throwError } from 'rxjs';


describe('ListOfFinancialProductComponent', () => {
  let component: ListOfFinancialProductComponent;
  let fixture: ComponentFixture<ListOfFinancialProductComponent>;
  let mockFinancialProductService: any;


  beforeEach(async () => {

    mockFinancialProductService = jasmine.createSpyObj('FinancialProductService', ['getFinancialProducts']);


    await TestBed.configureTestingModule({
      declarations: [ ListOfFinancialProductComponent ],
      providers: [
        {provide: FinancialProductService, useValue: mockFinancialProductService}
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFinancialProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch financial products on init', () => {
    const mockProducts: FinancialProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    mockFinancialProductService.getFinancialProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.filteredFinancialProducts).toEqual(mockProducts);
  });

  it('should display "No existen registros de Productos financieros." when no products are fetched', fakeAsync(() => {
    mockFinancialProductService.getFinancialProducts.and.returnValue(of([]));

    fixture.detectChanges();
    tick();

    const element: HTMLElement = fixture.nativeElement;
    const noRecordsMessage = element.querySelector('.row')?.textContent;

    expect(noRecordsMessage).toContain('No existen registros de Productos financieros.');
  }));

  it('should display correct number of results in the footer', fakeAsync(() => {
    const mockProducts: FinancialProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    mockFinancialProductService.getFinancialProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();
    tick();

    const element: HTMLElement = fixture.nativeElement;
    const footerLabel = element.querySelector('.footer__label')?.textContent;

    expect(footerLabel).toContain('2 Resultados');
  }));

  it('should handle error when fetching financial products', fakeAsync(() => {
    mockFinancialProductService.getFinancialProducts.and.returnValue(throwError(() => new Error('test')));

    fixture.detectChanges();
    tick();

    expect(component.filteredFinancialProducts.length).toBe(0);
  }));

  it('should show searcher box',()=>{

    fixture.detectChanges();
    const element:HTMLElement = fixture.nativeElement;
    const inputElement = element.querySelector('.searcher input');

    expect(inputElement).toBeTruthy();

  })

});
