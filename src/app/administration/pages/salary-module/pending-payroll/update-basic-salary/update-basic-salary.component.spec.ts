import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBasicSalaryComponent } from './update-basic-salary.component';

describe('UpdateBasicSalaryComponent', () => {
  let component: UpdateBasicSalaryComponent;
  let fixture: ComponentFixture<UpdateBasicSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBasicSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBasicSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
