import type { Match, Team } from "../models/tournament.types";
import MatchCard from "./MatchCard";

interface RoundColumnProps {
  matches: Match[];
  roundIndex: number;
  isCurrentRound: boolean;
  onSelectWinner: (roundIndex: number, matchId: string, winner: Team) => void;
}

export default function RoundColumn({
  matches,
  roundIndex,
  isCurrentRound,
  onSelectWinner,
}: RoundColumnProps) {
  const roundNumber = matches[0]?.round ?? roundIndex + 1;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-center text-sm font-bold text-neutral-400 uppercase tracking-widest">
        {matches.length === 1 ? "Final" : `Ronda ${roundNumber}`}
      </h3>
      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isCurrentRound={isCurrentRound}
            onSelectWinner={(winner) =>
              onSelectWinner(roundIndex, match.id, winner)
            }
          />
        ))}
      </div>
    </div>
  );
}
