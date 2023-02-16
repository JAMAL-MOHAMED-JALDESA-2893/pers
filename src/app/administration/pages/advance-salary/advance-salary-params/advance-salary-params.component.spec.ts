import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSalaryParamsComponent } from './advance-salary-params.component';

describe('AdvanceSalaryParamsComponent', () => {
  let component: AdvanceSalaryParamsComponent;
  let fixture: ComponentFixture<AdvanceSalaryParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceSalaryParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceSalaryParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
