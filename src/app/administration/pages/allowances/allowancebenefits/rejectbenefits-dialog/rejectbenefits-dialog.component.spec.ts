import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectbenefitsDialogComponent } from './rejectbenefits-dialog.component';

describe('RejectbenefitsDialogComponent', () => {
  let component: RejectbenefitsDialogComponent;
  let fixture: ComponentFixture<RejectbenefitsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectbenefitsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectbenefitsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
