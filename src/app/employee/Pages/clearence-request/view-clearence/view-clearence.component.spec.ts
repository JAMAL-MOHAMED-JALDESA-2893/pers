import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClearenceComponent } from './view-clearence.component';

describe('ViewClearenceComponent', () => {
  let component: ViewClearenceComponent;
  let fixture: ComponentFixture<ViewClearenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClearenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
