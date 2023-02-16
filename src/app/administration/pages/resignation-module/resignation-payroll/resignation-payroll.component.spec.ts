import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationPayrollComponent } from './resignation-payroll.component';

describe('ResignationPayrollComponent', () => {
  let component: ResignationPayrollComponent;
  let fixture: ComponentFixture<ResignationPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
