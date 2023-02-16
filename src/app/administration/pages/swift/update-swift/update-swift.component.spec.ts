import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSwiftComponent } from './update-swift.component';

describe('UpdateSwiftComponent', () => {
  let component: UpdateSwiftComponent;
  let fixture: ComponentFixture<UpdateSwiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSwiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSwiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
