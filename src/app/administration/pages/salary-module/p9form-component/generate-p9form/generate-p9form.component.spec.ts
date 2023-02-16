import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateP9formComponent } from './generate-p9form.component';

describe('GenerateP9formComponent', () => {
  let component: GenerateP9formComponent;
  let fixture: ComponentFixture<GenerateP9formComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateP9formComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateP9formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
