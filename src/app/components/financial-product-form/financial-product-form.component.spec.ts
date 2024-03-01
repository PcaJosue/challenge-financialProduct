import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialProductFormComponent } from './financial-product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancialProductService } from '../../services/financial-product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;
  let mockFinancialProductService: any;



  beforeEach(async () => {

    mockFinancialProductService = {
      getFinancialProducts: jest.fn(),
      createFinancialProduct : jest.fn(()=> of([])),
      validateFinancialProduct: jest.fn(()=>of(false)),
      updateFinancialProduct: jest.fn(()=> of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [ FinancialProductFormComponent ],
      imports:[ReactiveFormsModule,RouterModule.forRoot([])],
      providers: [
        {provide: FinancialProductService, useValue: mockFinancialProductService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { id: '123' } },
          }
      }
      ]
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should call editFinancialProduct() method when form is submitted for editing', waitForAsync(() => {

    const editFinancialProductSpy = jest.spyOn(component, 'send');
    component.isNew = false; // Simulate edit mode
    fixture.detectChanges();

    // Set form values
    component.formGroup.setValue({
      id: '123',
      name: 'Updated Product Name',
      description: 'Updated Product Description',
      logo: 'updated-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01',
    });

    const button = fixture.debugElement.query(By.css('.formContent__buttons-2')).nativeElement;
    button.click();

    expect(editFinancialProductSpy).toHaveBeenCalled();
  }));

  it('should update form', async () => {
    mockFinancialProductService.validateFinancialProduct = jest.fn(() => of(false));

    component.isNew=false;
    component.formGroup.setValue({
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });
    await component.send();
    expect(mockFinancialProductService.updateFinancialProduct).toHaveBeenCalled();
  });

});
