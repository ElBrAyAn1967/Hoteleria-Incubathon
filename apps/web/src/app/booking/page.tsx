"use client";

import { useState } from "react";
import { BookingHeader } from "@/components/host/BookingHeader";
import { ReservationSummary } from "@/components/host/ReservationSummary";
import { CalendarGrid } from "@/components/host/CalendarGrid";
import type { ReservationSummaryData } from "@/types/host-flow";

const resumen: ReservationSummaryData = {
  personas: 3,
  notas: ["placeholder", "placeholder", "placeholder"],
};

// Agendamiento del anfitrión — usa los MISMOS tokens de marca que la landing
// (bg/surface/ink/muted/primary) para que todo el producto se sienta uno solo.
// Consola de trabajo tipo editorial: sobria, pero coherente con el resto.
export default function BookingPage() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col bg-bg px-6 py-8">
      <BookingHeader nombre="Diego" />
      <ReservationSummary data={resumen} />
      <CalendarGrid
        visibleMonth={visibleMonth}
        selectedDate={selectedDate}
        onMonthChange={setVisibleMonth}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && (
        <p className="mt-4 text-sm text-muted" aria-live="polite">
          Fecha seleccionada:{" "}
          <span className="font-semibold text-ink">
            {selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </p>
      )}

      <button
        type="button"
        disabled={!selectedDate}
        className="mt-8 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirmar disponibilidad
      </button>
    </main>
  );
}
