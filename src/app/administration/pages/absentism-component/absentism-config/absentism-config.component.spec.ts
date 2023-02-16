import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentismConfigComponent } from './absentism-config.component';

describe('AbsentismConfigComponent', () => {
  let component: AbsentismConfigComponent;
  let fixture: ComponentFixture<AbsentismConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentismConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentismConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
