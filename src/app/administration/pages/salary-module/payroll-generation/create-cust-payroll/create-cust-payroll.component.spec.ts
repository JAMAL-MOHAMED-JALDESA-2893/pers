import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustPayrollComponent } from './create-cust-payroll.component';

describe('CreateCustPayrollComponent', () => {
  let component: CreateCustPayrollComponent;
  let fixture: ComponentFixture<CreateCustPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
