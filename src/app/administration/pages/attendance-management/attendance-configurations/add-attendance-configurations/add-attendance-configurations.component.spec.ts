import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceConfigurationsComponent } from './add-attendance-configurations.component';

describe('AddAttendanceConfigurationsComponent', () => {
  let component: AddAttendanceConfigurationsComponent;
  let fixture: ComponentFixture<AddAttendanceConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
