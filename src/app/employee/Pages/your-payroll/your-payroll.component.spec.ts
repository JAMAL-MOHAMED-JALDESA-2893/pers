import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPayrollComponent } from './your-payroll.component';

describe('YourPayrollComponent', () => {
  let component: YourPayrollComponent;
  let fixture: ComponentFixture<YourPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
