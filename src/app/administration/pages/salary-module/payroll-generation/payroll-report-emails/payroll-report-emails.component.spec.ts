import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportEmailsComponent } from './payroll-report-emails.component';

describe('PayrollReportEmailsComponent', () => {
  let component: PayrollReportEmailsComponent;
  let fixture: ComponentFixture<PayrollReportEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollReportEmailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReportEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
