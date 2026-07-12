import type { Config } from "tailwindcss";

// Paleta NavigoX (docs/design/brand_kit.md): Saigon Night Blue + Oaxacan Chili Orange.
// Reemplaza el placeholder Atlas Nexus anterior. Nombres de token NEUTRALES a
// propósito (primary/accent, no "azul"/"naranja"): al duplicar el proyecto con otra
// identidad visual, solo cambian estos valores hex, nunca los nombres — así los
// componentes no necesitan tocarse.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",          // White — lienzo general
        surface: "#E1E8EC",     // Bangkok Pavement Gray — contenedores/fondos secundarios
        ink: "#1A2A44",         // Saigon Night Blue — texto principal
        muted: "#4C5870",       // variante clara de ink, ≥4.5:1 sobre bg
        primary: "#1A2A44",       // Saigon Night Blue — acento principal
        "primary-deep": "#101929", // Saigon Night Blue profundo — fondos oscuros ricos
        accent: "#F47C3C",        // Oaxacan Chili Orange — CTA/acento secundario
        "accent-deep": "#D9652E", // Oaxacan Chili Orange oscurecido — hover/variación
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
