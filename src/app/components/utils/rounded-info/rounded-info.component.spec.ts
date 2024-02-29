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

  it('should render text and tooltip correctly', () => {
    component.text = 'Test Text';
    component.tooltip = 'Test Tooltip';
    component.size = 50;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const tooltipElement = element.querySelector('.tooltip-text');
    const textElement = element.querySelector('span:not(.tooltip-text)');

    expect(tooltipElement?.textContent).toContain('Test Tooltip');
    expect(textElement?.textContent).toContain('Test Text');
  });

  it('should apply correct size to the rounded div', () => {
    component.size = 100;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const roundedDiv = element.querySelector('.rounded');

    expect(roundedDiv?.getAttribute('style')).toContain('--size: 100px');
  });

});
