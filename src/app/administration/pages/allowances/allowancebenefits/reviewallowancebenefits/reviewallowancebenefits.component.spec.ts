import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewallowancebenefitsComponent } from './reviewallowancebenefits.component';

describe('ReviewallowancebenefitsComponent', () => {
  let component: ReviewallowancebenefitsComponent;
  let fixture: ComponentFixture<ReviewallowancebenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewallowancebenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewallowancebenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
