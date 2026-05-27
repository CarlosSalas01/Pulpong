import type { Tournament } from "../models/tournament.types";

const STORAGE_KEY = "beer_pong_tournament";

export const storageService = {
  save(tournament: Tournament): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tournament));
    } catch {
      console.warn("No se pudo guardar el torneo en localStorage.");
    }
  },

  load(): Tournament | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as Tournament;
    } catch {
      return null;
    }
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
