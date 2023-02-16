import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashedEmployeesComponent } from './trashed-employees.component';

describe('TrashedEmployeesComponent', () => {
  let component: TrashedEmployeesComponent;
  let fixture: ComponentFixture<TrashedEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashedEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
