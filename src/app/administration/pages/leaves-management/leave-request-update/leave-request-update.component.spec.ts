import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestUpdateComponent } from './leave-request-update.component';

describe('LeaveRequestUpdateComponent', () => {
  let component: LeaveRequestUpdateComponent;
  let fixture: ComponentFixture<LeaveRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
