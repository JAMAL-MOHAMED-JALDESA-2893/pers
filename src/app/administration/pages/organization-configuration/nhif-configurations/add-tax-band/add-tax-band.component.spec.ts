import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxBandComponent } from './add-tax-band.component';

describe('AddTaxBandComponent', () => {
  let component: AddTaxBandComponent;
  let fixture: ComponentFixture<AddTaxBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
