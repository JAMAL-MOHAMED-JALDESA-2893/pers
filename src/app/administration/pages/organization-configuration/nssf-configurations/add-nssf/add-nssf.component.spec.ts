import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNssfComponent } from './add-nssf.component';

describe('AddNssfComponent', () => {
  let component: AddNssfComponent;
  let fixture: ComponentFixture<AddNssfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNssfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNssfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
