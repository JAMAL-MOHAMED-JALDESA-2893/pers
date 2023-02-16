import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReplyComponent } from './sub-reply.component';

describe('SubReplyComponent', () => {
  let component: SubReplyComponent;
  let fixture: ComponentFixture<SubReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
