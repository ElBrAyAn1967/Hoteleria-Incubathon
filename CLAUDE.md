# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This started as a **planning/spec repo** and is now a scaffolded **bun monorepo** (`apps/web` Next.js + `apps/api` Hono + `packages/shared` + `packages/web3`) — see the "Arquitectura y flujo de trabajo" section below and `ESTRUCTURA.md` for the current layout. The original specs still define product scope and constraints.

Product: a B2B marketplace connecting hotels/hostels (≤50 keys) to local experience hosts ("anfitriones locales") in Mexico, with WhatsApp-based booking intake and instant on-chain commission settlement to the host/operator. Working name in docs: "Marketplace de Experiencias" / brief reference "Navigo X"; a broader long-term vision is called "Early Bird Hospitality OS" (explicitly out of scope for the MVP — narrative only, not to be built).

## Document map

- `README.md` — synthesis of the problem, team, competitive landscape, the core differentiator (instant commission settlement, not just "WhatsApp + AI"), and the local run guide.
- `ESTRUCTURA.md` — monorepo folder guide (what lives where, how to run it).
- `docs/specs/CHECKLIST_MANANA.md` — pre-build decisions the team must close (validation anchor, jury criteria, "real-time" language, single use case) and discovery questions to ask real business contacts.
- `docs/specs/ICP_CONTEXTO.md` — target customer profile: hotel/hostel staff drowning in manual WhatsApp coordination with tour operators. ICP is the business (B2B), not the tourist.
- `docs/specs/MVP_SCOPE.md` — the frozen 36-hour hackathon scope: what's in (WhatsApp intake → pre-loaded catalog → booking confirmation → instant commission payout with on-chain proof) and explicitly what's out (bidirectional PMS sync, real-time multi-operator availability, admin dashboards, KYC/AML). Contains the hour-by-hour hackathon checkpoint schedule.
- `docs/specs/SPEC_CASO_USO_NEGOCIO.md` — supply-side spec: onboarding local hosts (assisted, not self-service — hosts may have no smartphone), host profile as the actual product, the hotel-referral commission link, and the host/business journey (experience listing, fiscal data, cash/e-payment, payment status, cash custody at affiliated hotels).
- `docs/specs/SPEC_CASO_USO_TURISMO.md` — demand-side spec: the tourist/guest use case, discovery via hotel staff recommendation, why the host's personality/specialty *is* the product, and the tourist journey (intake form, curated map, personalized card-based roadmap, private post-experience rating).
- `docs/specs/JOURNEY_USUARIOS.md` — raw source notes for the journeys integrated into both specs above.
- `docs/dev/` — stack rules (monorepo workspace conventions, Next.js App Router patterns) — read before touching `apps/web` or `apps/api`.
- `docs/dev/DUPLICACION.md` — **read before duplicating this repo** into a second branded hackathon project. Says exactly what to ask the user (name/palette/tone) vs. what stays shared (backend, packages, specs).
- `docs/WEB3_IDEA.md` — notes on the web3/commission-settlement piece.
- `docs/SLIDES/` — pitch deck images.
- `apps/web/PRODUCT.md` — brand/mood/design brief for the landing page.
- `apps/web/src/content/brand.ts` — the single source of truth for the frontend's copy/identity (nav, hero, hosts, CTA, footer, chat strings). Components import from here instead of hardcoding text.

## Key product constraints to respect when building

- **Single use case only** — do not build parallel flows for "the hotel" and "the tour operator" as two separate products; pick one primary demo user.
- **B2B ICP, not B2C** — the paying/validated pain is the hotel/hostel staff's wasted time, not the tourist's discovery experience.
- **Assisted host onboarding, not self-service** — hosts may be non-technical or lack a smartphone; onboarding is done *for* them by the team/hotel via a simple template (photo, bio, specialty, availability), not a public signup form.
- **Static/pre-loaded availability is acceptable for the MVP** — do not build real bidirectional calendar sync with operators; none of the real-world operators have APIs to sync with.
- **Instant commission settlement is the actual differentiator** — not the WhatsApp/AI layer, which is commodity. Any payments work should produce visible proof (transaction hash or equivalent) that money moved in minutes, not days/weeks.
- **Don't over-promise "real-time"** — the agreed pitch language is "response in seconds via automated WhatsApp," not "real-time availability."
- **Host is not interchangeable** — profile/UX should surface the individual host's personality and specialty, not reduce them to a generic service-provider row.

