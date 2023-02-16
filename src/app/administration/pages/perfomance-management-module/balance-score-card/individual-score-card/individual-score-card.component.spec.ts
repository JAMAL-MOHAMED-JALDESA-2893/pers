import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualScoreCardComponent } from './individual-score-card.component';

describe('IndividualScoreCardComponent', () => {
  let component: IndividualScoreCardComponent;
  let fixture: ComponentFixture<IndividualScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualScoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
