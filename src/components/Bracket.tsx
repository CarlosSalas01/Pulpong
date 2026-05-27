import type { Match, Team } from "../models/tournament.types";
import { areAllMatchesCompleted } from "../utils/bracket.utils";
import RoundColumn from "./RoundColumn";

interface BracketProps {
  rounds: Match[][];
  champion: Team | null;
  onSelectWinner: (roundIndex: number, matchId: string, winner: Team) => void;
  onAdvanceRound: () => void;
}

export default function Bracket({
  rounds,
  champion,
  onSelectWinner,
  onAdvanceRound,
}: BracketProps) {
  const currentRoundIndex = rounds.length - 1;
  const currentRound = rounds[currentRoundIndex];
  const allCompleted = areAllMatchesCompleted(currentRound);
  const isFinal = currentRound.length === 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Scroll horizontal en desktop para ver todas las rondas */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max px-1">
          {rounds.map((round, ri) => (
            <RoundColumn
              key={ri}
              matches={round}
              roundIndex={ri}
              isCurrentRound={ri === currentRoundIndex}
              onSelectWinner={onSelectWinner}
            />
          ))}
        </div>
      </div>

      {/* Botón avanzar ronda */}
      {!champion && allCompleted && !isFinal && (
        <button
          onClick={onAdvanceRound}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-colors self-center w-full max-w-xs"
        >
          Generar siguiente ronda →
        </button>
      )}

      {/* Calcular campeón si ronda final completada */}
      {!champion && allCompleted && isFinal && (
        <button
          onClick={onAdvanceRound}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-colors self-center w-full max-w-xs"
        >
          Ver campeón 🏆
        </button>
      )}

      {/* Instrucción cuando aún hay partidos pendientes */}
      {!champion && !allCompleted && (
        <p className="text-neutral-500 text-sm text-center">
          Selecciona al ganador de cada partido para continuar.
        </p>
      )}
    </div>
  );
}
