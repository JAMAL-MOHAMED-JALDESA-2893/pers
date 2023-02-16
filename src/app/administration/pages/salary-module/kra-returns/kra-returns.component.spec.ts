import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraReturnsComponent } from './kra-returns.component';

describe('KraReturnsComponent', () => {
  let component: KraReturnsComponent;
  let fixture: ComponentFixture<KraReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
