import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddallowancebenefitsComponent } from './addallowancebenefits.component';

describe('AddallowancebenefitsComponent', () => {
  let component: AddallowancebenefitsComponent;
  let fixture: ComponentFixture<AddallowancebenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddallowancebenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddallowancebenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
