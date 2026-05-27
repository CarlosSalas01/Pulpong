export interface Team {
  id: string;
  name: string;
  players: string[];
}

export interface Match {
  id: string;
  round: number;
  teamA: Team | null;
  teamB: Team | null;
  winner: Team | null;
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  rounds: Match[][];
  champion: Team | null;
  createdAt: string;
  updatedAt: string;
}
