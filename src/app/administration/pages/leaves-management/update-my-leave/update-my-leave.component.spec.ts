import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyLeaveComponent } from './update-my-leave.component';

describe('UpdateMyLeaveComponent', () => {
  let component: UpdateMyLeaveComponent;
  let fixture: ComponentFixture<UpdateMyLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMyLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
