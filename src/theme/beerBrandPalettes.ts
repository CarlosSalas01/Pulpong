export const beerBrandPalettes = {
  miller: {
    name: "Miller",
    primary: "#0033A0",
    secondary: "#C99700",
    accent: "#D71920",
    background: "#F7F7F2",
    surface: "#FFFFFF",
    text: "#061A40",
    dark: "#061A40",
    onPrimary: "#FFFFFF",
  },
  corona: {
    name: "Corona",
    primary: "#002F6C",
    secondary: "#F6C343",
    accent: "#8AC7E8",
    background: "#FFF8E7",
    surface: "#FFFFFF",
    text: "#001E42",
    dark: "#001E42",
    onPrimary: "#FFFFFF",
  },
  victoria: {
    name: "Victoria",
    primary: "#8B1E1E",
    secondary: "#D6A441",
    accent: "#F2D48A",
    background: "#FFF3D6",
    surface: "#FFF8E8",
    text: "#3A1F14",
    dark: "#3A1F14",
    onPrimary: "#FFFFFF",
  },
  modelo: {
    name: "Modelo",
    primary: "#D6A441",
    secondary: "#102A54",
    accent: "#111111",
    background: "#F8F1E3",
    surface: "#FFFFFF",
    text: "#111111",
    dark: "#050505",
    onPrimary: "#111111",
  },
  barrilito: {
    name: "Barrilito",
    primary: "#D99A22",
    secondary: "#7A3E18",
    accent: "#B3261E",
    background: "#FFF1C7",
    surface: "#FFF8E6",
    text: "#2B160A",
    dark: "#2B160A",
    onPrimary: "#FFFFFF",
  },
  "dos-equis": {
    name: "Dos Equis",
    primary: "#05730F",
    secondary: "#F91B0E",
    accent: "#D7C493",
    background: "#F8F3D2",
    surface: "#FFF8E6",
    text: "#1E1A12",
    dark: "#063D0B",
    onPrimary: "#FFFFFF",
  },
} as const;

export type BeerBrandKey = keyof typeof beerBrandPalettes;

export const defaultBeerBrand: BeerBrandKey = "miller";

export function isBeerBrandKey(value: string): value is BeerBrandKey {
  return value in beerBrandPalettes;
}
