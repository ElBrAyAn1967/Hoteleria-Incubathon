# Kit de Marca de NavigoX

Este documento reemplaza el placeholder anterior ("Atlas Nexus") y define la identidad
visual oficial de **NavigoX** para `apps/web`. Los valores HEX de la tabla de colores son
la fuente de verdad — cualquier columna RGB que se haya recibido junto con este kit no era
consistente con su HEX correspondiente y se descartó intencionalmente (ver nota al final).

## 1. Concepto de logotipo

El logotipo de NavigoX combina un compás de cartografía con una red de datos global
interconectada — simboliza la navegación precisa a través de conexiones globales
complejas. Tagline: **"Navigate Global Connections"**.

> Nota de implementación: hoy `apps/web` no tiene un marca gráfica (SVG) propia — el
> Header/Footer usan solo el wordmark tipográfico (`brand.siteName` = "NavigoX" en
> `apps/web/src/content/brand.ts`). Si se quiere el ícono del compás como asset real,
> es un encargo aparte (diseño de un SVG), no incluido en este cambio de paleta/tipografía.

### Variaciones
| Variante | Uso recomendado |
| :--- | :--- |
| Full color | Fondos claros/blancos (uso principal). |
| Monocromo (blanco) | Fondos oscuros o impresión a un color. |

Elemento ilustrativo de soporte (no es una variación del logo): ilustración de un
"reportero de campo" en una estación de cocina callejera — refuerza la vibra de
"field notes"; uso en materiales de marketing, no en el wordmark.

## 2. Paleta de colores

| Nombre | Descripción | Hex | Uso |
| :--- | :--- | :--- | :--- |
| **Saigon Night Blue** | Azul denim profundo, desgastado por la ciudad | `#1A2A44` | Acento principal — texto, botones, secciones oscuras (`ink`/`primary`) |
| **Oaxacan Chili Orange** | Naranja intenso y terroso | `#F47C3C` | CTA/acento secundario (`accent`) |
| **Bangkok Pavement Gray** | Gris cemento neutro y urbano | `#E1E8EC` | Fondo secundario/contenedores (`surface`) |
| **White** | Blanco limpio | `#FFFFFF` | Lienzo general (`bg`) |

Mapeo a tokens de Tailwind (`apps/web/tailwind.config.ts`): `bg`, `surface`, `ink`,
`muted`, `primary`, `primary-deep`, `accent`, `accent-deep` — ver ese archivo para los
valores exactos derivados (variantes profundas/mutadas).

## 3. Tipografía

- **Titulares (H1/H2/H3)**: Inter, SemiBold/Bold.
- **Cuerpo, labels, captions**: Roboto, Regular/Medium.

Ya implementado en `apps/web/src/app/layout.tsx` (`next/font/google`) y
`tailwind.config.ts` (`font-display` = Inter, `font-sans` = Roboto).

## 4. Mood / principio de marca

Cuatro paneles de mood board: mapa urbano dibujado a mano con marcadores de puestos de
comida, un "reportero de campo" trabajando en una cocina callejera, primer plano de un
plato local, e interacción humana entre reporteros y locales en la calle.

> **"Truth is found in the street, not the boardroom."**

Este mood/tagline se documenta aquí como referencia de identidad visual y tono de
marca; el copy de producto en `apps/web/src/content/brand.ts` (marketplace de
anfitriones/hoteles) **no se reescribió** para adoptar esta narrativa — se mantiene el
producto ya definido en `apps/web/PRODUCT.md` y `docs/specs/`. Si más adelante se decide
alinear también el copy a este mood de "field notes", es un cambio aparte a discutir.

---

**Nota sobre los datos recibidos**: el brand kit original traía, junto a cada hex, una
columna de "código RGB" que no correspondía matemáticamente a su hex (ej. `#1A2A44`
junto a "91, 244, 253", que sería un celeste brillante, no ese azul oscuro). Esos
valores se ignoraron por inconsistentes; los HEX de la tabla arriba son los que se
aplicaron en el código.
