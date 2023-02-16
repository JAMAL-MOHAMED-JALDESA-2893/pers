import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayslipsComponent } from './employee-payslips.component';

describe('EmployeePayslipsComponent', () => {
  let component: EmployeePayslipsComponent;
  let fixture: ComponentFixture<EmployeePayslipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePayslipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
