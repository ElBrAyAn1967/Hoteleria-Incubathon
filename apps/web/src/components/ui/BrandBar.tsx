import Link from "next/link";
import { brand } from "@/content/brand";

// Barra de marca mínima para las pantallas de flujo (turista/anfitrión).
// Da al usuario una forma SIEMPRE visible de volver a la landing — sin ella,
// el jurado entra a un flujo y queda atrapado. Mismo estilo que el Header
// principal (tokens bg/ink/primary), así todo el producto se siente uno solo.
export function BrandBar({ back = "/", label = "Volver" }: { back?: string; label?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Link
        href="/"
        className="font-display text-lg font-semibold tracking-tight text-primary"
      >
        {brand.siteName}
      </Link>
      <Link
        href={back}
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {label}
      </Link>
    </div>
  );
}
