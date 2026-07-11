// Backend del marketplace — Hono sobre BUN.
// Rol clave: es el ÚNICO que habla con el CEREBRO For3s (caja negra). El navegador
// llama a ESTE backend; el backend llama a For3s. Así la URL del túnel y la llave
// de For3s NUNCA llegan al navegador (nadie las ve en DevTools).
//
// 🔒 REGLA DURA: aquí no vive nada de For3s salvo un fetch a su API. Cero código,
// lógica, arquitectura o modelo de For3s. Solo se puede chatear.
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const PORT = Number(Bun.env.PORT ?? 3001);

app.use("/*", cors({ origin: Bun.env.WEB_ORIGIN ?? "*" }));

app.get("/health", (c) => c.json({ ok: true, service: "hoteleria-api", runtime: "bun" }));

// ── Chat de atención al cliente (dirigido por For3s general, como caja negra) ──
// El widget del frontend llama aquí. Este handler es el guardián: valida, pone el
// blindaje anti-extracción, y hace de proxy a For3s. El cliente solo ve la respuesta.
app.post("/chat", async (c) => {
  const { message, clientId } = await c.req.json().catch(() => ({}));
  const texto = String(message ?? "").trim();
  if (!texto || texto.length > 2000) {
    return c.json({ error: "mensaje inválido" }, 400);
  }

  const API_URL = Bun.env.FOR3S_API_URL;
  const API_KEY = Bun.env.FOR3S_API_KEY;
  if (!API_URL || !API_KEY) {
    // Sin cerebro conectado: respuesta cortés de respaldo (la demo no se cae).
    return c.json({
      reply:
        "¡Hola! Soy tu asistente de experiencias locales. En un momento te conecto con la mejor opción para tu viaje. 🌿",
      fallback: true,
    });
  }

  // 🛡️ Blindaje anti-extracción: se antepone al mensaje del usuario. Instruye al
  // cerebro a NO revelar nada de su naturaleza técnica. (El grueso del blindaje
  // vive del lado de For3s; esto es la capa del proxy.)
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
        "X-Client-Id": String(clientId ?? "web-anon"),
      },
      body: JSON.stringify({ message: guarda + texto, tema: "hoteles" }),
      signal: AbortSignal.timeout(60000),
    });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    // Solo devolvemos el texto de la respuesta. Nada de metadatos internos.
    return c.json({ reply: data.reply ?? "" });
  } catch {
    return c.json(
      { reply: "Disculpa, ahora mismo no puedo responder. Intenta de nuevo en un momento." },
      200,
    );
  }
});

export default { port: PORT, fetch: app.fetch };
console.log(`hoteleria-api (bun) en http://localhost:${PORT}`);
