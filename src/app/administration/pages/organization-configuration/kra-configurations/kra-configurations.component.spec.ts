import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraConfigurationsComponent } from './kra-configurations.component';

describe('KraConfigurationsComponent', () => {
  let component: KraConfigurationsComponent;
  let fixture: ComponentFixture<KraConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
