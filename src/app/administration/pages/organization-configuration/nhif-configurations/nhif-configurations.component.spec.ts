import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhifConfigurationsComponent } from './nhif-configurations.component';

describe('NhifConfigurationsComponent', () => {
  let component: NhifConfigurationsComponent;
  let fixture: ComponentFixture<NhifConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhifConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhifConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
