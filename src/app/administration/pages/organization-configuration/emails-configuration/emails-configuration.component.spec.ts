import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsConfigurationComponent } from './emails-configuration.component';

describe('EmailsConfigurationComponent', () => {
  let component: EmailsConfigurationComponent;
  let fixture: ComponentFixture<EmailsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
