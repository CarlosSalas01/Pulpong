import type { Team } from "../models/tournament.types";

interface ChampionCardProps {
  champion: Team;
  onReset: () => void;
  onViewBracket: () => void;
}

export default function ChampionCard({
  champion,
  onReset,
  onViewBracket,
}: ChampionCardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-linear-to-b from-amber-500/20 to-neutral-900 border-2 border-amber-500 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-amber-900/40">
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-2">
          ¡Campeón del torneo!
        </p>
        <h2 className="text-white text-3xl font-extrabold mb-3 leading-tight">
          {champion.name}
        </h2>
        {champion.players.length > 0 && (
          <p className="text-neutral-400 text-sm mb-6">
            {champion.players.join(" · ")}
          </p>
        )}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onReset}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors"
          >
            Nuevo torneo
          </button>
        </div>
      </div>

      <button
        className="text-neutral-500 text-xs mt-6 rounded px-3 py-1 hover:bg-neutral-700 hover:text-white transition-colors"
        onClick={onViewBracket}
      >
        Ver bracket.
      </button>
    </div>
  );
}
