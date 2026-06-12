import BrandSelector from "./BrandSelector";
import type { BeerBrandKey } from "../theme/beerBrandPalettes";
import PulpongLogo from "../assets/img/Pulpong.png";

interface AppHeaderProps {
  tournamentName?: string;
  brand: BeerBrandKey;
  onBrandChange: (brand: BeerBrandKey) => void;
  onReset?: () => void;
}

export default function AppHeader({
  tournamentName,
  brand,
  onBrandChange,
  onReset,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-(--color-border) bg-(--color-surface)/95 px-4 py-3 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <img
            src={PulpongLogo}
            alt="Pulpong Logo"
            className="h-10 w-10 object-cover rounded-full mix-blend-multiply"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight text-(--color-primary)">
              PULPONG
            </h1>
            {tournamentName && (
              <p className="max-w-45 truncate text-xs leading-tight text-(--color-muted)">
                {tournamentName}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <BrandSelector value={brand} onChange={onBrandChange} />

          {onReset && (
            <button
              onClick={onReset}
              className="rounded-lg border border-red-700/50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
