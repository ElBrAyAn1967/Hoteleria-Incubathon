// Tipos del flujo de turista (Dashboard → Cotización → Itinerario → Reseña).
// Frontend-only por ahora (mock data) — cuando exista API real de reservas,
// estos contratos migran a packages/shared para compartirse con apps/api.

export interface AnfitrionCard {
  id: string;
  titulo: string;
  categoria: string;
  emoji: string;
}

export interface QuoteRequest {
  servicio: string;
  ubicacion: string;
  usarUbicacionActual: boolean;
  presupuestoMXN: number | null;
}

export interface TaskItem {
  id: string;
  hora: string;
  titulo: string;
  detalle: string;
  completado: boolean;
}

export interface ItineraryDay {
  dia: number;
  etiqueta: string; // ej. "Día 1"
  tareas: TaskItem[];
}

export interface MapStop {
  id: string;
  nombre: string;
  nota: string;
  x: number; // posición porcentual (0-100) dentro del contenedor del mapa
  y: number;
}

export interface FeedbackData {
  reservaId: string;
  calificacion: number; // 1-5
  comentario: string;
}
