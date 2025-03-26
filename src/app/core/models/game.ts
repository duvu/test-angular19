export interface Team {
  id: number;
  name: string;
  logoUrl: string;
  score: number;
}

export interface GameStats {
  possession: number; // Percentage for team1
  fouls: {
    team1: number;
    team2: number;
  };
  shots: {
    team1: number;
    team2: number;
  };
  shotsOnTarget: {
    team1: number;
    team2: number;
  };
  corners: {
    team1: number;
    team2: number;
  };
  yellowCards: {
    team1: number;
    team2: number;
  };
  redCards: {
    team1: number;
    team2: number;
  };
}

export interface Game {
  id: number;
  team1: Team;
  team2: Team;
  date: Date;
  venue: string;
  stats: GameStats;
  status: 'scheduled' | 'live' | 'completed';
  period?: string; // e.g., "1st Half", "2nd Half", "Full Time"
  time?: string; // Current game time or match length
} 