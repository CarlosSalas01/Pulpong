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

  if (!teamB) {
    return (
      <div className="w-full shrink-0 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 shadow-lg md:w-48">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-(--color-primary)">
          BYE
        </p>

        <div className="rounded-xl border border-(--color-border-strong) bg-(--color-soft) px-2 py-2 text-center">
          <p className="truncate text-sm font-bold text-(--color-text)">
            {teamA?.name ?? "—"}
          </p>
        </div>

        <p className="mt-2 text-center text-xs font-semibold text-(--color-muted)">
          Pasa automáticamente
        </p>
      </div>
    );
  }

  function teamClass(team: Team | null): string {
    if (!team) return "";

    const isWinner = winner?.id === team.id;
    const isLoser = winner !== null && winner.id !== team.id;

    if (isWinner) {
      return "border-(--color-primary) bg-(--color-primary) text-(--color-on-primary) shadow-md";
    }

    if (isLoser) {
      return "border-(--color-border) bg-(--color-soft) text-(--color-muted) opacity-70";
    }

    return "border-(--color-border) bg-(--color-surface) text-(--color-text) hover:border-(--color-primary) hover:bg-(--color-hover)";
  }

  function handleClick(team: Team | null) {
    if (!team || !isCurrentRound || !onSelectWinner) return;
    onSelectWinner(team);
  }

  return (
    <div
      className={`w-full shrink-0 rounded-2xl border p-3 shadow-lg transition-colors md:w-48 ${
        isCurrentRound
          ? "border-(--color-border-strong) bg-(--color-surface)"
          : "border-(--color-border) bg-(--color-surface)/75"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wide text-(--color-muted)">
          Ronda {match.round}
        </p>

        {isCurrentRound && !winner && (
          <span className="rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] font-bold text-(--color-primary)">
            Activo
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <button
          onClick={() => handleClick(teamA)}
          disabled={!isCurrentRound || winner !== null}
          className={`w-full truncate rounded-xl border px-2 py-2 text-sm font-bold transition-all ${teamClass(
            teamA,
          )} ${
            isCurrentRound && winner === null
              ? "cursor-pointer active:scale-[0.98]"
              : "cursor-default"
          }`}
        >
          {teamA?.name ?? "TBD"}
        </button>

        <p className="text-center text-xs font-black text-(--color-muted)">
          VS
        </p>

        <button
          onClick={() => handleClick(teamB)}
          disabled={!isCurrentRound || winner !== null}
          className={`w-full truncate rounded-xl border px-2 py-2 text-sm font-bold transition-all ${teamClass(
            teamB,
          )} ${
            isCurrentRound && winner === null
              ? "cursor-pointer active:scale-[0.98]"
              : "cursor-default"
          }`}
        >
          {teamB?.name ?? "TBD"}
        </button>
      </div>

      {winner && (
        <div className="mt-3 border-t border-(--color-border) pt-2 text-center">
          <p className="truncate text-xs font-black text-(--color-primary)">
            🏆 {winner.name}
          </p>

          {isCurrentRound && onClearWinner && (
            <button
              onClick={onClearWinner}
              className="mt-1 rounded-lg px-2 py-1 text-xs font-semibold text-(--color-muted) transition-colors hover:bg-(--color-hover) hover:text-(--color-primary)"
            >
              Cambiar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
