import type { Team } from "../models/tournament.types";

interface TeamListProps {
  teams: Team[];
  onRemove: (id: string) => void;
}

export default function TeamList({ teams, onRemove }: TeamListProps) {
  if (teams.length === 0) return null;

  return (
    <ul className="space-y-2 mt-4">
      {teams.map((team, i) => (
        <li
          key={team.id}
          className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-amber-500 font-mono text-sm w-5 shrink-0">
              {i + 1}.
            </span>
            <div className="min-w-0">
              <p className="text-white font-medium truncate">{team.name}</p>
              {team.players.length > 0 && (
                <p className="text-neutral-500 text-xs truncate">
                  {team.players.join(", ")}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => onRemove(team.id)}
            aria-label={`Eliminar ${team.name}`}
            className="text-neutral-500 hover:text-red-400 ml-3 shrink-0 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
