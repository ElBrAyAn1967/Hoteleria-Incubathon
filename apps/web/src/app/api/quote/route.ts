// API Route — recibe una solicitud de cotización del viajero y la registra CIFRADA.
// 🔐 Corre server-side (runtime nodejs). Los datos sensibles (ubicación,
// preferencias, presupuesto) se cifran vía @hoteleria/shared/secure-store antes
// de cualquier persistencia. El navegador jamás guarda PII en claro.

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
  if (servicio.length < 3) {
    return Response.json({ error: "datos insuficientes" }, { status: 400 });
  }

  // 🔐 Cifra los campos sensibles (ubicacion, mensaje/servicio) + añade id anónimo.
  const seguro = secureRecord(
    {
      servicio,
      ubicacion,
      presupuestoMXN: Number(body.presupuestoMXN) || 0,
      usarUbicacionActual: Boolean(body.usarUbicacionActual),
      ts: new Date().toISOString(),
    },
    ["servicio"], // 'servicio' también es sensible (describe la intención del viajero)
  );
  // Persistencia real pendiente de la DB (ver issue de schema). El registro ya
  // está cifrado y listo para guardarse. Devolvemos solo el id anónimo.
  void seguro;

  return Response.json({ ok: true, id: seguro._id });
}
