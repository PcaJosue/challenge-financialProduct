import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedInfoComponent } from './rounded-info.component';

describe('RoundedInfoComponent', () => {
  let component: RoundedInfoComponent;
  let fixture: ComponentFixture<RoundedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundedInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
