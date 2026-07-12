"use client";

const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

interface CalendarGridProps {
  visibleMonth: Date;
  selectedDate: Date | null;
  onMonthChange: (next: Date) => void;
  onSelectDate: (day: Date) => void;
}

function esMismoDia(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function generarDias(mes: Date): (Date | null)[] {
  const anio = mes.getFullYear();
  const mesIdx = mes.getMonth();
  const primerDia = new Date(anio, mesIdx, 1);
  // Lunes = 0 ... Domingo = 6 (para alinear con DIAS_SEMANA)
  const offset = (primerDia.getDay() + 6) % 7;
  const totalDias = new Date(anio, mesIdx + 1, 0).getDate();

  const celdas: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= totalDias; d++) celdas.push(new Date(anio, mesIdx, d));
  return celdas;
}

// Calendario interactivo neutro: sin fondo por defecto, hover gris claro,
// seleccionado en negro sólido, días pasados deshabilitados.
export function CalendarGrid({ visibleMonth, selectedDate, onMonthChange, onSelectDate }: CalendarGridProps) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const celdas = generarDias(visibleMonth);
  const etiquetaMes = `${MESES[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`;

  function mesAnterior() {
    onMonthChange(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1));
  }
  function mesSiguiente() {
    onMonthChange(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1));
  }

  return (
    <section aria-label="Calendario de disponibilidad" className="rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={mesAnterior}
          aria-label="Mes anterior"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
        >
          <IconChevronLeft />
        </button>
        <p aria-live="polite" className="text-sm font-semibold capitalize text-gray-900">
          {etiquetaMes}
        </p>
        <button
          type="button"
          onClick={mesSiguiente}
          aria-label="Mes siguiente"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
        >
          <IconChevronRight />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-xs text-gray-500">
        {DIAS_SEMANA.map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-2 text-center">
        {celdas.map((dia, i) => {
          if (!dia) return <span key={`vacio-${i}`} />;
          const pasado = dia < hoy;
          const seleccionado = selectedDate ? esMismoDia(dia, selectedDate) : false;
          return (
            <button
              key={dia.toISOString()}
              type="button"
              disabled={pasado}
              aria-pressed={seleccionado}
              aria-label={dia.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}
              onClick={() => onSelectDate(dia)}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                seleccionado
                  ? "bg-gray-900 text-white"
                  : pasado
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function IconChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
