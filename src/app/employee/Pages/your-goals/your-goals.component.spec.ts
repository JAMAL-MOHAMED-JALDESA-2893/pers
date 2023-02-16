import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourGoalsComponent } from './your-goals.component';

describe('YourGoalsComponent', () => {
  let component: YourGoalsComponent;
  let fixture: ComponentFixture<YourGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
