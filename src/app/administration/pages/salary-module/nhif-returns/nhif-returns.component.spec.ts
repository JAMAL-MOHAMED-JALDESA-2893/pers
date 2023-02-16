import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhifReturnsComponent } from './nhif-returns.component';

describe('NhifReturnsComponent', () => {
  let component: NhifReturnsComponent;
  let fixture: ComponentFixture<NhifReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhifReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhifReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
