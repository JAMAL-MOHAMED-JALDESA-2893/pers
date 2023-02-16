import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedPayrollComponent } from './generated-payroll.component';

describe('GeneratedPayrollComponent', () => {
  let component: GeneratedPayrollComponent;
  let fixture: ComponentFixture<GeneratedPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
