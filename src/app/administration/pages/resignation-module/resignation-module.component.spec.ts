import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationModuleComponent } from './resignation-module.component';

describe('ResignationModuleComponent', () => {
  let component: ResignationModuleComponent;
  let fixture: ComponentFixture<ResignationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
