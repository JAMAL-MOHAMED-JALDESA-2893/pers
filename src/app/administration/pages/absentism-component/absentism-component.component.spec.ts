import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentismComponentComponent } from './absentism-component.component';

describe('AbsentismComponentComponent', () => {
  let component: AbsentismComponentComponent;
  let fixture: ComponentFixture<AbsentismComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentismComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentismComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
