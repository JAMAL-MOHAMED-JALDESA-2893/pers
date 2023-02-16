import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollMainPageComponent } from './payroll-main-page.component';

describe('PayrollMainPageComponent', () => {
  let component: PayrollMainPageComponent;
  let fixture: ComponentFixture<PayrollMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
