---
name: NavigoX
description: Turismo con alma local — el anfitrión real es el producto, no el catálogo.
colors:
  primary: "#1A2A44"
  primary-deep: "#101929"
  accent: "#F47C3C"
  accent-deep: "#D9652E"
  surface: "#E1E8EC"
  neutral-bg: "#FFFFFF"
  muted: "#4C5870"
typography:
  display:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "clamp(2rem, 6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-roboto), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
---

# Design System: NavigoX

## 1. Overview

**Creative North Star: "El diario de campo"**

NavigoX es el cuaderno de un reportero de calle, no el folleto de una agencia de viajes.
La superficie es tranquila y editorial — mucho blanco, un azul nocturno profundo cargando
el peso de la voz — porque la verdad de la experiencia vive en la calle, no en la sala de
juntas ("Truth is found in the street, not the boardroom"). El naranja aparece poco y a
propósito: un aviso amable, nunca un grito, señalando exactamente dónde actuar. El sistema
rechaza explícitamente el catálogo genérico de "servicios turísticos" (tarjetas idénticas,
eyebrows tracked-uppercase, texto degradado, fondo crema/beige) — cada anfitrión tiene cara,
nombre y voz propia; el producto es la persona, no la casilla.

**Key Characteristics:**
- Fondo blanco limpio, casi sin decoración — el contenido (fotos reales, texto) carga el peso visual.
- Un solo azul (Saigon Night Blue) para casi todo el texto y los botones sólidos — consistencia, no variedad de color.
- El naranja (Oaxacan Chili Orange) reservado para llamados a la acción puntuales, nunca como bloque de texto.
- Componentes táctiles: hover con leve elevación/traslación, nunca rebote ni easing agresivo.

## 2. Colors

Paleta restringida y deliberada: un azul que carga casi todo, un naranja que aparece poco y por eso pesa.

### Primary
- **Saigon Night Blue** (#1A2A44): texto principal, botones sólidos, fondos oscuros ricos en su variante profunda (#101929). Es la voz de la marca — silencioso pero constante.

### Secondary
- **Naranja de alerta amable** (#F47C3C): CTA secundarios, puntos de calor, acentos puntuales. Nunca como color de texto sobre fondos claros — ahí no cumple el contraste mínimo (ver Don'ts). Su variante oscura (#D9652E) es el hover/estado activo.

### Neutral
- **Blanco** (#FFFFFF): lienzo general, texto sobre fondos oscuros.
- **Bangkok Pavement Gray** (#E1E8EC): fondos secundarios, contenedores alternos, nunca texto.
- **Ink Muted** (#4C5870): texto secundario/cuerpo sobre fondo blanco, verificado ≥4.5:1.

### Named Rules
**La regla del naranja raro.** El acento naranja se usa en ≤10% de cualquier pantalla y nunca como color de texto sobre superficies claras — su escasez es lo que lo hace notarse.

## 3. Typography

**Display Font:** Inter (SemiBold/Bold), con fallback `system-ui, sans-serif`.
**Body Font:** Roboto (Regular/Medium), con fallback `system-ui, sans-serif`.

**Character:** un titular geométrico y seguro (Inter) sobre un cuerpo humano y legible (Roboto) — la pareja de un reportero: título de nota + texto corrido, no dos voces compitiendo.

### Hierarchy
- **Display** (600, `clamp(2rem, 6vw, 4.75rem)`, line-height 1.05, letter-spacing -0.02em): titulares H1 de hero y secciones principales.
- **Headline** (600, `clamp(2rem, 4vw, 3.25rem)`, line-height 1.1): títulos de sección (Como funciona, Anfitriones, CTA).
- **Title** (600, 1.25rem): nombres de anfitrión, títulos de tarjeta.
- **Body** (400, 1rem, line-height 1.6, máx. 65-75ch): párrafos, descripciones.
- **Label** (500, 0.875rem): labels de formulario, footer.

### Named Rules
**La regla del balance.** Todo H1-H3 usa `text-wrap: balance`; los párrafos largos usan `text-wrap: pretty` — ninguna línea huérfana ni titular descompensado.

## 4. Elevation

Sistema mayormente plano — la profundidad viene de fotografía real y contraste de color, no de sombras decorativas. Cuando hay sombra, es funcional (separar una tarjeta flotante del fondo), nunca junto a un borde sobre el mismo elemento.

### Shadow Vocabulary
- **hero-float** (`box-shadow: 0 20px 60px -20px rgba(26,42,68,0.5)`): la imagen del hero, para despegarla del fondo blanco.

### Named Rules
**La regla del borde o la sombra, nunca ambos.** Un elemento usa borde translúcido (`rgba(var(--shadow-ink), 0.15)`) O sombra — combinarlos en el mismo elemento es el "ghost card" que este sistema prohíbe explícitamente.

## 5. Components

### Buttons
- **Shape:** completamente redondeado (`rounded-full`, 9999px) — un botón, no una tarjeta.
- **Primary:** fondo `primary` (#1A2A44), texto blanco, padding `12px 28px`.
- **Hover / Focus:** `-translate-y-0.5` con easing `ease-out-expo` (sin rebote); nunca cambia de color, solo se eleva.
- **Ghost:** transparente, borde translúcido sobre `ink` al 15% opacidad, texto `primary`; hover sube la opacidad del borde a 40% (nunca agrega sombra).

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl`) en tarjetas de contenido, 24px (`rounded-3xl`) en contenedores grandes (imagen de hero, formulario).
- **Background:** blanco o `surface` (#E1E8EC) para bloques alternos.
- **Shadow Strategy:** ver regla de Elevation — borde o sombra, no ambos.
- **Internal Padding:** 24-32px.

### Inputs / Fields
- **Style:** borde sutil sobre `ink` translúcido, fondo blanco, radio 16px.
- **Focus:** contorno visible sobre `primary`.
- **Error:** texto en un tono de error legible (no reutiliza el naranja de marca), con `aria-invalid`/`aria-describedby`.

### Navigation
- Texto `ink` sobre fondo blanco, sin subrayado por defecto; hover pasa a `primary`. Máximo 3 ítems visibles (regla de carga cognitiva del proyecto).

## 6. Do's and Don'ts

### Do:
- **Do** usar `primary` (#1A2A44) para casi todo el texto y los botones sólidos — es el color que carga la marca.
- **Do** reservar el naranja (#F47C3C) para botones/íconos/acentos puntuales, nunca como color de texto sobre fondo claro.
- **Do** usar fotografía real de anfitriones/experiencias como el elemento que carga el peso visual, no paneles de color.
- **Do** dar personalidad propia (nombre, especialidad, voz en primera persona) a cada anfitrión — nunca una fila genérica de proveedor.

### Don't:
- **Don't** combinar borde + sombra en el mismo elemento (el "ghost card" que este sistema prohíbe explícitamente).
- **Don't** usar el naranja de acento como color de texto sobre `surface` o `bg` — falla el contraste mínimo de 4.5:1.
- **Don't** usar eyebrows tracked-uppercase repetidos sobre cada sección, ni marcadores numerados 01/02/03 como scaffold.
- **Don't** usar texto degradado (`gradient text`), glassmorphism decorativo, ni fondo crema/beige "cálido por defecto".
- **Don't** reducir a los anfitriones a una tarjeta de catálogo intercambiable (rating + precio) — el perfil de la persona ES el producto.
