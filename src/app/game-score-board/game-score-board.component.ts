import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { GameDataService } from '../core/services/game-data.service';
import { Game } from '../core/models/game';
import { GameScoreCardComponent } from '../shared/components/game-score-card/game-score-card.component';
import { GameDetailsDialogComponent } from '../shared/components/game-details-dialog/game-details-dialog.component';

@Component({
  selector: 'app-game-score-board',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    GameScoreCardComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './game-score-board.component.html',
  styleUrls: ['./game-score-board.component.scss']
})
export class GameScoreBoardComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  isLoading = true;
  hasError = false;
  private subscription: Subscription = new Subscription();
  private isBrowser: boolean;

  constructor(
    private gameDataService: GameDataService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadGames();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadGames(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.subscription.add(
      this.gameDataService.getGames().subscribe({
        next: (games) => {
          this.games = games;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading games:', error);
          this.isLoading = false;
          this.hasError = true;
        }
      })
    );
  }

  retryLoading(): void {
    this.loadGames();
  }

  openGameDetails(game: Game): void {
    this.dialog.open(GameDetailsDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      data: { game },
      panelClass: 'game-details-dialog'
    });
  }

  trackByGameId(index: number, game: Game): number | string {
    return game.id || index;
  }
}
