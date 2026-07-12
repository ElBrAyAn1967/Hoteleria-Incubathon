// ─────────────────────────────────────────────────────────────────────────────
// SECURE STORE — @hoteleria/shared/secure-store
// ─────────────────────────────────────────────────────────────────────────────
// Capa fina SOBRE el módulo cripto. Es el punto por el que TODO proceso del
// sistema persiste o registra datos sensibles. En vez de que cada endpoint decida
// cómo cifrar, llama a estos helpers y el cifrado ocurre solo.
//
//   import { secureRecord } from "@hoteleria/shared/secure-store";
//   const seguro = secureRecord(datosDelViajero, ["nombre", "email", "telefono", "ubicacion"]);
//   // → 'seguro' tiene esos campos cifrados y listos para guardar/transmitir.
//
// NO hay base de datos propia: la memoria/persistencia es el CEREBRO For3s (grafo
// + episodios), consumido por API. Este módulo cifra el dato antes de mandarlo al
// cerebro (o de auditarlo localmente). 'secureRecord(...)' prepara, 'readRecord(...)'
// recupera. Cero cambios en los llamadores.
// ─────────────────────────────────────────────────────────────────────────────

import { encryptFields, decryptFields, anonId } from "./crypto";

/** Campos que SIEMPRE se consideran sensibles en este dominio (PII / contacto). */
export const SENSITIVE_FIELDS = [
  "nombre",
  "email",
  "correo",
  "telefono",
  "phone",
  "whatsapp",
  "ubicacion",
  "direccion",
  "mensaje",
  "message",
  "comentario",
  "nota",
  "documento",
  "pago",
  "tarjeta",
  "clientId",
] as const;

/**
 * Prepara un registro para persistir: cifra los campos sensibles (los que pases
 * explícitamente + los de SENSITIVE_FIELDS que existan en el objeto) y añade un
 * id anónimo estable. Devuelve un objeto nuevo listo para guardar en cualquier
 * lado (el cerebro For3s, un log, una cola) sin exponer PII en claro.
 */
export function secureRecord<T extends Record<string, unknown>>(
  data: T,
  extraFields: (keyof T)[] = [],
): T & { _id: string } {
  const auto = SENSITIVE_FIELDS.filter((f) => f in data) as (keyof T)[];
  const fields = Array.from(new Set([...auto, ...extraFields]));
  return { ...encryptFields(data, fields), _id: anonId() };
}

/**
 * Inversa de secureRecord: descifra los campos sensibles para volver a usarlos
 * en el servidor (nunca se envían descifrados al navegador salvo que el flujo lo
 * requiera explícitamente).
 */
export function readRecord<T extends Record<string, unknown>>(
  data: T,
  extraFields: (keyof T)[] = [],
): T {
  const auto = SENSITIVE_FIELDS.filter((f) => f in data) as (keyof T)[];
  const fields = Array.from(new Set([...auto, ...extraFields]));
  return decryptFields(data, fields);
}
