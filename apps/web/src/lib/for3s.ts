// Cliente del CEREBRO (For3s OS) — se consume por API como CAJA NEGRA.
// El marketplace NO integra For3s ni ve su interior: solo llama este endpoint.
// La API vive detrás de un túnel; las credenciales van por variables de entorno.
//
// Contrato (v1, a formalizar en un issue): mandamos el contexto del turista
// (sus 3 respuestas) + los anfitriones disponibles, y For3s devuelve la
// recomendación razonada (el roadmap). Esto es lo que hace del catálogo un
// concierge y no una lista.

export interface RecomendacionInput {
  clientId: string; // identificador de la sesión/máquina del turista
  mensaje: string; // la consulta o las 3 respuestas del turista, en texto
}

export interface RecomendacionOutput {
  reply: string;
  thread: string;
  client: string;
}

// ⚠️ SEGURIDAD (caja negra): SOLO variables SIN prefijo NEXT_PUBLIC_ → jamás
// llegan al navegador. La URL del túnel y la llave viven únicamente en el
// servidor. Este módulo se usa server-side (route handler / RSC), nunca en el
// cliente. El navegador del turista NUNCA ve dónde vive For3s ni con qué llave.
const API_URL = process.env.FOR3S_API_URL ?? "";
const API_KEY = process.env.FOR3S_API_KEY ?? "";

/**
 * Pregunta al cerebro For3s. Devuelve la recomendación razonada.
 * Server-side only (usa la API key secreta) — llamar desde route handlers / RSC.
 */
export async function pedirRecomendacion(
  input: RecomendacionInput,
): Promise<RecomendacionOutput> {
  if (!API_URL || !API_KEY) {
    throw new Error("FOR3S_API_URL / FOR3S_API_KEY no configurados (.env)");
  }
  const res = await fetch(`${API_URL}/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      "X-Client-Id": input.clientId, // hilo/continuidad por turista (lado For3s)
    },
    body: JSON.stringify({ message: input.mensaje, tema: "hoteles" }),
  });
  if (!res.ok) {
    throw new Error(`For3s API respondió ${res.status}`);
  }
  return (await res.json()) as RecomendacionOutput;
}
