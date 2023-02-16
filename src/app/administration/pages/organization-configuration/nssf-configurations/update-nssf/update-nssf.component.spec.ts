import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNssfComponent } from './update-nssf.component';

describe('UpdateNssfComponent', () => {
  let component: UpdateNssfComponent;
  let fixture: ComponentFixture<UpdateNssfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNssfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNssfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
