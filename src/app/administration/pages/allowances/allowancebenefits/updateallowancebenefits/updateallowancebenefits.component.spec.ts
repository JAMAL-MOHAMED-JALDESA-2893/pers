import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateallowancebenefitsComponent } from './updateallowancebenefits.component';

describe('UpdateallowancebenefitsComponent', () => {
  let component: UpdateallowancebenefitsComponent;
  let fixture: ComponentFixture<UpdateallowancebenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateallowancebenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateallowancebenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
