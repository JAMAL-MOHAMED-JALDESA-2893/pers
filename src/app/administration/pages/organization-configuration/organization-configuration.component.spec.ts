import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationConfigurationComponent } from './organization-configuration.component';

describe('OrganizationConfigurationComponent', () => {
  let component: OrganizationConfigurationComponent;
  let fixture: ComponentFixture<OrganizationConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