---

## Arquitectura y flujo de trabajo (Brian) — añadido 2026-07-11

### El código ahora es un monorepo (bun)
Ver `ESTRUCTURA.md`. Resumen: `apps/web` (Next.js 15, landing) · `apps/api` (Hono sobre Bun) ·
`packages/shared` (tipos) + `packages/web3` (pago). `bun install` en la raíz; `bun run dev`
levanta web+api juntos. Specs de este repo viven en `docs/specs/`.

### 🔒 REGLAS DURAS DE LA CAJA NEGRA (For3s — protegen el IP, no romper)
For3s OS es **el cerebro del marketplace**, pero **NO se entrega ni se integra a este repo**.
Se CONSUME por API como caja negra (modelo OpenAI: URL + llave + respuestas, nada más).
1. NUNCA subir a este repo código, lógica, prompts, schema ni arquitectura de For3s. Aquí solo
   vive el cliente HTTP que lo consume (`apps/api/src/index.ts` — el proxy `/chat`). No existe
   ni debe existir un `apps/web/src/lib/for3s.ts`; el frontend solo habla con nuestro propio
   backend vía `NEXT_PUBLIC_API_URL`.
2. La URL del túnel y la API key de For3s son SECRETAS: solo en `.env` (server-side), JAMÁS con
   prefijo `NEXT_PUBLIC_` (eso las mandaría al navegador). El navegador nunca ve dónde vive For3s.
3. Las llamadas a For3s se hacen solo desde el servidor (route handler / RSC / apps/api).

### 🔐 REGLA DURA DE ENCRIPTACIÓN (todo dato sensible pasa por el módulo central)
**Existe UN módulo de encriptación central. Todo proceso que maneje datos sensibles lo usa —
hoy y en el futuro, sin cablearlo componente por componente.** Si estás construyendo o
modificando cualquier flujo que toque PII (nombre, email, teléfono, WhatsApp, ubicación,
mensajes del viajero, datos de pago), **estás obligado a pasar por este módulo. No implementes
cripto a mano, no guardes PII en claro.**

**Módulo:** `packages/shared/crypto.ts` (AES-256-GCM, `node:crypto`, cero dependencias) y su
capa de conveniencia `packages/shared/secure-store.ts`.

Cómo usarlo (regla mecánica, aplícala siempre):
```ts
// Al PERSISTIR / registrar / transmitir datos sensibles (siempre server-side):
import { secureRecord } from "@hoteleria/shared/secure-store";
const seguro = secureRecord(datos, ["campoSensibleExtra"]); // cifra PII + añade _id anónimo

// Al LEERLOS de vuelta en el servidor:
import { readRecord } from "@hoteleria/shared/secure-store";
const claro = readRecord(registroGuardado);

// Para cifrar/descifrar un valor suelto:
import { encrypt, decrypt } from "@hoteleria/shared/crypto";
```

Reglas mecánicas:
1. **El cifrado ocurre en la frontera del servidor** (API Routes con `runtime = "nodejs"`, o
   `apps/api`). El módulo usa `node:crypto` → NO corre en el navegador. Nunca cifres en el cliente.
2. **Todo endpoint nuevo que reciba/guarde PII llama a `secureRecord(...)` antes de persistir.**
   Ya está cableado en `/api/chat` y `/api/quote` — cópialos como patrón. Datos sensibles del
   viajero jamás a `localStorage`/`sessionStorage` en claro; mándalos al servidor y cifra ahí.
