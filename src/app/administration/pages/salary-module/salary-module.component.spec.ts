import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryModuleComponent } from './salary-module.component';

describe('SalaryModuleComponent', () => {
  let component: SalaryModuleComponent;
  let fixture: ComponentFixture<SalaryModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
