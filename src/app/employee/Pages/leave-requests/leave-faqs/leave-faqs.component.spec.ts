import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFAQSComponent } from './leave-faqs.component';

describe('LeaveFAQSComponent', () => {
  let component: LeaveFAQSComponent;
  let fixture: ComponentFixture<LeaveFAQSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveFAQSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveFAQSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
