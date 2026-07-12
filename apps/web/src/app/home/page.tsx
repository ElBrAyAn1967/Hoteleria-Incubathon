"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandBar } from "@/components/ui/BrandBar";
import { Avatar } from "@/components/ui/Avatar";
import { SearchInput } from "@/components/ui/SearchInput";
import type { AnfitrionCard } from "@/types/tourist-flow";

const catalogo: AnfitrionCard[] = [
  { id: "lucia", titulo: "Cocina de mercado", categoria: "Gastronomía", emoji: "🍲" },
  { id: "diego", titulo: "Manglar al amanecer", categoria: "Naturaleza", emoji: "🌅" },
  { id: "renata", titulo: "Arte de barrio", categoria: "Cultura", emoji: "🎨" },
  { id: "mar", titulo: "Buceo en cenotes", categoria: "Aventura", emoji: "🤿" },
];

// Dashboard / Exploración — punto de entrada del turista ya dentro del flujo
// (viene de una recomendación del hotel). Columna vertical, espaciado p-6.
export default function HomePage() {
  const [busqueda, setBusqueda] = useState("");

  const filtrado = useMemo(
    () =>
      catalogo.filter((c) =>
        `${c.titulo} ${c.categoria}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <main className="min-h-screen bg-surface px-4 py-10">
      <div className="mx-auto max-w-lg">
        <BrandBar />
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar nombre="Marta Reyes" />
            <div>
              <p className="text-xs text-muted">Hola de nuevo,</p>
              <p className="font-display text-lg font-semibold text-ink">Marta</p>
            </div>
          </div>
          <Link href="/request" className="btn-primary !py-2 !px-5 text-sm">
            Cotizar
          </Link>
        </header>

        <div className="mt-6">
          <SearchInput value={busqueda} onChange={setBusqueda} />
        </div>

        {/* Tarjeta flotante — misma identidad visual que /request (siguiente
            etapa del mismo flujo de turista): fondo bg sobre bg-surface,
            radio 24px, sombra sin borde (regla de DESIGN.md: borde o sombra,
            nunca ambos). */}
        <section
          aria-labelledby="galeria-heading"
          className="mt-6 rounded-3xl bg-bg p-8 shadow-lg"
        >
          <h1 id="galeria-heading" className="font-display text-2xl font-semibold text-ink">
            Vive tu próxima experiencia
          </h1>
          <p className="mt-1 text-sm text-muted">Curado por anfitriones reales, no un catálogo genérico.</p>

          <div className="mt-5 gallery-list">
            {filtrado.map((card) => (
              <div key={card.id} className="gallery-list-row">
                <div className="gallery-list-icon" aria-hidden="true">{card.emoji}</div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">{card.categoria}</p>
                  <h3 className="font-display text-base font-semibold text-ink">{card.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
          {filtrado.length === 0 && (
            <p className="mt-6 text-center text-sm text-muted">Sin resultados para “{busqueda}”.</p>
          )}
        </section>
      </div>
    </main>
  );
}
