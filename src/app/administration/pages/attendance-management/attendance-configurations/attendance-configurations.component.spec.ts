import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceConfigurationsComponent } from './attendance-configurations.component';

describe('AttendanceConfigurationsComponent', () => {
  let component: AttendanceConfigurationsComponent;
  let fixture: ComponentFixture<AttendanceConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
