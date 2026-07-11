# Marketplace de Experiencias — Hospitality Tech

> Documento de síntesis generado la noche previa al Hackathon. Punto de partida para la sesión de equipo de mañana. Todo lo marcado como `[ABIERTO]` requiere decisión o validación del equipo completo antes de empezar a construir.

## 1. El equipo

| Rol | Persona | Aporta |
|---|---|---|
| Inversionista / Marketing | *(nombre por confirmar)* | Experiencia en comunicaciones en México, visión comercial "tiburón" |
| Consultoría hotelera | **Eder** | 10+ años de experiencia, opera 2 hostales propios en Playa del Carmen, red de contactos en la industria hotelera de México. Autor del brief de **Navigo X**. |
| Ingeniería / Producto | **Alejandro Rivera (Alex)** | Ingeniero de sistemas (IPN-ESCOM). Consultor de digital infrastructure para **Hotel del Principado** (cliente real, laboratorio de validación). Experiencia operativa real como ex-recepcionista. |
| IA / Web3 | **Brian** | Experto técnico en IA, conocimiento en web3. Aporta la pieza de pagos/liquidación instantánea. |

## 2. El problema (con nombre y apellido, no abstracto)

> Un recepcionista/gerente de hotel o key hostal coordina manualmente por WhatsApp con 4-5 operadores de tours locales (buceo, ATV, tours a cenotes, etc.) cada vez que un huésped pregunta "¿qué hay que hacer aquí?". No tiene forma de saber disponibilidad rápido, cobra o paga comisión días después por transferencia manual, y se satura respondiendo docenas de mensajes/llamadas mientras hace su trabajo real de recepción — perdiendo ventas cuando el operador no contesta rápido.

**Validación disponible:**
- **Hotel del Principado** (cliente real de Alex) — acceso directo, puede validarse con datos reales del propio hotel.
- **Hostales de Eder** en Playa del Carmen — pendiente de validación directa con el staff operativo (no solo con Eder).
- **Catálogo de Mama Tava Travel** (compartido por Eder como ejemplo de su red) — evidencia documental de que el flujo de reserva de un operador de tours real, hoy, termina en: *"un miembro del equipo se comunica contigo para confirmar el horario"* — cero disponibilidad en tiempo real, cero pago digital visible, 100% coordinación manual.

`[ABIERTO]` — ¿El caso de validación principal para la demo del domingo va a ser Hotel del Principado (datos reales, acceso directo) o los hostales de Eder (mejor fit de "marketplace multi-operador" pero sin validación directa todavía)?

## 3. Estado del arte (resumen de la Fase 1 de investigación)

**Global:** Viator, GetYourGuide, Klook, Airbnb Experiences — todos dependen de un solo canal de adquisición (SEO/SEM) y compiten por el mismo tráfico digital. El 70%+ de las reservas de experiencias en el mundo siguen siendo offline, vía el staff del hotel.

**Local (México):** Xenda, Enrrutadores, Komuni — mismos patrones: marketplaces de descubrimiento para el turista, ninguno integrado al canal humano (el hotel/concierge) que domina la distribución real.

**El gap que nadie resuelve:** integración nativa al punto de venta físico (el hotel) + liquidación de comisión instantánea al operador local. Ningún competidor analizado (global ni local) lo tiene.

## 4. Los dos documentos de visión — y por qué son distintos

- **Navigo X** (brief de Eder): producto acotado, 3 módulos (Inventory & Booking, Pagos y Finanzas, Integración PMS), construido sobre un producto ya operando (Navigo Pro) con clientes reales previos (Puerto Dreams H, Tranquilo H). **Es el MVP ejecutable.**
- **Early Bird Hospitality OS**: visión de "sistema operativo de la hospitalidad" con 10 motores de inteligencia y una arquitectura de 6 capas. **No es ejecutable en 36h** — es la narrativa de "hacia dónde va esto", no el entregable de mañana.

**Decisión de producto:** el MVP se construye sobre un recorte mínimo de Navigo X. Early Bird se usa como cierre de pitch ("esto es el primer ladrillo de algo más grande"), nunca como promesa de lo que se construyó.

