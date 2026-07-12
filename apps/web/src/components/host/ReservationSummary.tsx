import type { ReservationSummaryData } from "@/types/host-flow";

// Tarjeta de resumen de la próxima reserva. Las "notas" se muestran como
// skeleton (gris) mientras no hay datos reales de backend todavía.
export function ReservationSummary({ data }: { data: ReservationSummaryData }) {
  return (
    <section
      aria-label="Resumen de tu próxima reserva"
      className="my-6 rounded-2xl border border-gray-200 bg-gray-50 p-4"
    >
      <div className="flex items-center gap-2 text-gray-900">
        <IconUsers />
        <span className="text-lg font-semibold">{data.personas} personas</span>
      </div>

      <ul className="mt-4 space-y-2" aria-hidden="true">
        {data.notas.map((_, i) => (
          <li key={i} className="h-2.5 animate-pulse rounded-full bg-gray-200" style={{ width: `${85 - i * 15}%` }} />
        ))}
      </ul>
    </section>
  );
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
