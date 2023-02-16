import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPayrollComponent } from './pending-payroll.component';

describe('PendingPayrollComponent', () => {
  let component: PendingPayrollComponent;
  let fixture: ComponentFixture<PendingPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
