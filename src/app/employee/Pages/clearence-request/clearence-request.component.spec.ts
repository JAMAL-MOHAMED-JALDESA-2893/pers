import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearenceRequestComponent } from './clearence-request.component';

describe('ClearenceRequestComponent', () => {
  let component: ClearenceRequestComponent;
  let fixture: ComponentFixture<ClearenceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearenceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearenceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
