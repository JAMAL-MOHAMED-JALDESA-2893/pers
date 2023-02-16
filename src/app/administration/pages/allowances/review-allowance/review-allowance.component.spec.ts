import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAllowanceComponent } from './review-allowance.component';

describe('ReviewAllowanceComponent', () => {
  let component: ReviewAllowanceComponent;
  let fixture: ComponentFixture<ReviewAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
