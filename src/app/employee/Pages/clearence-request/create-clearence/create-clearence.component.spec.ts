import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClearenceComponent } from './create-clearence.component';

describe('CreateClearenceComponent', () => {
  let component: CreateClearenceComponent;
  let fixture: ComponentFixture<CreateClearenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClearenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
