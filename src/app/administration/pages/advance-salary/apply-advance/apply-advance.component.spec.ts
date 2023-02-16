import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAdvanceComponent } from './apply-advance.component';

describe('ApplyAdvanceComponent', () => {
  let component: ApplyAdvanceComponent;
  let fixture: ComponentFixture<ApplyAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
