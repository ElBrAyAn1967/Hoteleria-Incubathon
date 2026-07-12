import type { Config } from "tailwindcss";

// Paleta Atlas Nexus (docs/design/brand_kit.md): Deep Space Blue + Stellar Orange.
// 60% Deep Space Blue / 30% Stellar Orange / 5% Lunar Gray / 5% Data White.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",        // Data White — lienzo general
        surface: "#E5E9EC",   // Lunar Gray — contenedores/fondos secundarios
        ink: "#1A253A",       // Deep Space Blue — texto principal
        muted: "#4B5768",     // variante clara de Deep Space Blue, ≥4.5:1 sobre bg
        moss: "#1A253A",      // Deep Space Blue — acento principal (60%)
        "moss-deep": "#10182A", // Deep Space Blue profundo — fondos oscuros ricos
        lima: "#F47C3C",      // Stellar Orange — CTA/acento secundario (30%)
        clay: "#D9652E",      // Stellar Orange oscurecido — hover/variación
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"], // titulares — Inter Bold/SemiBold
        sans: ["var(--font-roboto)", "system-ui", "sans-serif"],   // cuerpo — Roboto Regular/Medium
      },
      maxWidth: { content: "1160px" },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)", // ease-out expo (sin bounce)
      },
    },
  },
  plugins: [],
};
export default config;
