import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollGenerationComponent } from './payroll-generation.component';

describe('PayrollGenerationComponent', () => {
  let component: PayrollGenerationComponent;
  let fixture: ComponentFixture<PayrollGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
