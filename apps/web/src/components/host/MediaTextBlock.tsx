import type { MediaTextBlockData } from "@/types/host-flow";

interface MediaTextBlockProps {
  data: MediaTextBlockData;
  reverse?: boolean;
}

// Bloque zig-zag reutilizable: imagen placeholder + texto, alternando lado
// según `reverse`. Sin fotos reales todavía — bloque neutro con icono abstracto.
export function MediaTextBlock({ data, reverse = false }: MediaTextBlockProps) {
  return (
    <article className={`flex items-center gap-5 ${reverse ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-surface text-muted"
        aria-hidden="true"
      >
        <IconImage />
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink">{data.titulo}</h3>
        <p className="mt-1 text-sm text-muted">{data.descripcion}</p>
      </div>
    </article>
  );
}

function IconImage() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}
