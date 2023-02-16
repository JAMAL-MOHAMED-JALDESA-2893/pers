import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceManagementModuleComponent } from './perfomance-management-module.component';

describe('PerfomanceManagementModuleComponent', () => {
  let component: PerfomanceManagementModuleComponent;
  let fixture: ComponentFixture<PerfomanceManagementModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfomanceManagementModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfomanceManagementModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
