import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceParametersComponent } from './perfomance-parameters.component';

describe('PerfomanceParametersComponent', () => {
  let component: PerfomanceParametersComponent;
  let fixture: ComponentFixture<PerfomanceParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfomanceParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfomanceParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
