# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com). El proyecto está en
desarrollo activo (hackathon Incubathon).

## [0.1.0] — 2026-07-12 — MVP del hackathon

### Añadido
- Monorepo escalable con **bun** (gestor + runtime): `apps/web` (Next.js 15) + `apps/api`
  (Hono sobre Bun) + `packages/shared` + `packages/web3`.
- **Landing** con brand kit NavigoX (verde mate / diseño editorial, sin tells de IA).
- **Chat de concierge** flotante dirigido por For3s (consumido como caja negra vía API Route).
- Desplegado en **Vercel** (`hoteleria-incubathon-web.vercel.app`), auto-deploy desde `main`.
- Specs de producto (ICP, MVP scope, casos de uso negocio/turismo, journey de usuarios).
- Capa de profesionalización: LICENSE (AGPL-3.0), SECURITY, CONTRIBUTING, Code of Conduct,
  CI, issue templates.

### Seguridad
- Caja negra del cerebro: credenciales de For3s server-side, cero exposición al navegador.
- Blindaje anti-extracción en el chat.

### Roadmap (no en este release)
- Base de datos + schema (anfitriones, experiencias, reservas).
- Liquidación de comisión instantánea (web3).
- URL fija del túnel (Tailscale Funnel / dominio propio).
