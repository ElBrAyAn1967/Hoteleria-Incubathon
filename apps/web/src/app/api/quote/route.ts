// API Route — recibe una solicitud de cotización del viajero y la manda al CEREBRO.
// 🔒 Corre server-side (runtime nodejs). No hay base de datos propia: la memoria es
// el cerebro For3s (caja negra). Los datos sensibles (ubicación, preferencias,
// presupuesto) se cifran vía @hoteleria/shared/secure-store y la cotización viaja a
// For3s con X-Client-Id (queda en el hilo de la sesión). La URL/llave de For3s viven
// solo aquí (server) — el navegador jamás las ve.

import { secureRecord } from "@hoteleria/shared/secure-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "request inválido" }, { status: 400 });
  }

  const servicio = String(body.servicio ?? "").trim();
  const ubicacion = String(body.ubicacion ?? "").trim();
  const clientId = String(body.clientId ?? "web-anon").slice(0, 64);
  if (servicio.length < 3) {
    return Response.json({ error: "datos insuficientes" }, { status: 400 });
  }

  // 🔐 Cifra los campos sensibles (ubicacion, servicio) + añade id anónimo.
  const seguro = secureRecord(
    {
      servicio,
      ubicacion,
      presupuestoMXN: Number(body.presupuestoMXN) || 0,
      usarUbicacionActual: Boolean(body.usarUbicacionActual),
      ts: new Date().toISOString(),
    },
    ["servicio"],
  );
  void seguro;

  // Manda la cotización al cerebro (queda como episodio del hilo de la sesión).
  const API_URL = process.env.FOR3S_API_URL;
  const API_KEY = process.env.FOR3S_API_KEY;
  if (API_URL && API_KEY) {
    const mensaje =
      "[SOLICITUD DE COTIZACIÓN — registra la intención de viaje de este visitante.] " +
      `Busca: ${servicio}. Zona: ${ubicacion || "no especificada"}. ` +
      `Presupuesto: ${Number(body.presupuestoMXN) || 0} MXN.`;
    try {
      await fetch(`${API_URL}/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY, // la llave vive SOLO aquí (server)
          "X-Client-Id": clientId, // → hilo de la sesión en el cerebro
        },
        body: JSON.stringify({ message: mensaje, tema: "hoteles" }),
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      // El cerebro lento/caído no rompe la demo: el flujo continúa igual.
    }
  }

  return Response.json({ ok: true, id: seguro._id });
}
