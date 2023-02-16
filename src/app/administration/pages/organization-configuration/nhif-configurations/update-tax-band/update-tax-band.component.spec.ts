import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxBandComponent } from './update-tax-band.component';

describe('UpdateTaxBandComponent', () => {
  let component: UpdateTaxBandComponent;
  let fixture: ComponentFixture<UpdateTaxBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaxBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaxBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
