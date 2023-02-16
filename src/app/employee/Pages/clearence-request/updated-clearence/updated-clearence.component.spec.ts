import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedClearenceComponent } from './updated-clearence.component';

describe('UpdatedClearenceComponent', () => {
  let component: UpdatedClearenceComponent;
  let fixture: ComponentFixture<UpdatedClearenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedClearenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedClearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
