import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayConfigurationsComponent } from './holiday-configurations.component';

describe('HolidayConfigurationsComponent', () => {
  let component: HolidayConfigurationsComponent;
  let fixture: ComponentFixture<HolidayConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
