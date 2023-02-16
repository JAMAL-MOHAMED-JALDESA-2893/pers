import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustPayrollComponent } from './update-cust-payroll.component';

describe('UpdateCustPayrollComponent', () => {
  let component: UpdateCustPayrollComponent;
  let fixture: ComponentFixture<UpdateCustPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
