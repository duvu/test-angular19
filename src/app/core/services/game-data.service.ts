import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private mockGames: Game[] = [
    {
      id: 1,
      team1: {
        id: 101,
        name: 'Manchester United',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
        score: 2
      },
      team2: {
        id: 102,
        name: 'Liverpool',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
        score: 1
      },
      date: new Date('2025-04-15T15:00:00'),
      venue: 'Old Trafford',
      status: 'live',
      period: '2nd Half',
      time: '75:00',
      stats: {
        possession: 45, // Man Utd possession percentage
        fouls: {
          team1: 8,
          team2: 10
        },
        shots: {
          team1: 12,
          team2: 15
        },
        shotsOnTarget: {
          team1: 5,
          team2: 6
        },
        corners: {
          team1: 5,
          team2: 7
        },
        yellowCards: {
          team1: 2,
          team2: 3
        },
        redCards: {
          team1: 0,
          team2: 0
        }
      }
    },
    {
      id: 2,
      team1: {
        id: 103,
        name: 'Barcelona',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
        score: 3
      },
      team2: {
        id: 104,
        name: 'Real Madrid',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
        score: 3
      },
      date: new Date('2025-04-15T20:00:00'),
      venue: 'Camp Nou',
      status: 'completed',
      period: 'Full Time',
      stats: {
        possession: 55, // Barcelona possession percentage
        fouls: {
          team1: 12,
          team2: 15
        },
        shots: {
          team1: 18,
          team2: 14
        },
        shotsOnTarget: {
          team1: 8,
          team2: 6
        },
        corners: {
          team1: 8,
          team2: 5
        },
        yellowCards: {
          team1: 2,
          team2: 3
        },
        redCards: {
          team1: 0,
          team2: 1
        }
      }
    },
    {
      id: 3,
      team1: {
        id: 105,
        name: 'Bayern Munich',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
        score: 0
      },
      team2: {
        id: 106,
        name: 'Borussia Dortmund',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
        score: 0
      },
      date: new Date('2025-04-16T18:30:00'),
      venue: 'Allianz Arena',
      status: 'scheduled',
      stats: {
        possession: 0,
        fouls: {
          team1: 0,
          team2: 0
        },
        shots: {
          team1: 0,
          team2: 0
        },
        shotsOnTarget: {
          team1: 0,
          team2: 0
        },
        corners: {
          team1: 0,
          team2: 0
        },
        yellowCards: {
          team1: 0,
          team2: 0
        },
        redCards: {
          team1: 0,
          team2: 0
        }
      }
    }
  ];

  constructor() { }

  getGames(): Observable<Game[]> {
    return of(this.mockGames);
  }

  getGameById(id: number): Observable<Game | undefined> {
    const game = this.mockGames.find(g => g.id === id);
    return of(game);
  }
} 