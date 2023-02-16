import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NssfConfigurationsComponent } from './nssf-configurations.component';

describe('NssfConfigurationsComponent', () => {
  let component: NssfConfigurationsComponent;
  let fixture: ComponentFixture<NssfConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NssfConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NssfConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
