import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreCardComponent } from './game-score-card.component';

describe('GameScoreCardComponent', () => {
  let component: GameScoreCardComponent;
  let fixture: ComponentFixture<GameScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScoreCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
