# 🏗️ ESTRUCTURA DEL MONOREPO — guía de encarpetado (escalable, backend + frontend + web3)

> Para que Brian y Alex trabajemos los dos sin pisarnos. Monorepo con **workspaces de bun**:
> un solo repo, varias apps/paquetes, dependencias compartidas — bun como gestor Y runtime. Escala de MVP a producto.

```
Hoteleria-Incubathon/
├── package.json            # raíz: workspaces bun + scripts (dev:web, dev:api, build)
├── .gitignore              # node, next, .env, web3 artifacts
├── .env.example            # plantilla de config (SIN secretos) — copiar a .env
├── CLAUDE.md               # ⭐ memoria institucional del repo (leer primero, flujo cracked-dev)
├── ESTRUCTURA.md           # este archivo
├── README.md               # síntesis del proyecto (equipo, problema, diferenciador)
│
├── apps/                   # las aplicaciones ejecutables
│   ├── web/                # 🖥️ FRONTEND — Next.js 15 (App Router) + Tailwind
│   │   ├── src/app/        #   páginas (layout, page)
│   │   ├── src/components/ #   Header · Hero · Como · Anfitriones · CTA · Footer · ChatWidget
│   │   ├── src/content/brand.ts # 🎨 PUNTO ÚNICO DE MARCA — todo el copy/identidad vive aquí
│   │   └── tailwind.config.ts   #   tokens de color (bg/surface/ink/muted/primary/accent…)
│   │
│   └── api/                # ⚙️ BACKEND — Hono sobre BUN (corre TS nativo), ligero y escalable
│       └── src/index.ts    #   /health + /chat (proxy a For3s, caja negra) — único que habla con For3s
│
├── packages/               # código compartido entre apps (no se despliega solo)
│   ├── shared/             #   tipos compartidos (Anfitrion, Experiencia…) web ↔ api
│   └── web3/               #   💰 liquidación instantánea (placeholder — "si da tiempo")
│
├── docs/                   # 📚 documentación
│   ├── specs/              #   los specs de Alex/Eder (ICP, MVP, casos de uso negocio/turismo)
│   ├── dev/                #   reglas de stack + DUPLICACION.md (playbook para el 2º proyecto)
│   ├── design/brand_kit.md #   kit de marca vigente (Atlas Nexus)
│   ├── WEB3_IDEA.md        #   la idea de web3 sobre Next.js (para cuando haya tiempo)
│   └── SLIDES/             #   material del pitch
│
└── infra/                  # (futuro) docker-compose, deploy, CI
```

> **Duplicación para un segundo proyecto**: este repo se va a copiar a un repo aislado
> para presentar un segundo proyecto en el hackathon (mismo backend/diferenciador, solo
> cambia identidad visual + componentes nuevos). Ver `docs/dev/DUPLICACION.md` antes de
> hacerlo — la identidad visual ya está aislada en `apps/web/src/content/brand.ts` +
> `apps/web/tailwind.config.ts`, así que duplicar no debería requerir tocar los componentes.

## Cómo correr (local)

```bash
bun install            # instala todos los workspaces de una vez (rápido)
cp .env.example .env   # y llenar los valores (API de For3s, DB, etc.)
bun run dev:web        # frontend en http://localhost:3000
bun run dev:api        # backend en http://localhost:3001 (Bun.serve)
```

## Reglas de oro (flujo cracked-dev — ver CLAUDE.md)

- **Nadie pushea a `main` directo.** Rama por ticket (`feat/…`, `fix/…`) → PR → revisión humana.
- **`git pull` antes de ramificar** (ya hubo un sobrescrito por no hacerlo).
- Lo que sube Alex/Erick (specs, docs) → va a **`docs/`**.
- **For3s se CONSUME por API** (caja negra) — nunca se integra al código de este repo.
- Cada quien toca su carril: Alex el marketplace/producto, Brian la integración del cerebro + web3.

## Por qué monorepo (y no 2 repos)

- Un solo lugar para clonar y entender todo (bueno para el jurado y para nosotros).
- Tipos compartidos (`packages/shared`) sin duplicar contratos entre front y back.
- Un solo `bun install`, un solo flujo de PRs, un solo CLAUDE.md de memoria.
- Escala: mañana se agrega `apps/admin`, `apps/mobile` o más paquetes sin reestructurar.
