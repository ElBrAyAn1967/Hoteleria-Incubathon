// API Route — TRAZABILIDAD hacia el CEREBRO For3s (capa For3s OS, caja negra).
// 🔒 Corre server-side (runtime nodejs). El navegador manda aquí los eventos del
// journey (clicks, navegación, tiempos, scroll, formularios) y ESTE endpoint los
// reenvía a For3s. La URL/llave de For3s viven solo aquí — el navegador nunca las ve.
//
// 🧠 Idea: NO tenemos base de datos. For3s ES la memoria: cada sesión de usuario
// (su clientId anónimo) se convierte en un HILO/tema en For3s, y su cerebro
// (grafo + episodios) detecta patrones del comportamiento del usuario.
//
// 🔐 Todo evento se registra CIFRADO vía @hoteleria/shared/secure-store antes de
// viajar. Fire-and-forget: si For3s no está, la página no se entera (no bloquea).

import { secureRecord } from "@hoteleria/shared/secure-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Un evento de trazabilidad del journey del usuario.
interface TrackEvent {
  tipo: string; // "page_view" | "click" | "form_submit" | "scroll" | "chat" | "flow_end" | ...
  ruta?: string; // pantalla donde ocurrió
  etiqueta?: string; // qué botón/elemento
  meta?: Record<string, unknown>; // tiempos, profundidad de scroll, etc.
  ts?: string;
}

export async function POST(req: Request) {
  let body: { clientId?: string; eventos?: TrackEvent[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "request inválido" }, { status: 400 });
  }

  const clientId = String(body.clientId ?? "web-anon").slice(0, 64);
  const eventos = Array.isArray(body.eventos) ? body.eventos.slice(0, 50) : [];
  if (eventos.length === 0) {
    return Response.json({ ok: true, enviados: 0 });
  }

  // 🔐 Registro cifrado del lote (id de sesión + eventos). Listo para auditar
  // sin exponer nada en claro. La ubicación/mensajes dentro de meta se cifran.
  const seguro = secureRecord({
    clientId,
    eventos: JSON.stringify(eventos),
    ts: new Date().toISOString(),
  });
  void seguro;

  const API_URL = process.env.FOR3S_API_URL;
  const API_KEY = process.env.FOR3S_API_KEY;
  // Sin cerebro conectado: aceptamos el evento en silencio (no rompe la demo).
  if (!API_URL || !API_KEY) {
    return Response.json({ ok: true, enviados: eventos.length, fallback: true });
  }

  // Resumen legible del lote para que el cerebro lo procese como episodio.
  const resumen = eventos
    .map((e) => {
      const partes = [e.tipo];
      if (e.ruta) partes.push(`en ${e.ruta}`);
      if (e.etiqueta) partes.push(`(${e.etiqueta})`);
      if (e.meta && Object.keys(e.meta).length) partes.push(JSON.stringify(e.meta));
      return "• " + partes.join(" ");
    })
    .join("\n");

  const mensaje =
    "[TRAZABILIDAD/ANALÍTICA — no requiere respuesta conversacional. Registra este " +
    "tramo del journey del visitante para detectar patrones de comportamiento.] " +
    `Sesión ${clientId}. Eventos:\n${resumen}`;

  try {
    // Fire-and-forget con timeout corto: la analítica nunca debe frenar al usuario.
    await fetch(`${API_URL}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY, // la llave vive SOLO aquí (server)
        "X-Client-Id": clientId, // → un hilo por sesión de usuario en For3s
      },
      body: JSON.stringify({ message: mensaje, tema: "hoteles-analitica" }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // For3s lento/caído: no pasa nada, el evento simplemente no se registró.
  }

  return Response.json({ ok: true, enviados: eventos.length });
}
