import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeComponentComponent } from './leave-type-component.component';

describe('LeaveTypeComponentComponent', () => {
  let component: LeaveTypeComponentComponent;
  let fixture: ComponentFixture<LeaveTypeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTypeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTypeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