3. **La llave vive en `ENCRYPTION_KEY`** (64 hex = 32 bytes), en `.env` local + variables de
   Vercel/servidor. JAMÁS en git, JAMÁS con prefijo `NEXT_PUBLIC_`. Genera una con
   `openssl rand -hex 32` (o `generateKey()` del módulo). Fail-closed: en producción sin llave, el
   sistema LANZA (no guarda nada en claro).
4. `SENSITIVE_FIELDS` (en `secure-store.ts`) es la lista de campos que se cifran automáticamente
   si aparecen en el objeto. Si agregas un nuevo campo de PII, añádelo ahí — así se protege en
   TODO el sistema sin tocar cada llamador.
5. El formato cifrado es `enc:v1:...` (versionado) — permite rotar algoritmo/llave a futuro sin
   romper datos viejos. `isEncrypted()` detecta si un valor ya está cifrado (idempotente).

### 🧠 TRAZABILIDAD + PERSISTENCIA (el cerebro es la memoria — NO hay base de datos propia)
**El sistema NO tiene ni debe tener base de datos (Postgres/Prisma/etc.). La memoria y
persistencia son el CEREBRO For3s (grafo + episodios), consumido por API — es más potente que
una DB normal.** TODO se manda a For3s: navegación, tiempos, scroll, clicks, **reservaciones**,
formularios/cotizaciones, **lo que el usuario escribe**, chat, fin de flujo. Cada evento se
cifra y se reenvía al cerebro desde un endpoint server-side (caja negra). Cada sesión de
visitante (su `clientId` anónimo) = un hilo, para que el cerebro detecte patrones/episodios.
**No agregues `DATABASE_URL`, Prisma, Drizzle, migraciones ni schema — si un flujo necesita
guardar algo, se manda a For3s.**

Mecánica (aplícala siempre, sin cablear pantalla por pantalla):
1. **Captura automática:** `TrackingProvider` (montado una vez en `layout.tsx`) ya traza
   page_view, tiempo por pantalla, scroll y clicks. **NO lo dupliques.**
2. **Trazar un click nuevo:** añade `data-track="etiqueta"` al elemento. Nada más — el provider
   lo capta solo.
3. **Trazar un hito de negocio** (conversión, fin de flujo): `import { track } from "@/lib/track"`
   y `track("form_submit", { ruta, etiqueta, meta })`. Ver `/request` y `/feedback` como patrón.
4. **NUNCA mandes PII en claro por el track.** El contenido sensible (mensajes, contacto,
   comentarios) NO va en `meta`; solo señales de patrón (calificación, presupuesto, flags). El
   endpoint `/api/track` ya cifra el lote con `secureRecord` antes de reenviarlo.
5. **Caja negra:** el navegador solo habla con `/api/track` (mismo dominio). La URL/llave del
   cerebro viven server-side en `/api/track` — el cliente jamás las ve. `lib/track.ts` y
   `TrackingProvider.tsx` no contienen ninguna referencia técnica al cerebro.

### Flujo de trabajo (cracked-dev)
- Nadie pushea a `main` directo. Rama por ticket → PR → revisión humana.
- **`git pull` / `git fetch` antes de ramificar** (ya hubo conflictos por no hacerlo).
- Lo que sube cada quien va a su carril: specs/docs → `docs/`, front → `apps/web`, etc.

### 🧬 Segundo proyecto del hackathon (duplicación) — añadido 2026-07-11
Este repo se va a duplicar en un **repo aislado** para presentar un segundo proyecto en el
hackathon: mismo producto/backend/diferenciador, solo cambia la identidad visual del
frontend y se agregan componentes nuevos. **Antes de ejecutar esa duplicación, lee
`docs/dev/DUPLICACION.md`** — ahí está el paso a paso, incluyendo la instrucción de
**preguntar al usuario** por nombre/paleta/tono del segundo proyecto en vez de inventarlos.
Toda la identidad visual/copy de `apps/web` ya está aislada en `apps/web/src/content/brand.ts`
+ los tokens de color en `apps/web/tailwind.config.ts` — son las únicas piezas que cambian.