## 5. El diferenciador real (no el genérico)

"Usamos IA para automatizar WhatsApp" es *commodity* — cualquier equipo del hackathon puede decir lo mismo. El diferenciador defendible de este equipo es la combinación de:

1. Acceso y validación real con negocios de hospitalidad (Alex + Eder), no un ICP inventado.
2. **Liquidación de comisión al operador local en minutos, no en 30-60 días**, vía la pieza de pagos/web3 de Brian — esto ataca directamente el segundo dolor real (el operador de tours, no solo el hotel), y conecta con el track de pagos/PayFi del hackathon.

## 6. Preguntas abiertas de la Fase 3 (sin resolver aún)

Ver `CHECKLIST_MANANA.md` para el detalle accionable. Resumen:
- ¿Prometen "tiempo real" en el pitch aunque el MVP no lo sustente de verdad?
- ¿Cuál es el número (no la descripción) del dolor — cuántos mensajes/hora, cuánto tiempo perdido?
- ¿Cómo responden si un juez/dueño de hotel dice "prefiero que mi gente hable con el huésped, no un bot"?
- ¿Hotel del Principado o los hostales de Eder como ancla de la demo?

## 7. Archivos de este repo

> Actualizado tras el scaffold del monorepo (bun). Ver `ESTRUCTURA.md` para el detalle completo de carpetas.

- `README.md` — este archivo, síntesis general + guía de ejecución (§8).
- `CLAUDE.md` — memoria institucional del repo (reglas duras, flujo de trabajo) — leer primero.
- `ESTRUCTURA.md` — guía de encarpetado del monorepo.
- `apps/web/` — frontend (Next.js 15 + Tailwind), la landing.
- `apps/api/` — backend (Hono sobre Bun), único que habla con For3s (caja negra).
- `packages/shared/` — tipos compartidos web ↔ api.
- `packages/web3/` — liquidación instantánea de comisión (placeholder).
- `docs/specs/` — specs de producto (`CHECKLIST_MANANA.md`, `ICP_CONTEXTO.md`, `MVP_SCOPE.md`, `SPEC_CASO_USO_NEGOCIO.md`, `SPEC_CASO_USO_TURISMO.md`, `JOURNEY_USUARIOS.md`).
- `docs/dev/` — reglas de stack (monorepo, Next.js).
- `docs/WEB3_IDEA.md` — idea de web3 sobre Next.js.
- `docs/SLIDES/` — imágenes del pitch.

## 8. Cómo ejecutar (local)

Prerrequisito: [bun](https://bun.sh) instalado (`curl -fsSL https://bun.sh/install | bash`).

```bash
bun install            # instala todos los workspaces (apps/web, apps/api, packages/*) de una vez
cp .env.example .env   # copiar plantilla y llenar valores reales (For3s, DB, etc.)
bun run dev            # levanta web (localhost:3000) + api (localhost:3001) juntos
```

Comandos sueltos si necesitas correr solo una parte:

```bash
bun run dev:web        # solo frontend  → http://localhost:3000
bun run dev:api        # solo backend   → http://localhost:3001 (health check en /health)
bun run build          # build de producción del frontend (apps/web)
```

**Variables de entorno clave** (ver `.env.example`):
- `NEXT_PUBLIC_API_URL` — única variable pública, apunta a nuestro propio backend (`apps/api`), nunca a For3s.
- `FOR3S_API_URL` / `FOR3S_API_KEY` — credenciales del cerebro For3s (caja negra). **Server-side only, jamás con prefijo `NEXT_PUBLIC_`.** Sin estas variables, el chat responde con un fallback cortés en vez de fallar.
- `DATABASE_URL`, `NEXT_PUBLIC_CHAIN_ID` / `WEB3_RPC_URL` — persistencia y pieza web3, opcionales para levantar la demo local.

Antes de abrir un PR: `bun run build` en `apps/web` debe pasar. Ver `CLAUDE.md` para las reglas duras (caja negra de For3s, flujo de ramas) y `docs/dev/` para los patrones de stack.
