import type { AnfitrionCard } from "@/types/tourist-flow";

// Tarjeta abstracta de la galería del dashboard — sin fotos reales, icono
// tipográfico (emoji) sobre bloque de color para evitar assets faltantes.
export function GalleryCard({ card }: { card: AnfitrionCard }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-surface transition-transform duration-300 ease-out-expo hover:-translate-y-1">
      <div
        className="flex aspect-square items-center justify-center bg-primary text-4xl"
        aria-hidden="true"
      >
        {card.emoji}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-accent">{card.categoria}</p>
        <h3 className="mt-1 font-display text-base font-semibold text-ink">{card.titulo}</h3>
      </div>
    </article>
  );
}
