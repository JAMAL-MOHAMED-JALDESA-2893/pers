import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSwiftComponent } from './create-swift.component';

describe('CreateSwiftComponent', () => {
  let component: CreateSwiftComponent;
  let fixture: ComponentFixture<CreateSwiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSwiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSwiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
