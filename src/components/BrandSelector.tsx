import {
  beerBrandPalettes,
  type BeerBrandKey,
} from "../theme/beerBrandPalettes";

interface BrandSelectorProps {
  value: BeerBrandKey;
  onChange: (brand: BeerBrandKey) => void;
}

export default function BrandSelector({ value, onChange }: BrandSelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1">
      {Object.entries(beerBrandPalettes).map(([key, palette]) => {
        const brandKey = key as BeerBrandKey;
        const isActive = value === brandKey;

        return (
          <button
            key={brandKey}
            type="button"
            onClick={() => onChange(brandKey)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
              isActive
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm"
                : "border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-hover)]"
            }`}
          >
            {palette.name}
          </button>
        );
      })}
    </div>
  );
}
