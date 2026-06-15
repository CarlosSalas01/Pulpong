import BrandSelector from "./BrandSelector";
import type { BeerBrandKey } from "../theme/beerBrandPalettes";
import PulpongLogo from "../assets/img/Pulpong.png";

interface AppHeaderProps {
  tournamentName?: string;
  brand: BeerBrandKey;
  onBrandChange: (brand: BeerBrandKey) => void;
  onReset?: () => void;
  /** Oculta el botón ↻ cuando la ChampionCard tiene su propio CTA de reset */
  isChampionScreen?: boolean;
}

export default function AppHeader({
  tournamentName,
  brand,
  onBrandChange,
  onReset,
  isChampionScreen = false,
}: AppHeaderProps) {
  const showResetBtn = onReset && !isChampionScreen;

  return (
    <header className="sticky top-0 z-10 border-b border-(--color-border) bg-(--color-surface)/95 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">

        {/* ── Izquierda: Badge logo + título + subtítulo ── */}
        <div className="flex items-center gap-2.5 min-w-0">

          {/* Badge del logo */}
          <div className="shrink-0 rounded-xl bg-(--color-soft) p-1.5 ring-1 ring-(--color-border)">
            <img
              src={PulpongLogo}
              alt="Pulpong Logo"
              className="h-7 w-7 object-cover rounded-lg app-logo-img"
            />
          </div>

          {/* Textos */}
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="text-sm font-black tracking-widest leading-none text-(--color-primary) uppercase">
              Pulpong
            </h1>
            <p className="text-[10px] leading-none text-(--color-muted) mt-0.5 font-medium tracking-wide truncate">
              {tournamentName ? (
                <span className="truncate">{tournamentName}</span>
              ) : (
                "Torneo Beer Pong"
              )}
            </p>
          </div>
        </div>

        {/* ── Derecha: Pill selector + botón circular ── */}
        <div className="flex items-center gap-2 shrink-0">
          <BrandSelector value={brand} onChange={onBrandChange} />

          {showResetBtn && (
            <button
              onClick={onReset}
              title="Reiniciar torneo"
              aria-label="Reiniciar torneo"
              className="h-8 w-8 rounded-full flex items-center justify-center text-sm text-red-500/70 border border-red-500/25 bg-transparent transition-all hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/50 active:scale-95"
            >
              ↻
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
