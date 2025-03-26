import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../../core/models/game';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-game-score-card',
  templateUrl: './game-score-card.component.html',
  styleUrls: ['./game-score-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatChipsModule
  ]
})
export class GameScoreCardComponent {
  @Input() game!: Game;
  @Output() gameSelected = new EventEmitter<Game>();
  team1ImageError = false;
  team2ImageError = false;
  defaultLogoUrl = 'assets/team-logos/default.png';
  
  constructor() {}

  onGameClick(): void {
    this.gameSelected.emit(this.game);
  }

  getStatusClass(): string {
    switch (this.game.status) {
      case 'live':
        return 'live-status';
      case 'completed':
        return 'completed-status';
      case 'scheduled':
        return 'scheduled-status';
      default:
        return '';
    }
  }

  getStatusColor(): string {
    switch (this.game.status) {
      case 'live':
        return 'warn';
      case 'completed':
        return 'primary';
      case 'scheduled':
        return 'accent';
      default:
        return 'primary';
    }
  }

  getStatusText(): string {
    if (this.game.status === 'live') {
      return `LIVE • ${this.game.period} • ${this.game.time}`;
    } else if (this.game.status === 'completed') {
      return 'FULL TIME';
    } else {
      return 'SCHEDULED';
    }
  }
  
  handleImageError(event: Event | 'team1' | 'team2'): void {
    // If a string is passed directly
    if (typeof event === 'string') {
      if (event === 'team1') {
        this.team1ImageError = true;
      } else {
        this.team2ImageError = true;
      }
      return;
    }
    
    // If an event object is passed, determine which team from the image element
    const imgElement = event.target as HTMLImageElement;
    if (imgElement.classList.contains('team1')) {
      this.team1ImageError = true;
    } else if (imgElement.classList.contains('team2')) {
      this.team2ImageError = true;
    }
  }
  
  getTeam1LogoUrl(): string {
    return this.team1ImageError ? this.defaultLogoUrl : this.game.team1.logoUrl;
  }
  
  getTeam2LogoUrl(): string {
    return this.team2ImageError ? this.defaultLogoUrl : this.game.team2.logoUrl;
  }
}
