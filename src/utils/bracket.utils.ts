import type { Match, Team } from "../models/tournament.types";

/** Mezcla aleatoriamente un array (Fisher-Yates). */
export function shuffleTeams<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Devuelve la potencia de 2 igual o superior a n. */
export function getNextPowerOfTwo(n: number): number {
  let power = 1;
  while (power < n) power *= 2;
  return power;
}

/**
 * Genera la primera ronda del bracket.
 * Los byes se asignan automáticamente: el equipo con bye pasa solo (teamB = null, winner = teamA).
 */
export function generateFirstRound(teams: Team[]): Match[] {
  const shuffled = shuffleTeams(teams);
  const bracketSize = getNextPowerOfTwo(shuffled.length);
  const byeCount = bracketSize - shuffled.length;

  // Rellenar con nulls al final para representar byes
  const slots: (Team | null)[] = [...shuffled, ...Array(byeCount).fill(null)];

  const matches: Match[] = [];
  for (let i = 0; i < slots.length; i += 2) {
    const teamA = slots[i];
    const teamB = slots[i + 1];

    // Omitir pares donde ambos son null (artefacto del relleno de potencia de 2)
    if (teamA === null && teamB === null) continue;

    const isBye = teamB === null;
    matches.push({
      id: crypto.randomUUID(),
      round: 1,
      teamA,
      teamB,
      winner: isBye ? teamA : null,
    });
  }
  return matches;
}

/**
 * Genera la siguiente ronda a partir de los ganadores de la ronda previa.
 */
export function generateNextRound(previousRound: Match[]): Match[] {
  const winners = previousRound
    .map((m) => m.winner)
    .filter((w): w is Team => w !== null);

  const roundNumber = (previousRound[0]?.round ?? 0) + 1;
  const matches: Match[] = [];

  for (let i = 0; i < winners.length; i += 2) {
    const teamA = winners[i];
    const teamB = winners[i + 1] ?? null;
    const isBye = teamB === null;
    matches.push({
      id: crypto.randomUUID(),
      round: roundNumber,
      teamA,
      teamB,
      winner: isBye ? teamA : null,
    });
  }
  return matches;
}

/** Verifica si todos los partidos de una ronda tienen ganador. */
export function areAllMatchesCompleted(round: Match[]): boolean {
  return round.every((m) => m.winner !== null);
}

/** Devuelve al campeón si la última ronda tiene un solo ganador. */
export function getChampion(rounds: Match[][]): Team | null {
  if (rounds.length === 0) return null;
  const lastRound = rounds[rounds.length - 1];
  if (lastRound.length === 1 && lastRound[0].winner !== null) {
    return lastRound[0].winner;
  }
  return null;
}
