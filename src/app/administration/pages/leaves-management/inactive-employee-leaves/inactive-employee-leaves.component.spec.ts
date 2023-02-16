import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEmployeeLeavesComponent } from './inactive-employee-leaves.component';

describe('InactiveEmployeeLeavesComponent', () => {
  let component: InactiveEmployeeLeavesComponent;
  let fixture: ComponentFixture<InactiveEmployeeLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveEmployeeLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveEmployeeLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
