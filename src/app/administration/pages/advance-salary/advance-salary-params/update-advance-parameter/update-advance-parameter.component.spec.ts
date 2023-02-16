import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdvanceParameterComponent } from './update-advance-parameter.component';

describe('UpdateAdvanceParameterComponent', () => {
  let component: UpdateAdvanceParameterComponent;
  let fixture: ComponentFixture<UpdateAdvanceParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdvanceParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdvanceParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
