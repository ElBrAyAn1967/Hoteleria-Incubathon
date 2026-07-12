# Contribuir a NavigoX

Gracias por tu interés. Este proyecto se construye en equipo (flujo cracked-dev) — lee
`CLAUDE.md` y `ESTRUCTURA.md` antes de empezar.

## Setup rápido

Requisito: [bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash`).

```bash
bun install            # instala todos los workspaces
cp .env.example .env   # y llena los valores
bun run dev            # levanta web (:3000) + api (:3001)
```

## Flujo de trabajo

- **Rama por ticket** (`feat/…`, `fix/…`) para cambios delicados; PR → revisión → merge.
  Para el sprint del hackathon, cambios pequeños pueden ir directo a `main` (acordado en equipo).
- **`git pull` antes de ramificar** — evita conflictos por trabajar en paralelo.
- Antes de subir: `bun run build` (en `apps/web`) debe pasar.
- Specs y docs → `docs/`. Frontend → `apps/web`. Backend → `apps/api`.

## Reglas duras (no romper)

- **For3s (el cerebro) se CONSUME por API como caja negra.** Nunca se sube su código, lógica
  ni schema. Sus credenciales son server-side, jamás `NEXT_PUBLIC_`. Ver `CLAUDE.md`.
- **Cero secretos en el repo.** Todo en `.env` (ignorado).
- Estilo: sigue los patrones de `docs/dev/` (Next.js, monorepo).

## Reportar bugs / pedir features

Usa las plantillas de issues (`.github/ISSUE_TEMPLATE/`). Para vulnerabilidades, ver `SECURITY.md`.
