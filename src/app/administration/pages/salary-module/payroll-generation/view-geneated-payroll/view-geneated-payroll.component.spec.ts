import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeneatedPayrollComponent } from './view-geneated-payroll.component';

describe('ViewGeneatedPayrollComponent', () => {
  let component: ViewGeneatedPayrollComponent;
  let fixture: ComponentFixture<ViewGeneatedPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGeneatedPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGeneatedPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
