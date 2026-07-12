import type { MapStop } from "@/types/tourist-flow";

// Mapa simulado (sin proveedor externo): conector vectorial + pines + tooltips
// flotantes, posicionados por porcentaje sobre un lienzo con textura de fondo.
export function RouteMap({ paradas }: { paradas: MapStop[] }) {
  const path = paradas.map((p) => `${p.x},${p.y}`).join(" L ");

  return (
    <div
      role="img"
      aria-label={`Mapa con ruta por ${paradas.map((p) => p.nombre).join(", ")}`}
      className="relative h-full w-full overflow-hidden rounded-3xl bg-surface"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={`M ${path}`}
          fill="none"
          stroke="#1A2A44"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="0.2 2.4"
          opacity="0.6"
        />
      </svg>

      {paradas.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <InfoTooltip nombre={p.nombre} nota={p.nota} />
          <MapPin />
        </div>
      ))}
    </div>
  );
}

function MapPin() {
  return (
    <svg
      className="mx-auto text-primary"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

function InfoTooltip({ nombre, nota }: { nombre: string; nota: string }) {
  return (
    <div className="mb-1 min-w-[9rem] rounded-xl bg-bg px-3 py-2 text-center shadow-md">
      <p className="text-xs font-semibold text-ink">{nombre}</p>
      <p className="text-[0.65rem] text-muted">{nota}</p>
    </div>
  );
}
