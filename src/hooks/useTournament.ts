import { useCallback, useEffect, useState } from 'react';
import type { Match, Team, Tournament } from '../models/tournament.types';
import { storageService } from '../services/storage.service';
import {
  areAllMatchesCompleted,
  generateFirstRound,
  generateNextRound,
  getChampion,
} from '../utils/bracket.utils';

const MAX_TEAMS = 32;

type Phase = 'setup' | 'teams' | 'bracket';

interface UseTournamentReturn {
  tournament: Tournament | null;
  phase: Phase;
  error: string;
  createTournament: (name: string) => void;
  addTeam: (name: string, players: string[]) => void;
  removeTeam: (id: string) => void;
  editTeam: (id: string, name: string, players: string[]) => void;
  generateBracket: () => void;
  selectWinner: (roundIndex: number, matchId: string, winner: Team) => void;
  clearWinner: (roundIndex: number, matchId: string) => void;
  advanceRound: () => void;
  resetTournament: () => void;
}

export function useTournament(): UseTournamentReturn {
  const [tournament, setTournament] = useState<Tournament | null>(() =>
    storageService.load(),
  );
  const [phase, setPhase] = useState<Phase>(() => {
    const saved = storageService.load();
    if (!saved) return 'setup';
    if (saved.rounds.length === 0) return 'teams';
    return 'bracket';
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (tournament) {
      storageService.save({ ...tournament, updatedAt: new Date().toISOString() });
    }
  }, [tournament]);

  const createTournament = useCallback((name: string) => {
    const newTournament: Tournament = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Torneo Beer Pong',
      teams: [],
      rounds: [],
      champion: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTournament(newTournament);
    setPhase('teams');
    setError('');
  }, []);

  const addTeam = useCallback((name: string, players: string[]) => {
    if (!name.trim()) {
      setError('El nombre del equipo no puede estar vacío.');
      return;
    }
    setTournament((prev) => {
      if (!prev) return prev;
      if (prev.teams.length >= MAX_TEAMS) {
        setError(`El torneo acepta un máximo de ${MAX_TEAMS} equipos.`);
        return prev;
      }
      const isDuplicate = prev.teams.some(
        (t) => t.name.trim().toLowerCase() === name.trim().toLowerCase(),
      );
      if (isDuplicate) {
        setError(`Ya existe un equipo llamado "${name.trim()}".`);
        return prev;
      }
      setError('');
      const newTeam: Team = {
        id: crypto.randomUUID(),
        name: name.trim(),
        players: players.filter((p) => p.trim() !== ''),
      };
      return { ...prev, teams: [...prev.teams, newTeam] };
    });
  }, []);

  const removeTeam = useCallback((id: string) => {
    setTournament((prev) => {
      if (!prev) return prev;
      return { ...prev, teams: prev.teams.filter((t) => t.id !== id) };
    });
  }, []);

  const editTeam = useCallback((id: string, name: string, players: string[]) => {
    setTournament((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        teams: prev.teams.map((t) =>
          t.id === id ? { ...t, name: name.trim(), players } : t,
        ),
      };
    });
  }, []);

  const generateBracket = useCallback(() => {
    setTournament((prev) => {
      if (!prev) return prev;
      if (prev.teams.length < 2) {
        setError('Se necesitan al menos 2 equipos para generar el bracket.');
        return prev;
      }
      setError('');
      const firstRound = generateFirstRound(prev.teams);
      return { ...prev, rounds: [firstRound] };
    });
    setPhase('bracket');
  }, []);

  const selectWinner = useCallback(
    (roundIndex: number, matchId: string, winner: Team) => {
      setTournament((prev) => {
        if (!prev) return prev;
        const rounds = prev.rounds.map((round, ri) => {
          if (ri !== roundIndex) return round;
          return round.map((match): Match => {
            if (match.id !== matchId) return match;
            return { ...match, winner };
          });
        });
        return { ...prev, rounds };
      });
    },
    [],
  );

  const clearWinner = useCallback(
    (roundIndex: number, matchId: string) => {
      setTournament((prev) => {
        if (!prev) return prev;
        const rounds = prev.rounds.map((round, ri) => {
          if (ri !== roundIndex) return round;
          return round.map((match): Match => {
            if (match.id !== matchId) return match;
            return { ...match, winner: null };
          });
        });
        return { ...prev, rounds };
      });
    },
    [],
  );

  const advanceRound = useCallback(() => {
    setTournament((prev) => {
      if (!prev) return prev;
      const currentRound = prev.rounds[prev.rounds.length - 1];
      if (!areAllMatchesCompleted(currentRound)) return prev;
      const nextRound = generateNextRound(currentRound);
      const newRounds = [...prev.rounds, nextRound];
      const champion = getChampion(newRounds);
      return { ...prev, rounds: newRounds, champion };
    });
  }, []);

  // No llama window.confirm — App.tsx muestra el ConfirmModal antes
  const resetTournament = useCallback(() => {
    storageService.clear();
    setTournament(null);
    setPhase('setup');
    setError('');
  }, []);

  return {
    tournament,
    phase,
    error,
    createTournament,
    addTeam,
    removeTeam,
    editTeam,
    generateBracket,
    selectWinner,
    clearWinner,
    advanceRound,
    resetTournament,
  };
}
