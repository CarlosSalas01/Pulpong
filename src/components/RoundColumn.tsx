import type { Match, Team } from "../models/tournament.types";
import MatchCard from "./MatchCard";

interface RoundColumnProps {
  matches: Match[];
  roundIndex: number;
  isCurrentRound: boolean;
  onSelectWinner: (roundIndex: number, matchId: string, winner: Team) => void;
  onClearWinner: (roundIndex: number, matchId: string) => void;
}

export default function RoundColumn({
  matches,
  roundIndex,
  isCurrentRound,
  onSelectWinner,
  onClearWinner,
}: RoundColumnProps) {
  const roundNumber = matches[0]?.round ?? roundIndex + 1;

  return (
    <div className="flex w-full flex-col gap-3 md:w-48">
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) px-3 py-2 text-center shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-(--color-primary)">
          {matches.length === 1 ? "Final" : `Ronda ${roundNumber}`}
        </h3>

        {isCurrentRound && (
          <p className="mt-0.5 text-xs font-semibold text-(--color-muted)">
            Ronda actual
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isCurrentRound={isCurrentRound}
            onSelectWinner={(winner) =>
              onSelectWinner(roundIndex, match.id, winner)
            }
            onClearWinner={
              isCurrentRound
                ? () => onClearWinner(roundIndex, match.id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
