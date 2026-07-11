# CLAUDE.md — Hoteleria-Incubathon (memoria institucional del proyecto)

> **Lee esto PRIMERO, siempre.** Flujo de trabajo: **cracked-dev** (ramas por ticket → verificar
> → PR → NO mergear sin humano). Trabajan 2 devs por ISSUES: **Alex** (ElBrAyAn1967, producto/
> hotelería) + **Brian** (For3s, el cerebro/IA + web3). Regla de oro: **nadie pushea a `main`
> directo** — así no nos pisamos (ya pasó una vez: un push sobrescribió un cambio del otro).

---

## 1 · Qué es el proyecto

**Marketplace de ANFITRIONES LOCALES** — experiencias íntimas y curadas donde el turista conecta
con una PERSONA local real (no un catálogo de tours genérico). El hotel/hostal (≤50 llaves) es el
canal que recomienda al anfitrión. Contexto del Incubathon CDMX (deadline domingo). Pivote y
detalle en los specs (ver §3).

**El diferenciador (defendible, no genérico):** curación humana + canal hotelero validado + pago
instantáneo al anfitrión + **For3s OS como el CEREBRO** (concierge que razona: 3 preguntas →
arquetipo del turista → roadmap personalizado). No es "una app con IA" (eso se copia).

## 2 · Reparto de responsabilidades

| Dev | Cuenta | Aporta | Toca |
|---|---|---|---|
| **Alex** | ElBrAyAn1967 | producto, hotelería, marketplace/UI, flujo WhatsApp, alta de anfitriones | el frontend/marketplace + specs |
| **Brian** | (For3s) | **el CEREBRO (For3s vía API, caja negra)** + pago web3 | la integración con la API de For3s + pagos |

⚠️ **For3s OS NO se entrega ni se integra al código de este repo.** Se CONSUME vía API como caja
negra: el marketplace hace `POST /v1/chat` a For3s → recibe recomendaciones. Nadie en este repo
ve el interior de For3s. (Detalle del canal API: en el Mente OS de Brian.)

## 3 · Índice de documentación (specs — leer antes de codear)

| Doc | Qué define |
|---|---|
| `README.md` | equipo, problema, estado del arte, diferenciador |
| `ICP_CONTEXTO.md` | perfil de cliente + evidencia de campo (catálogo Mama Tava) |
| `MVP_SCOPE.md` | qué SÍ / qué NO en 36h + el flujo de la demo |
| `SPEC_CASO_USO_NEGOCIO.md` | lado OFERTA (anfitrión local + hotel/canal) |
| `SPEC_CASO_USO_TURISMO.md` | lado DEMANDA (turista, las 3 preguntas → roadmap) |
| `CHECKLIST_MANANA.md` | decisiones a cerrar + discovery + roles |

## 4 · Reglas de arquitectura (constraints — romperlas rompe algo)

- **El cerebro (For3s) se consume por API, no se integra.** El marketplace le manda el contexto
  del turista (las 3 respuestas + perfiles de anfitriones disponibles) y recibe la recomendación.
- **MVP: 2-3 anfitriones reales pre-cargados**, no un catálogo completo ni self-service de alta.
- **Alta de anfitrión = asistida** (baja alfabetización digital; el equipo la hace).
- **Descubrimiento = vía el hotel** (no búsqueda libre tipo Viator).
- **NO construir:** reviews estructurados, geolocalización/mapas de calor, verificación de
  identidad compleja, calendario en tiempo real, dashboard de reporting. (Ver "fuera de alcance"
  en los specs.)
- **El pago web3:** demo con evidencia visual (hash) — decidir real vs simulado antes de la demo.

## 5 · Comandos (a completar cuando haya stack de código)

- Stack aún NO decidido (por ahora solo docs). Cuando se defina (Next? Node? WhatsApp API?),
  documentar aquí los comandos exactos: build / lint / test / dev. **No adivinar.**

## 6 · ⚠️ Known issues / lecciones (para no repetirlas)

- ⚠️ **2026-07-11: un push a `main` sobrescribió un cambio del otro dev** (el reposicionamiento
  de For3s como cerebro que hizo Brian lo revirtió un push de Alex sin traerlo antes). → LECCIÓN:
  trabajar por ramas + PR, nunca push directo a `main`; `git pull` antes de cualquier push.

## 7 · Last commit log

- `8b58b5d agregando spects` (Alex) — 2 specs nuevos: NEGOCIO (oferta) + TURISMO (demanda). Pivote
  a "anfitriones locales" documentado.
- (Brian) — CLAUDE.md creado + reposicionamiento de For3s como cerebro (pendiente re-aplicar por
  PR tras el sobrescrito).

---
*El "por qué" y el análisis profundo viven en el Mente OS de Brian:
`~/5M-incubathon/Mente/Cerebro/` (Sesion_Notas_Pivote_Marketplace, Contexto_Hoteles_Eder_Documentos,
Analisis_Repo_Hoteleria_Alex). Este CLAUDE.md es el operativo del repo.*
