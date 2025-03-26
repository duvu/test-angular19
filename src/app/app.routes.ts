import { Routes } from '@angular/router';
import { GameScoreBoardComponent } from './game-score-board/game-score-board.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: GameScoreBoardComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
