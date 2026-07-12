# Playbook de duplicación — segundo proyecto del hackathon

Este repo va a servir de base para un **segundo proyecto** presentado en el hackathon:
mismo producto, mismo backend (`apps/api`), mismo cerebro For3s y mismo guion de chat,
mismo diferenciador (pago instantáneo al anfitrión) — **solo cambia la identidad visual
y se agregan componentes nuevos** en el frontend. El segundo proyecto vivirá en un **repo
aislado**, armado copiando y pegando este código en una etapa posterior (no ahora).

Si eres un agente de IA ejecutando esa duplicación, sigue estos pasos en orden:

1. **Copia el repo completo** al nuevo destino (nuevo repo git, remoto propio).

2. **Pregunta al usuario antes de tocar código** — nunca inventes:
   - Nombre del proyecto / marca.
   - Paleta e identidad visual (o un brand kit tipo `docs/design/brand_kit.md`).
   - Tono de copy (formal/casual, público objetivo si difiere del original).
   - Qué componentes nuevos quiere agregar sobre esta base.

   No rellenes `apps/web/src/content/brand.ts` ni los hex de `tailwind.config.ts` con
   valores de ejemplo — deja el placeholder actual (Atlas Nexus / "anfitriones") hasta
   tener la respuesta real del usuario.

3. **Reemplaza `apps/web/src/content/brand.ts` completo** con la identidad nueva —
   este archivo es el punto único de marca/copy del frontend (nav, hero, pasos,
   anfitriones, CTA, footer, chat). No lo edites campo por campo desde cero; reescríbelo
   entero para evitar mezclar contenido viejo y nuevo.

4. **Reemplaza solo los valores hex en `apps/web/tailwind.config.ts`** — mantén los
   nombres de los tokens (`bg`, `surface`, `ink`, `muted`, `primary`, `primary-deep`,
   `accent`, `accent-deep`). Son nombres neutrales a propósito para que los componentes
   no necesiten tocarse al cambiar de paleta. Actualiza también `--shadow-ink` en
   `apps/web/src/app/globals.css` (`:root`) para que coincida con el RGB del nuevo `ink`.

5. **Reemplaza las imágenes en `apps/web/public/`** (hoy: `hero-anfitrion.svg`,
   `anfitrion-lucia.svg`, `anfitrion-diego.svg`, `anfitrion-renata.svg` — son placeholders
   SVG). Actualiza las rutas en `content/brand.ts` si cambian los nombres de archivo.

6. **`apps/api`, `packages/shared`, `packages/web3` y `docs/specs/` se mantienen
   compartidos/idénticos** — el producto, el diferenciador y el guion del chat (For3s)
   son los mismos para ambos proyectos. No los dupliques ni los reescribas salvo que el
   usuario confirme explícitamente que el segundo proyecto tiene un caso de negocio
   distinto.

7. **Opcional**: renombra `name`/`description` en los `package.json` (`@hoteleria/web`,
   `@hoteleria/api`, etc.) y en el root (`hoteleria-incubathon`) si el nuevo repo necesita
   su propia identidad de paquete/npm scope.

8. **Verifica antes de entregar**: `bun install` + `bun run dev` en el repo nuevo, revisar
   visualmente que la paleta/copy/imágenes correspondan a la identidad nueva, y que
   `bun run build` en `apps/web` pase sin errores.
