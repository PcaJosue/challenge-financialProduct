import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFinancialProductComponent } from './list-of-financial-product.component';

describe('ListOfFinancialProductComponent', () => {
  let component: ListOfFinancialProductComponent;
  let fixture: ComponentFixture<ListOfFinancialProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFinancialProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfFinancialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
