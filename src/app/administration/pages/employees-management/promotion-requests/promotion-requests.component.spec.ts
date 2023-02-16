import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionRequestsComponent } from './promotion-requests.component';

describe('PromotionRequestsComponent', () => {
  let component: PromotionRequestsComponent;
  let fixture: ComponentFixture<PromotionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
