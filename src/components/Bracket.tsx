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
      {/*
        Móvil  → flex-col: rondas apiladas verticalmente, tarjetas full-width
        Desktop → flex-row + overflow-x-auto: columnas por ronda con scroll horizontal
      */}
      <div className="md:overflow-x-auto md:pb-4 -mx-4 px-4">
        <div className="flex flex-col gap-8 md:flex-row md:gap-6 md:min-w-max">
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
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-colors w-full max-w-xs self-center"
        >
          Generar siguiente ronda →
        </button>
      )}

      {!champion && allCompleted && isFinal && (
        <button
          onClick={onAdvanceRound}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-colors w-full max-w-xs self-center"
        >
          Ver campeón 🏆
        </button>
      )}

      {!champion && !allCompleted && (
        <p className="text-neutral-500 text-sm text-center">
          Selecciona al ganador de cada partido para continuar.
        </p>
      )}
    </div>
  );
}
