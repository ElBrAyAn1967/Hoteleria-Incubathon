"use client";

import { useState } from "react";
import Link from "next/link";
import { RouteMap } from "@/components/ui/RouteMap";
import { TaskItemCard } from "@/components/ui/TaskItemCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ItineraryDay, MapStop } from "@/types/tourist-flow";

const paradas: MapStop[] = [
  { id: "1", nombre: "Mercado Benito Juárez", nota: "9:00 am", x: 18, y: 70 },
  { id: "2", nombre: "Taller de Renata", nota: "11:30 am", x: 48, y: 38 },
  { id: "3", nombre: "Manglar Manialtepec", nota: "5:00 pm", x: 78, y: 58 },
];

const itinerarioInicial: ItineraryDay[] = [
  {
    dia: 1,
    etiqueta: "Día 1",
    tareas: [
      { id: "d1-1", hora: "9:00 am", titulo: "Desayuno de mercado con Lucía", detalle: "Puestos que no salen en ninguna guía.", completado: true },
      { id: "d1-2", hora: "11:30 am", titulo: "Taller de artesanos con Renata", detalle: "Historia detrás de cada pieza.", completado: false },
    ],
  },
  {
    dia: 2,
    etiqueta: "Día 2",
    tareas: [
      { id: "d2-1", hora: "5:00 pm", titulo: "Bioluminiscencia en Manialtepec", detalle: "Con Diego, conoce la laguna al detalle.", completado: false },
    ],
  },
];

// Mapa + itinerario — pantalla completa sin scroll global (el scroll vive
// dentro del roadmap). Header fijo arriba, CTA fijo abajo.
export default function ItineraryPage() {
  const [dias, setDias] = useState(itinerarioInicial);

  function toggleTarea(diaIdx: number, tareaId: string) {
    setDias((prev) =>
      prev.map((d, i) =>
        i !== diaIdx
          ? d
          : { ...d, tareas: d.tareas.map((t) => (t.id === tareaId ? { ...t, completado: !t.completado } : t)) },
      ),
    );
  }

  return (
    <div className="flex h-screen flex-col bg-bg">
      <header className="flex shrink-0 items-center justify-between border-b border-surface px-6 py-4">
        <Link href="/home" aria-label="Volver al dashboard" className="text-muted hover:text-ink">
          <IconBack />
        </Link>
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-ink">Mapa</p>
        <span className="w-5" aria-hidden="true" />
      </header>

      <section aria-label="Mapa de tu ruta" className="h-[38vh] shrink-0 p-4">
        <RouteMap paradas={paradas} />
      </section>

      <section aria-labelledby="roadmap-heading" className="flex-1 overflow-y-auto px-6 pb-4">
        <h2 id="roadmap-heading" className="sr-only">
          Itinerario por día
        </h2>
        <div className="space-y-6">
          {dias.map((d, i) => (
            <div key={d.dia}>
              <h3 className="font-display text-lg font-semibold text-ink">{d.etiqueta}</h3>
              <ul className="mt-3 space-y-3">
                {d.tareas.map((t) => (
                  <TaskItemCard key={t.id} tarea={t} onToggle={(id) => toggleTarea(i, id)} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-surface p-6">
        <WhatsAppButton />
        <Link href="/feedback" className="btn-primary flex-1 justify-center rounded-xl">
          Itinerario
        </Link>
      </div>
    </div>
  );
}

function IconBack() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
