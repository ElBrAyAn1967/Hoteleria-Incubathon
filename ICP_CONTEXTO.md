# ICP y Contexto de Cliente

## Persona (borrador — pendiente de validar con nombre real)

> **[Nombre pendiente], recepcionista/gerente operativo de [Hotel del Principado / Hostal de Eder], México.**
> Hoy coordina manualmente por WhatsApp con 4-5 operadores de tours locales (buceo, ATV, cenotes, etc.) cada vez que un huésped pregunta "¿qué hay que hacer aquí?". No tiene forma de saber disponibilidad rápido. Cobra o paga comisión días después por transferencia manual. Pierde ventas cuando el operador no contesta rápido, mientras hace en paralelo su trabajo real de recepción/check-in.

`[ABIERTO]` — reemplazar con el nombre real y los números reales en cuanto se tengan (ver `CHECKLIST_MANANA.md`).

## Por qué este ICP y no otro

- Coincide con el hallazgo de la Fase 1: **70%+ de las reservas de experiencias en el mundo se hacen offline**, vía el staff del hotel — no es un problema exótico, es el patrón dominante de toda la industria.
- El equipo tiene **acceso real** a dos laboratorios de validación (Hotel del Principado vía Alex, hostales de Eder vía su red) — no es un ICP inventado para el hackathon.

## Evidencia de campo: catálogo de Mama Tava Travel

Compartido por Eder como ejemplo de un operador real en su red (Puerto Escondido, Oaxaca). Aunque estéticamente débil (hecho en Canva, con inconsistencias ES/EN), es valiosa **evidencia empírica**, no un mockup:

- 15 experiencias distintas (tours de lancha, pesca, surf, cabalgatas, etc.), cada una con el mismo esqueleto: título, descripción, punto de recogida, ventana horaria, duración, qué llevar.
- **Cada experiencia termina en la misma frase:** *"un miembro del equipo se comunica contigo para confirmar el horario."* — cero disponibilidad digital, cero pago en línea visible.
- Algunas experiencias muestran precio fijo (ej. Xenda Pass $500 MXN); otras no muestran precio y dependen de cotización manual — el modelo de datos del producto debe soportar ambos casos.
- No hay ninguna mención de cómo se le paga al operador/guía/capitán — refuerza que el módulo de pagos es el gap real, no solo un plus.

## Por qué el ICP es el NEGOCIO (B2B), no el turista (B2C)

El dolor cuantificable y con disposición de pago hoy es el de **quien pierde tiempo/dinero operando manualmente** (el hotel, el hostal, el operador de tours) — no el turista, que ya reserva sin fricción vía WhatsApp aunque sea lento. Vender "ahorro de tiempo de tu personal" es más defendible que vender "mejor experiencia de descubrimiento" al huésped, que es donde ya compiten Viator/GetYourGuide/Xenda/Enrrutadores sin éxito diferenciado.

## Riesgos abiertos sobre este ICP

- No hay validación directa todavía con el staff operativo de los hostales de Eder (solo con Eder mismo) — riesgo de estar resolviendo el dolor que Eder *cree* que existe, no el que existe de verdad.
- Falta el número: cuántos mensajes/consultas por día, cuánto tiempo se pierde, cuánta venta se cae. Sin esto, el pitch se queda en descripción cualitativa del dolor, no en impacto medible.
