import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsentismComponent } from './add-absentism.component';

describe('AddAbsentismComponent', () => {
  let component: AddAbsentismComponent;
  let fixture: ComponentFixture<AddAbsentismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbsentismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsentismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
