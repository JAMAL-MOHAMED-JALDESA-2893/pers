import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NssfReturnsComponent } from './nssf-returns.component';

describe('NssfReturnsComponent', () => {
  let component: NssfReturnsComponent;
  let fixture: ComponentFixture<NssfReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NssfReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NssfReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
