import type { Config } from "tailwindcss";

// Paleta verde mate + blanco cálido (turismo + naturaleza), modo CLARO.
// Estrategia "committed": el verde carga la identidad; el blanco da el espacio.
// OKLCH, seed verde moss 140° (guía de impeccable). Contraste verificado ≥4.5:1.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "oklch(0.985 0.004 140)",        // blanco cálido casi puro (leve verde, NO cream)
        surface: "oklch(0.965 0.008 140)",   // capa sutil para separar bloques
        ink: "oklch(0.22 0.02 150)",         // texto — casi negro con pizca de verde
        muted: "oklch(0.45 0.015 150)",      // secundario, aún ≥4.5:1 sobre bg
        moss: "oklch(0.30 0.096 140)",       // verde primario (el protagonista)
        "moss-deep": "oklch(0.24 0.08 145)", // verde profundo (fondos ricos)
        lima: "oklch(0.82 0.14 130)",        // acento claro (punto de luz)
        clay: "oklch(0.70 0.11 55)",         // terracota suave (segundo acento cálido)
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"], // serif display
        sans: ["var(--font-inter)", "system-ui", "sans-serif"], // sans de cuerpo
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
