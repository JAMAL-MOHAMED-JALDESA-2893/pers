import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomAllowanceComponent } from './update-custom-allowance.component';

describe('UpdateCustomAllowanceComponent', () => {
  let component: UpdateCustomAllowanceComponent;
  let fixture: ComponentFixture<UpdateCustomAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustomAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
