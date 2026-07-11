# Checklist — Sesión de Equipo de Mañana

> Objetivo de esta sesión: pasar de "tenemos una buena idea" a "tenemos un ICP validado, un scope congelado, y quién hace qué en las próximas 36 horas."

## 🔴 Decisiones que deben cerrarse ANTES de escribir código

- [ ] **Ancla de validación:** ¿Hotel del Principado (Alex, acceso directo) o hostales de Eder (Playa del Carmen, red más amplia)? — *Ver README §2*
- [ ] **Criterio del jurado:** ¿el evento pesa más el producto técnico o la tracción/impacto de negocio real? (Si nadie del equipo lo sabe, alguien debe preguntarlo a los organizadores a primera hora.)
- [ ] **Promesa de "tiempo real":** decidir el lenguaje exacto que van a usar en el pitch para no prometer algo que el MVP no sostiene. Propuesta: *"respuesta en segundos vía WhatsApp automatizado"* en vez de *"disponibilidad en tiempo real"*.
- [ ] **Un solo caso de uso, no dos.** Nada de construir para "el hotel" y "el operador de tours" como dos productos paralelos — eligan cuál es el usuario primario de la demo.

## 🟡 Preguntas de discovery — llevarlas por escrito, no improvisar

**Para Eder (sobre sus hostales o su red):**
- [ ] ¿Quién específicamente coordina hoy la venta/coordinación de experiencias en tus hostales? (nombre real)
- [ ] ¿Cuántos mensajes de WhatsApp o llamadas recibe esa persona en un día típico solo por temas de experiencias/tours?
- [ ] ¿Puedes conseguirnos 2-3 operadores de experiencias reales de tu red con los que ya trabajas (para no inventar el catálogo)?
- [ ] ¿Cómo se paga hoy la comisión a esos operadores? ¿Cuánto tarda?

**Para Alex (sobre Hotel del Principado):**
- [ ] Preguntar directo a Carlos/Mariano/recepción: ¿cuántas consultas de "qué hay que hacer aquí" llegan por WhatsApp o mostrador en un día?
- [ ] ¿Cuántas de esas consultas se convierten hoy en venta real?
- [ ] ¿Con cuántos operadores de tours/experiencias trabaja el hotel hoy, y cómo se coordina con ellos?

**Para Brian (factibilidad técnica):**
- [ ] ¿Cuánto del motor de pagos/liquidación instantánea está listo para adaptar sin construir infraestructura nueva desde cero?
- [ ] ¿El pago se puede demostrar con una transacción real (aunque sea pequeña) o va a quedarse en testnet/simulación?
- [ ] Confirmar con los organizadores si hay preferencia de chain/SDK, o si es libre.

## 🟢 Scope congelado — qué construir (ver `MVP_SCOPE.md` para el detalle)

- [ ] Confirmar el flujo mínimo end-to-end antes de la hora 10 del hackathon.
- [ ] Definir el "punto de congelamiento de alcance" — la hora exacta después de la cual no se agregan features nuevas, solo se pule lo que ya funciona.
- [ ] Grabar la demo funcionando temprano (no la noche del domingo) como respaldo por si falla en vivo.
- [ ] Conseguir un testimonio en cámara de alguien real (Eder, staff del hostal, o del Hotel del Principado) diciendo en sus propias palabras que esto resuelve un dolor real.

## 🔵 Roles para las 36 horas

| Quién | Responsabilidad principal |
|---|---|
| Alex | Discovery, ICP, narrativa/pitch, validación con Hotel del Principado |
| Eder | Conexión con operadores reales, validación de negocio, red de distribución post-hackathon |
| Brian | Motor técnico: WhatsApp bot + liquidación de pagos |
| Inversionista/Marketing | Evaluar si el pitch es creíble para un jurado tipo "tiburón", pulir narrativa comercial |

## ⏱️ Antes de dormir hoy

- [ ] Las 3 preguntas de discovery de Eder deben tener respuesta (aunque sea aproximada) antes de las 9am de mañana.
- [ ] Decidir la ancla de validación (Hotel del Principado vs. hostales de Eder) — no se puede llegar a la reunión sin esto resuelto.
