import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialProductFormComponent } from './financial-product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancialProductService } from '../../services/financial-product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;
  let mockFinancialProductService: any;



  beforeEach(async () => {

    mockFinancialProductService = {
      getFinancialProducts: jest.fn(),
      createFinancialProduct : jest.fn(()=> of(false)),
      validateFinancialProduct: jest.fn(()=>of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [ FinancialProductFormComponent ],
      imports:[ReactiveFormsModule],
      providers: [
        {provide: FinancialProductService, useValue: mockFinancialProductService}
      ]
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form controls as dirty', () => {
    component.markFormAsDirty();
    expect(component.formGroup.dirty).toBe(true);
  });

  it('should set date revision', () => {
    component.formGroup.get('date_release')?.setValue('2022-01-01');
    component.setDateRevision();
    expect(component.date_revision?.value).toBe('2023-01-01');
  });

  it('should exist ID', async () => {
    mockFinancialProductService.validateFinancialProduct = jest.fn(() => of(false));
    await component.existID();
    expect(component.id?.getError('existID')).toBeFalsy();
  });

  it('should reset form', () => {
    component.reset();
    expect(component.formGroup.pristine).toBe(true);
    expect(component.formGroup.enabled).toBe(true);
    expect(component.submited).toBe(false);
    expect(component.message).toBe(null);
  });

  it('should send form', async () => {
    mockFinancialProductService.validateFinancialProduct = jest.fn(() => of(false));
    component.formGroup.setValue({
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });
    await component.send();
    expect(mockFinancialProductService.createFinancialProduct).toHaveBeenCalled();
  });

  it('should display success message when message code is "success" and loading is false', () => {
    component.message = { value: 'Success message', code: 'success' };
    fixture.detectChanges();
    const successAlert = fixture.nativeElement.querySelector('.alerts.alerts-success');
    expect(successAlert.textContent).toContain('Success message');
  });


  it('should call reset() method when "Reiniciar" button is clicked', () => {
    const resetSpy = jest.spyOn(component, 'reset');
    const resetButton = fixture.nativeElement.querySelector('.formContent__buttons-1');
    resetButton.click();
    expect(resetSpy).toHaveBeenCalled();
  });

});
