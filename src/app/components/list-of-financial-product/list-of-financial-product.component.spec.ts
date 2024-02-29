import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListOfFinancialProductComponent } from './list-of-financial-product.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { FinancialProduct } from 'src/app/models/financialProduct';
import { of, throwError } from 'rxjs';
import { RoundedInfoComponent } from '../utils/rounded-info/rounded-info.component';
import { dummyDataFinancialProducts } from '../../models/dummyData';


describe('ListOfFinancialProductComponent', () => {
  let component: ListOfFinancialProductComponent;
  let fixture: ComponentFixture<ListOfFinancialProductComponent>;
  let mockFinancialProductService: any;


  beforeEach(async () => {

    mockFinancialProductService = {
      getFinancialProducts: jest.fn(),
    };


    await TestBed.configureTestingModule({
      declarations: [ ListOfFinancialProductComponent, RoundedInfoComponent ],
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

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));
    fixture.detectChanges();
    expect(component.data).toEqual(mockProducts);

  });

  it('should display "No existen registros de Productos financieros." when no products are fetched', () => {
    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of([]));
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const noRecordsMessage = element.querySelector('.row')?.textContent;
    expect(noRecordsMessage).toContain('No existen registros de Productos financieros.');
  });

  it('should display correct number of results in the footer', () => {
    const mockProducts: FinancialProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const footerLabel = element.querySelector('.footer__label')?.textContent;

    expect(footerLabel).toBe('2 Resultados');
  });

  it('should handle error when fetching financial products', () => {
    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(throwError(() => new Error('test')));

    fixture.detectChanges();

    expect(component.data.length).toBe(0);
  });


  it('should show searcher box', () => {

    const mockProducts: FinancialProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const inputElement = element.querySelector('.searcher input');

    expect(inputElement).toBeTruthy();
  });

  it('should filter financial products correctly', () => {
    const mockProducts: FinancialProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    fixture.detectChanges();

    component.searchInput = 'Product 1';
    component.search();

    // Expect filteredFinancialProducts to contain only Product 1
    expect(component.data.length).toBe(1);
    expect(component.data[0]).toEqual(mockProducts[0]);
  });

  it('should initialize pagination correctly', () => {
    const mockProducts: FinancialProduct[] = dummyDataFinancialProducts;

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    fixture.detectChanges();
    expect(component.page).toBe(0);
    expect(component.sizeTable).toBe(5);
    expect(component.data.length).toBe(5);
    expect(component.total).toBe(20);

  });

  it('should navigate to the previous page', () => {

    const mockProducts: FinancialProduct[] = dummyDataFinancialProducts;

    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));
    component.page = 2
    component.goToPage(-1);
    expect(component.page).toBe(1);
  });

  it('should navigate to the next page', () => {
    const mockProducts: FinancialProduct[] = dummyDataFinancialProducts;
    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    const initialPage = component.page;
    component.goToPage(1);
    expect(component.page).toBe(initialPage + 1);
  });

  it('should disable previous button on first page', () => {
    const mockProducts: FinancialProduct[] = dummyDataFinancialProducts;
    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    component.page = 0;
    fixture.detectChanges();
    const prevButton = fixture.nativeElement.querySelector('.footer__pages:nth-child(1)');
    expect(prevButton.disabled).toBeTruthy();
  });

  it('should disable next button on last page', () => {
    const mockProducts: FinancialProduct[] = dummyDataFinancialProducts;
    (mockFinancialProductService.getFinancialProducts as jest.Mock).mockReturnValue(of(mockProducts));

    fixture.detectChanges();
    component.goToPage(3);
    // const nextButton = fixture.nativeElement.querySelector('.footer__pages:nth-child(3)');
    // expect(nextButton.disabled).toBeTruthy();
    expect(component.isLastPage).toBeTruthy();
  });

});
