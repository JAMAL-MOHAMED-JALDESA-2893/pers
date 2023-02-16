import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P9formComponentComponent } from './p9form-component.component';

describe('P9formComponentComponent', () => {
  let component: P9formComponentComponent;
  let fixture: ComponentFixture<P9formComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P9formComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P9formComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
