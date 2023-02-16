import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttendanceConfigurationsComponent } from './update-attendance-configurations.component';

describe('UpdateAttendanceConfigurationsComponent', () => {
  let component: UpdateAttendanceConfigurationsComponent;
  let fixture: ComponentFixture<UpdateAttendanceConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAttendanceConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttendanceConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
