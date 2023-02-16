import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLoansComponent } from './your-loans.component';

describe('YourLoansComponent', () => {
  let component: YourLoansComponent;
  let fixture: ComponentFixture<YourLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
