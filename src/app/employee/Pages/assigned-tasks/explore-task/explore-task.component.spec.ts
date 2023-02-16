import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTaskComponent } from './explore-task.component';

describe('ExploreTaskComponent', () => {
  let component: ExploreTaskComponent;
  let fixture: ComponentFixture<ExploreTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
