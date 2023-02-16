import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetgoalComponent } from './setgoal.component';

describe('SetgoalComponent', () => {
  let component: SetgoalComponent;
  let fixture: ComponentFixture<SetgoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetgoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetgoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
