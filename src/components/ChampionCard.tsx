import type { Team } from "../models/tournament.types";
import Champion from "../assets/img/Champ.png";

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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-(--color-border-strong) bg-(--color-surface) p-8 shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-(--color-soft) to-transparent" />

        <div className="relative">
          <div className="mb-4 flex justify-center">
            <img src={Champion} alt="Champion" className="w-60 h-60" />
          </div>

          <p className="mb-2 text-sm font-black uppercase tracking-widest text-(--color-primary)">
            ¡Campeón del torneo!
          </p>

          <h2 className="mb-3 text-3xl font-extrabold leading-tight text-(--color-text)">
            {champion.name}
          </h2>

          {champion.players.length > 0 && (
            <p className="mb-6 text-sm font-semibold text-(--color-muted)">
              {champion.players.join(" · ")}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onReset}
              className="app-button-primary rounded-xl py-3 font-bold transition-all active:scale-[0.98]"
            >
              Nuevo torneo
            </button>
          </div>
        </div>
      </div>

      <button
        className="mt-6 rounded-xl px-3 py-2 text-xs font-bold text-(--color-muted) transition-colors hover:bg-(--color-hover) hover:text-(--color-primary)"
        onClick={onViewBracket}
      >
        Ver bracket
      </button>
    </div>
  );
}
