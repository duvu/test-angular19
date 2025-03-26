import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Game } from '../../../core/models/game';

@Component({
  selector: 'app-game-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './game-details-dialog.component.html',
  styleUrls: ['./game-details-dialog.component.scss']
})
export class GameDetailsDialogComponent {
  game: Game;

  constructor(
    public dialogRef: MatDialogRef<GameDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { game: Game }
  ) {
    this.game = data.game;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getTeam1LogoUrl(): string {
    return `assets/team-logos/${this.game.team1.id}.png`;
  }

  getTeam2LogoUrl(): string {
    return `assets/team-logos/${this.game.team2.id}.png`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/team-logos/default.png';
  }

  getTeam1Possession(): number {
    return this.game.stats.possession;
  }

  getTeam2Possession(): number {
    return 100 - this.game.stats.possession;
  }
}
