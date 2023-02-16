import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorExecutiveDahsboardComponent } from './senior-executive-dahsboard.component';

describe('SeniorExecutiveDahsboardComponent', () => {
  let component: SeniorExecutiveDahsboardComponent;
  let fixture: ComponentFixture<SeniorExecutiveDahsboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorExecutiveDahsboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorExecutiveDahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
