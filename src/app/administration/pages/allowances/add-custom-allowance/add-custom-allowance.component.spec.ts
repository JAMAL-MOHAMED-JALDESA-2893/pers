import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomAllowanceComponent } from './add-custom-allowance.component';

describe('AddCustomAllowanceComponent', () => {
  let component: AddCustomAllowanceComponent;
  let fixture: ComponentFixture<AddCustomAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
