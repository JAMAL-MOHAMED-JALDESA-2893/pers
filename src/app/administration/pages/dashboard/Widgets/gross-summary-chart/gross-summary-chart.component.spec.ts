import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossSummaryChartComponent } from './gross-summary-chart.component';

describe('GrossSummaryChartComponent', () => {
  let component: GrossSummaryChartComponent;
  let fixture: ComponentFixture<GrossSummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrossSummaryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrossSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
