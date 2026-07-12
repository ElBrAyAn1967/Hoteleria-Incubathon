import type { MapStop } from "@/types/tourist-flow";

// Mapa simulado (sin proveedor externo): conector vectorial + pines + tooltips
// flotantes, posicionados por porcentaje sobre un lienzo con textura de fondo.
// Encoge las coordenadas hacia el centro para que pines y tooltips queden
// dentro del círculo visible (el contenedor ahora es circular, no un
// rectángulo), dejando margen para el ancho de los tooltips flotantes.
const CIRCLE_SCALE = 0.68;
const toCircle = (v: number) => 50 + (v - 50) * CIRCLE_SCALE;

export function RouteMap({ paradas }: { paradas: MapStop[] }) {
  const path = paradas.map((p) => `${toCircle(p.x)},${toCircle(p.y)}`).join(" L ");

  return (
    <div
      role="img"
      aria-label={`Mapa con ruta por ${paradas.map((p) => p.nombre).join(", ")}`}
      className="relative mx-auto aspect-square h-full overflow-hidden rounded-full bg-surface"
    >
      <svg className="route-map-canvas absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <clipPath id="route-map-clip"><circle cx="50" cy="50" r="42" /></clipPath>
        </defs>
        <g clipPath="url(#route-map-clip)">
          <circle cx="50" cy="50" r="42" fill="#E1E8EC" />
          <g className="route-map-grid" stroke="#1A2A44" fill="none">
            <circle cx="50" cy="50" r="12" strokeWidth="0.4" opacity="0.2" />
            <circle cx="50" cy="50" r="24" strokeWidth="0.4" opacity="0.2" />
            <circle cx="50" cy="50" r="36" strokeWidth="0.4" opacity="0.2" />
            <g opacity="0.12" strokeWidth="0.3">
              <path d="M50,8 L50,92 M8,50 L92,50 M17,17 L83,83 M83,17 L17,83" />
            </g>
          </g>
          <path className="route-map-route" d={`M ${path}`} fill="none" stroke="#F47C3C" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="1.2 1.2" />
        </g>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1A2A44" strokeWidth="0.6" opacity="0.25" />
      </svg>

      {paradas.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${toCircle(p.x)}%`, top: `${toCircle(p.y)}%` }}
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
