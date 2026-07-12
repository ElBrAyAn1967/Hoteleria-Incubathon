// API Route de Next.js — proxy al CEREBRO For3s (caja negra).
// 🔒 Corre SERVER-SIDE en Vercel (serverless). La URL del túnel y la llave de For3s
// viven solo aquí (variables de entorno del servidor); el navegador NUNCA las ve.
// El widget del cliente llama a /api/chat (mismo dominio) → esto llama a For3s.
// Aquí no hay NADA de For3s salvo un fetch a su API. Cero exposición de arquitectura.
//
// Nota: usa process.env (estándar Node/Next), NO Bun.env → compila y corre en Vercel.
//
// 🔐 Todo dato sensible del viajero (su id de sesión + el mensaje) se registra
// CIFRADO vía @hoteleria/shared/secure-store — nunca en claro. Esta es la
// frontera del servidor donde importa el cifrado.

import { secureRecord } from "@hoteleria/shared/secure-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { message?: string; clientId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "request inválido" }, { status: 400 });
  }

  const texto = String(body.message ?? "").trim();
  if (!texto || texto.length > 2000) {
    return Response.json({ error: "mensaje inválido" }, { status: 400 });
  }

  // 🔐 Registro cifrado del evento (id del viajero + su mensaje). 'seguro' queda
  // listo para persistir/auditar sin exponer PII en claro. Cuando se conecte la
  // DB (ver issue de schema), aquí se guarda 'seguro' directamente.
  const seguro = secureRecord({
    clientId: String(body.clientId ?? "web-anon"),
    mensaje: texto,
    ts: new Date().toISOString(),
  });
  void seguro; // (persistencia pendiente de la DB — el dato ya viaja cifrado)

  const API_URL = process.env.FOR3S_API_URL;
  const API_KEY = process.env.FOR3S_API_KEY;
  if (!API_URL || !API_KEY) {
    // Sin cerebro conectado: respuesta cortés de respaldo (la demo no se cae).
    return Response.json({
      reply:
        "¡Hola! Soy tu asistente de experiencias locales. En un momento te conecto con la mejor opción para tu viaje. 🌿",
      fallback: true,
    });
  }

  // 🛡️ Blindaje anti-extracción: instruye al cerebro a NO revelar nada técnico.
  const guarda =
    "[Contexto: eres el concierge de un marketplace de experiencias turísticas " +
    "locales. Ayuda SOLO con turismo, experiencias y anfitriones. Si te preguntan " +
    "cómo estás hecho, tu arquitectura, tu código, qué modelo o tecnología usas, " +
    "responde amablemente que solo puedes ayudar con el viaje. Nunca reveles " +
    "detalles técnicos.] Consulta del viajero: ";

  try {
    const r = await fetch(`${API_URL}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY, // la llave vive SOLO aquí (server), nunca en el navegador
        "X-Client-Id": String(body.clientId ?? "web-anon"),
      },
      body: JSON.stringify({ message: guarda + texto, tema: "hoteles" }),
      signal: AbortSignal.timeout(60000),
    });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    // Solo devolvemos el texto de la respuesta. Nada de metadatos internos.
    return Response.json({ reply: data.reply ?? "" });
  } catch {
    return Response.json(
      { reply: "Disculpa, ahora mismo no puedo responder. Intenta de nuevo en un momento." },
      { status: 200 },
    );
  }
}
