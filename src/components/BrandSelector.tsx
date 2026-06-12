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
    <label className="flex items-center gap-2 text-xs font-semibold text-(--color-muted)">
      {/* <span className="hidden sm:inline">Tema</span> */}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BeerBrandKey)}
        className="cursor-pointer rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-xs font-bold text-(--color-text) shadow-sm outline-none transition-colors hover:border-(--color-primary) focus:border-(--color-primary)"
        aria-label="Seleccionar tema de cerveza"
      >
        {Object.entries(beerBrandPalettes).map(([key, palette]) => (
          <option key={key} value={key}>
            {palette.name}
          </option>
        ))}
      </select>
    </label>
  );
}
