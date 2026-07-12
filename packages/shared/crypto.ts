// ─────────────────────────────────────────────────────────────────────────────
// MÓDULO DE ENCRIPTACIÓN CENTRAL — @hoteleria/shared/crypto
// ─────────────────────────────────────────────────────────────────────────────
// Punto ÚNICO de cifrado de todo dato sensible del sistema (PII de viajeros y
// anfitriones, mensajes, futuros datos de pago). NADIE debe implementar cripto a
// mano en ningún componente: siempre se importa desde aquí.
//
//   import { encrypt, decrypt, encryptFields, decryptFields } from "@hoteleria/shared/crypto";
//
// Diseño:
//   • AES-256-GCM — cifrado autenticado (confidencialidad + detección de
//     manipulación). Estándar de la industria.
//   • node:crypto nativo — CERO dependencias nuevas. Corre server-side (API
//     Routes de Next con runtime "nodejs", backend Hono/Bun).
//   • Llave desde la variable de entorno ENCRYPTION_KEY (64 hex = 32 bytes).
//     Nunca en el código, nunca en git, nunca en el navegador.
//   • Fail-closed: sin llave válida en producción, LANZA — jamás guarda en claro
//     por accidente.
//
// Formato del texto cifrado (string portable, seguro para guardar/transportar):
//   "enc:v1:<iv_base64>:<authTag_base64>:<ciphertext_base64>"
// El prefijo "enc:v1" versiona el esquema (permite rotar algoritmo/llave sin
// romper datos viejos) y hace evidente qué campos ya están cifrados.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomUUID,
} from "node:crypto";

const ALGO = "aes-256-gcm";
const IV_BYTES = 12; // 96 bits — recomendado para GCM
const KEY_BYTES = 32; // 256 bits
const PREFIX = "enc:v1";

/**
 * Obtiene la llave de 32 bytes desde ENCRYPTION_KEY (64 caracteres hex).
 * Fail-closed:
 *   • En producción, si falta o es inválida → lanza (no se guarda nada en claro).
 *   • Fuera de producción, si falta → usa una llave efímera de desarrollo y avisa
 *     una sola vez (permite `bun run dev` sin configurar nada, pero los datos NO
 *     persisten entre reinicios porque la llave cambia).
 */
let _devKeyWarned = false;
let _devKey: Buffer | null = null;

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY?.trim();

  if (raw) {
    if (!/^[0-9a-fA-F]{64}$/.test(raw)) {
      throw new Error(
        "ENCRYPTION_KEY inválida: se esperan 64 caracteres hexadecimales " +
          "(32 bytes). Genera una con: openssl rand -hex 32",
      );
    }
    return Buffer.from(raw, "hex");
  }

  // Sin llave configurada.
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ENCRYPTION_KEY no está configurada. En producción es obligatoria — " +
        "el sistema NO guarda datos sensibles sin cifrar. Configúrala en las " +
        "variables de entorno (Vercel / servidor). Genera una con: openssl rand -hex 32",
    );
  }

  if (!_devKeyWarned) {
    // eslint-disable-next-line no-console
    console.warn(
      "[crypto] ⚠️  ENCRYPTION_KEY no configurada — usando llave EFÍMERA de " +
        "desarrollo. Los datos cifrados NO sobrevivirán a un reinicio. " +
        "Configura ENCRYPTION_KEY en .env para persistencia real.",
    );
    _devKeyWarned = true;
  }
  if (!_devKey) _devKey = randomBytes(KEY_BYTES);
  return _devKey;
}

/** ¿Este string ya está cifrado por este módulo? (idempotencia / detección) */
export function isEncrypted(value: unknown): value is string {
  return typeof value === "string" && value.startsWith(PREFIX + ":");
}

/**
 * Cifra un texto plano. Devuelve el string portable "enc:v1:iv:tag:ct".
 * Idempotente: si el valor ya está cifrado, lo devuelve tal cual (evita doble
 * cifrado si un dato pasa dos veces por el pipeline).
 */
export function encrypt(plaintext: string): string {
  if (isEncrypted(plaintext)) return plaintext;

  const key = getKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGO, key, iv);
  const ct = Buffer.concat([
    cipher.update(String(plaintext), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [
    PREFIX,
    iv.toString("base64"),
    tag.toString("base64"),
    ct.toString("base64"),
  ].join(":");
}

/**
 * Descifra un string producido por encrypt(). Si el valor NO está cifrado, lo
 * devuelve tal cual (tolerante con datos legados en claro durante una migración).
 * Lanza si el formato es correcto pero la autenticación falla (dato manipulado).
 */
export function decrypt(payload: string): string {
  if (!isEncrypted(payload)) return payload;

  const parts = payload.split(":");
  // "enc" "v1" iv tag ct  → 5 partes
  if (parts.length !== 5) {
    throw new Error("Texto cifrado con formato inválido.");
  }
  const [, , ivB64, tagB64, ctB64] = parts;
  const key = getKey();
  const decipher = createDecipheriv(ALGO, key, Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const pt = Buffer.concat([
    decipher.update(Buffer.from(ctB64, "base64")),
    decipher.final(), // lanza si el authTag no valida (dato alterado)
  ]);
  return pt.toString("utf8");
}

/**
 * Cifra un subconjunto de campos de un objeto (los "sensibles"), dejando el
 * resto intacto. Devuelve un objeto NUEVO (no muta el original).
 *
 *   const seguro = encryptFields(reserva, ["nombre", "email", "telefono"]);
 *
 * Los campos que no sean string se serializan con JSON antes de cifrar y se
 * recuperan igual con decryptFields — así soporta números, fechas, objetos.
 */
export function encryptFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
): T {
  const out: Record<string, unknown> = { ...obj };
  for (const f of fields) {
    const v = obj[f];
    if (v === undefined || v === null) continue;
    const asText = typeof v === "string" ? v : JSON.stringify(v);
    out[f as string] = encrypt(asText);
  }
  return out as T;
}

/**
 * Inversa de encryptFields. Descifra los campos indicados. Intenta recuperar el
 * tipo original (JSON.parse); si no era JSON, devuelve el string.
 */
export function decryptFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
): T {
  const out: Record<string, unknown> = { ...obj };
  for (const f of fields) {
    const v = obj[f];
    if (typeof v !== "string" || !isEncrypted(v)) continue;
    const text = decrypt(v);
    try {
      out[f as string] = JSON.parse(text);
    } catch {
      out[f as string] = text;
    }
  }
  return out as T;
}

/** Genera una llave nueva (64 hex). Úsala para poblar ENCRYPTION_KEY. */
export function generateKey(): string {
  return randomBytes(KEY_BYTES).toString("hex");
}

/** Id anónimo/seudónimo estable, útil para no guardar identificadores crudos. */
export function anonId(): string {
  return randomUUID();
}
