import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategoalComponent } from './updategoal.component';

describe('UpdategoalComponent', () => {
  let component: UpdategoalComponent;
  let fixture: ComponentFixture<UpdategoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdategoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
