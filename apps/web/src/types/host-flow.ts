// Tipos del flujo del anfitrión/proveedor de servicio (Agenda → Sube tu Experiencia).
// Frontend-only por ahora (mock data) — ver apps/web/src/types/tourist-flow.ts
// para el equivalente del lado turista.

export interface ReservationSummaryData {
  personas: number;
  fecha?: string;
  notas: string[]; // líneas de detalle simuladas (skeleton mientras no hay datos reales)
}

export interface CalendarSelection {
  selectedDate: Date | null;
  visibleMonth: Date; // primer día del mes que se está mostrando
}

export interface MediaTextBlockData {
  id: string;
  titulo: string;
  descripcion: string;
}

export interface ExperienceMedia {
  id: string;
  titulo: string;
  duracion: string;
}
