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

// Agendamiento del anfitrión — paleta neutra (gray-50…gray-900) a propósito,
// distinta del app del turista: consola de trabajo tipo editorial, sin color
// de marca. Ver master prompt del flujo de proveedor de servicio.
export default function BookingPage() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col bg-white px-6 py-8">
      <BookingHeader nombre="Diego" />
      <ReservationSummary data={resumen} />
      <CalendarGrid
        visibleMonth={visibleMonth}
        selectedDate={selectedDate}
        onMonthChange={setVisibleMonth}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && (
        <p className="mt-4 text-sm text-gray-500" aria-live="polite">
          Fecha seleccionada:{" "}
          <span className="font-semibold text-gray-900">
            {selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </p>
      )}

      <button
        type="button"
        disabled={!selectedDate}
        className="mt-8 w-full rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirmar disponibilidad
      </button>
    </main>
  );
}
