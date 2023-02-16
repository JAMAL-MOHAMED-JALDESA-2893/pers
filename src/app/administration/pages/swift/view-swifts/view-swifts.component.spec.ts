import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwiftsComponent } from './view-swifts.component';

describe('ViewSwiftsComponent', () => {
  let component: ViewSwiftsComponent;
  let fixture: ComponentFixture<ViewSwiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSwiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSwiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
