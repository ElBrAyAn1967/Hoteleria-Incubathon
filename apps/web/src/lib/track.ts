"use client";

// ─────────────────────────────────────────────────────────────────────────────
// TRAZABILIDAD (cliente)
// ─────────────────────────────────────────────────────────────────────────────
// API mínima para registrar eventos del journey del usuario. Todo se manda a
// NUESTRO endpoint interno /api/track (mismo dominio). El helper hace batching y
// envío no bloqueante: la analítica jamás frena al usuario.
//
//   import { track } from "@/lib/track";
//   track("click", { etiqueta: "cta_empieza_viaje", ruta: "/" });
//
// Los eventos se acumulan y se envían: (a) cada 4s, (b) al llegar a 10 eventos,
// (c) al cambiar de pestaña / cerrar (sendBeacon garantiza el envío final).
// ─────────────────────────────────────────────────────────────────────────────

const ENDPOINT = "/api/track";
const CLIENT_KEY = "anf_cid"; // MISMO id anónimo que usa el chat (un solo hilo/sesión)
const FLUSH_MS = 4000;
const MAX_BATCH = 10;

export interface TrackEvent {
  tipo: string;
  ruta?: string;
  etiqueta?: string;
  meta?: Record<string, unknown>;
  ts?: string;
}

let cola: TrackEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

/** id anónimo estable por navegador (comparte hilo con el chat). */
function clientId(): string {
  if (typeof window === "undefined") return "web";
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = "web-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

/** Envía la cola acumulada. `beacon=true` usa sendBeacon (sobrevive a cerrar la pestaña). */
export function flush(beacon = false): void {
  if (typeof window === "undefined" || cola.length === 0) return;
  const payload = JSON.stringify({ clientId: clientId(), eventos: cola });
  cola = [];
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  try {
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      // keepalive: permite que la petición termine aunque la página navegue.
      void fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* la analítica nunca rompe la página */
  }
}

/** Registra un evento del journey. No bloquea; se agrupa y se envía en lote. */
export function track(tipo: string, datos: Omit<TrackEvent, "tipo"> = {}): void {
  if (typeof window === "undefined") return;
  cola.push({ tipo, ts: new Date().toISOString(), ...datos });
  if (cola.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (!timer) timer = setTimeout(() => flush(), FLUSH_MS);
}
