import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKraComponent } from './create-kra.component';

describe('CreateKraComponent', () => {
  let component: CreateKraComponent;
  let fixture: ComponentFixture<CreateKraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
