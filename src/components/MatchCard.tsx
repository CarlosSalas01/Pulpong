import type { Match, Team } from "../models/tournament.types";

interface MatchCardProps {
  match: Match;
  onSelectWinner?: (winner: Team) => void;
  onClearWinner?: () => void;
  isCurrentRound: boolean;
}

export default function MatchCard({
  match,
  onSelectWinner,
  onClearWinner,
  isCurrentRound,
}: MatchCardProps) {
  const { teamA, teamB, winner } = match;

  // Partido con bye: solo un equipo, ya tiene ganador automático
  if (!teamB) {
    return (
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-3 w-full md:w-44 shrink-0">
        <p className="text-xs text-amber-500 font-semibold mb-2 uppercase tracking-wide">
          BYE
        </p>
        <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-2 py-1.5 text-center">
          <p className="text-amber-300 font-semibold text-sm truncate">
            {teamA?.name ?? "—"}
          </p>
        </div>
        <p className="text-xs text-neutral-500 mt-1.5 text-center">
          Pasa automáticamente
        </p>
      </div>
    );
  }

  function teamClass(team: Team | null): string {
    if (!team) return "";
    const isWinner = winner?.id === team.id;
    const isLoser = winner !== null && winner.id !== team.id;
    if (isWinner) return "bg-amber-500 border-amber-400 text-black";
    if (isLoser) return "bg-neutral-900 border-neutral-700 text-neutral-500";
    return "bg-neutral-700 border-neutral-600 text-white hover:border-amber-500 hover:bg-neutral-600";
  }

  function handleClick(team: Team | null) {
    if (!team || !isCurrentRound || !onSelectWinner) return;
    onSelectWinner(team);
  }

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-3 w-full md:w-44 shrink-0">
      <p className="text-xs text-neutral-500 font-semibold mb-2 uppercase tracking-wide">
        Ronda {match.round}
      </p>
      <div className="space-y-1.5">
        <button
          onClick={() => handleClick(teamA)}
          disabled={!isCurrentRound || winner !== null}
          className={`w-full border rounded-lg px-2 py-2 text-sm font-medium truncate transition-all ${teamClass(teamA)} ${isCurrentRound && winner === null ? "cursor-pointer" : "cursor-default"}`}
        >
          {teamA?.name ?? "TBD"}
        </button>

        <p className="text-neutral-600 text-xs text-center font-bold">VS</p>

        <button
          onClick={() => handleClick(teamB)}
          disabled={!isCurrentRound || winner !== null}
          className={`w-full border rounded-lg px-2 py-2 text-sm font-medium truncate transition-all ${teamClass(teamB)} ${isCurrentRound && winner === null ? "cursor-pointer" : "cursor-default"}`}
        >
          {teamB?.name ?? "TBD"}
        </button>
      </div>
      {winner && (
        <div className="mt-2 text-center">
          <p className="text-xs text-amber-400 font-semibold truncate">
            🏆 {winner.name}
          </p>
          <hr className="mt-3 border-neutral-700" />
          {isCurrentRound && onClearWinner && (
            <button
              onClick={onClearWinner}
              className="text-xs text-neutral-500 hover:text-white mt-1 transition-colors"
            >
              Cambiar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
