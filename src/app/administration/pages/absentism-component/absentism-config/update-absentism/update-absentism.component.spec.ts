import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAbsentismComponent } from './update-absentism.component';

describe('UpdateAbsentismComponent', () => {
  let component: UpdateAbsentismComponent;
  let fixture: ComponentFixture<UpdateAbsentismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAbsentismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAbsentismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
