import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldEmployeeComponent } from './hold-employee.component';

describe('HoldEmployeeComponent', () => {
  let component: HoldEmployeeComponent;
  let fixture: ComponentFixture<HoldEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
