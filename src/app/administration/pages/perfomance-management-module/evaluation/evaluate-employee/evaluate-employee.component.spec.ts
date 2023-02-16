import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateEmployeeComponent } from './evaluate-employee.component';

describe('EvaluateEmployeeComponent', () => {
  let component: EvaluateEmployeeComponent;
  let fixture: ComponentFixture<EvaluateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
