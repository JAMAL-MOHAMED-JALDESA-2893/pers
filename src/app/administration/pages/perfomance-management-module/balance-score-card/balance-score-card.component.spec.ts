import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceScoreCardComponent } from './balance-score-card.component';

describe('BalanceScoreCardComponent', () => {
  let component: BalanceScoreCardComponent;
  let fixture: ComponentFixture<BalanceScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceScoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
