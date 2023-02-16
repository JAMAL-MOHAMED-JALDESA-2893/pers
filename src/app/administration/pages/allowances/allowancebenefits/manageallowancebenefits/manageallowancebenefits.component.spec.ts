import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageallowancebenefitsComponent } from './manageallowancebenefits.component';

describe('ManageallowancebenefitsComponent', () => {
  let component: ManageallowancebenefitsComponent;
  let fixture: ComponentFixture<ManageallowancebenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageallowancebenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageallowancebenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
