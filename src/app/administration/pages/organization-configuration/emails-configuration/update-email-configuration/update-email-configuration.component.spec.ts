import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmailConfigurationComponent } from './update-email-configuration.component';

describe('UpdateEmailConfigurationComponent', () => {
  let component: UpdateEmailConfigurationComponent;
  let fixture: ComponentFixture<UpdateEmailConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmailConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
