import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLeavesComponent } from './your-leaves.component';

describe('YourLeavesComponent', () => {
  let component: YourLeavesComponent;
  let fixture: ComponentFixture<YourLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
