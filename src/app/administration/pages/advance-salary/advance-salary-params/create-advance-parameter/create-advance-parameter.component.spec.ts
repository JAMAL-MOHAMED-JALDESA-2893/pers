import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvanceParameterComponent } from './create-advance-parameter.component';

describe('CreateAdvanceParameterComponent', () => {
  let component: CreateAdvanceParameterComponent;
  let fixture: ComponentFixture<CreateAdvanceParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdvanceParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvanceParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
