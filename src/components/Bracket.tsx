import type { Match, Team } from "../models/tournament.types";
import { areAllMatchesCompleted } from "../utils/bracket.utils";
import RoundColumn from "./RoundColumn";

interface BracketProps {
  rounds: Match[][];
  champion: Team | null;
  onSelectWinner: (roundIndex: number, matchId: string, winner: Team) => void;
  onClearWinner: (roundIndex: number, matchId: string) => void;
  onAdvanceRound: () => void;
}

export default function Bracket({
  rounds,
  champion,
  onSelectWinner,
  onClearWinner,
  onAdvanceRound,
}: BracketProps) {
  const currentRoundIndex = rounds.length - 1;
  const currentRound = rounds[currentRoundIndex];
  const allCompleted = areAllMatchesCompleted(currentRound);
  const isFinal = currentRound.length === 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 px-4 md:overflow-x-auto md:pb-4">
        <div className="flex flex-col gap-8 md:min-w-max md:flex-row md:gap-6">
          {rounds.map((round, ri) => (
            <RoundColumn
              key={ri}
              matches={round}
              roundIndex={ri}
              isCurrentRound={ri === currentRoundIndex}
              onSelectWinner={onSelectWinner}
              onClearWinner={onClearWinner}
            />
          ))}
        </div>
      </div>

      {!champion && allCompleted && !isFinal && (
        <button
          onClick={onAdvanceRound}
          className="app-button-primary w-full max-w-xs self-center rounded-xl px-6 py-3 font-bold transition-all active:scale-[0.98]"
        >
          Generar siguiente ronda →
        </button>
      )}

      {!champion && allCompleted && isFinal && (
        <button
          onClick={onAdvanceRound}
          className="app-button-primary w-full max-w-xs self-center rounded-xl px-6 py-3 font-bold transition-all active:scale-[0.98]"
        >
          Ver campeón 🏆
        </button>
      )}

      {!champion && !allCompleted && (
        <p className="rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 py-3 text-center text-sm font-semibold text-(--color-muted)">
          Selecciona al ganador de cada partido para continuar.
        </p>
      )}
    </div>
  );
}
