import { useEffect, useRef, useState } from "react";
import {
  beerBrandPalettes,
  type BeerBrandKey,
} from "../theme/beerBrandPalettes";

interface BrandSelectorProps {
  value: BeerBrandKey;
  onChange: (brand: BeerBrandKey) => void;
}

export default function BrandSelector({ value, onChange }: BrandSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const currentLabel = beerBrandPalettes[value].name;

  return (
    <div ref={containerRef} className="relative" aria-label="Seleccionar tema de cerveza">

      {/* ── Pill trigger ── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          flex items-center gap-1.5
          rounded-full border border-(--color-border)
          bg-(--color-soft)
          px-3 py-1.5
          text-[11px] font-bold tracking-wide
          text-(--color-primary)
          transition-all select-none
          hover:bg-(--color-hover) hover:border-(--color-border-strong)
          active:scale-95
        "
      >
        <span>{currentLabel}</span>
        {/* Chevron que rota al abrir */}
        <svg
          className={`h-2.5 w-2.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 10 6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 0l5 6 5-6z" />
        </svg>
      </button>

      {/* ── Dropdown menu ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Temas de cerveza"
          className="
            absolute right-0 top-[calc(100%+6px)] z-50
            min-w-[120px]
            rounded-2xl border border-(--color-border)
            bg-(--color-surface)
            shadow-xl
            overflow-hidden
            animate-fade-in
          "
        >
          {Object.entries(beerBrandPalettes).map(([key, palette]) => {
            const isActive = key === value;
            return (
              <button
                key={key}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => { onChange(key as BeerBrandKey); setOpen(false); }}
                className={`
                  w-full flex items-center justify-between gap-3
                  px-4 py-2.5
                  text-left text-xs font-semibold
                  transition-colors
                  ${isActive
                    ? "bg-(--color-soft) text-(--color-primary)"
                    : "text-(--color-text) hover:bg-(--color-hover)"
                  }
                `}
              >
                <span>{palette.name}</span>
                {isActive && (
                  <svg className="h-3 w-3 shrink-0 text-(--color-primary)" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M1 6l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
