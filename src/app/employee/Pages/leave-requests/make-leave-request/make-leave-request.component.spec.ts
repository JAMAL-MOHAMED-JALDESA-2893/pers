import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeLeaveRequestComponent } from './make-leave-request.component';

describe('MakeLeaveRequestComponent', () => {
  let component: MakeLeaveRequestComponent;
  let fixture: ComponentFixture<MakeLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeLeaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
