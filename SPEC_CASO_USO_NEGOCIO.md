# Spec — Caso de Uso: Negocio de Experiencias (Lado Oferta)

> Cubre a dos actores distintos del lado oferta: el **anfitrión local** (la persona que da la experiencia) y el **hotel/hostal** (el canal que lo recomienda y factura). No confundir ambos en el mismo flujo — tienen necesidades distintas.

## ¿Quiénes son los usuarios finales?

1. **El anfitrión local** — la persona que da la experiencia (puede ser sin conocimientos técnicos, incluso sin smartphone/internet propio, según se discutió explícitamente en la sesión).
2. **El hotel/hostal/renta vacacional (≤50 llaves)** — el canal que recomienda al anfitrión al huésped y participa de la operación/comisión.

## ¿Cuál es la entrada de información?

- **Alta del anfitrión:** en el MVP, el alta es asistida por el equipo, no self-service — se mencionó explícitamente en la sesión: *"yo no tengo ni celular, no se preocupen, nosotros lo damos de alta."* El MVP asume una plantilla visual estándar (una sola página tipo "copy-paste" con foto, bio, especialidad, disponibilidad) llenada con ayuda del equipo o del hotel, no un formulario complejo de autoservicio.
- **Datos mínimos por anfitrión:** nombre, bio corta, especialidad/enfoque, años de experiencia, disponibilidad (puede ser estacional), zona/localidad.
- **Datos del hotel/canal:** qué anfitriones recomienda, cómo se calcula su comisión por referir.

## ¿Cuál es el objetivo principal?

Dar de alta anfitriones locales reales con el mínimo de fricción posible (asumiendo baja alfabetización digital), y liquidarles su pago/comisión de forma instantánea en vez de manual y demorada — este es el diferenciador técnico central heredado de `MVP_SCOPE.md`.

## El insight central de la sesión (no perderlo en el MVP)

**El anfitrión no es intercambiable.** No se está construyendo "un catálogo de walking tours" — cada anfitrión aporta una version distinta de la misma ciudad según su propia personalidad y expertise. El sistema de alta y de perfil debe capturar y mostrar esa diferenciación humana, no reducir al anfitrión a una fila de base de datos genérica ("proveedor de servicio X").

## Funcionalidades del MVP (lado oferta)

1. **Alta asistida de 2-3 anfitriones reales** (conseguidos vía la red de Eder o del Hotel del Principado) — no un formulario de autoservicio complejo.
2. **Perfil mínimo con foco humano:** foto, bio, especialidad, disponibilidad — priorizar esto sobre cualquier feature de "catálogo".
3. **Notificación de reserva confirmada** al anfitrión (vía WhatsApp, el canal que ya usan).
4. **Liquidación de pago instantánea** al confirmarse la experiencia — la pieza técnica de Brian, con evidencia visual (hash de transacción o equivalente) de que el dinero se movió en minutos, no días.
5. **Vínculo con el canal hotelero:** el hotel/hostal que refirió al anfitrión debe quedar registrado para su comisión — aunque sea de forma simple (no requiere dashboard completo para el MVP).

## Fuera de alcance para el MVP

- Autoservicio completo de alta de anfitriones (formulario público, verificación de identidad, etc.).
- Gestión de disponibilidad en tiempo real / calendario sincronizado — el MVP usa disponibilidad pre-cargada y estática para 2-3 anfitriones, no un sistema de calendario en vivo.
- Dashboard de reporting para el hotel/canal — se menciona pero no se construye.
- Escalar a más de un puñado de anfitriones — el objetivo del hackathon es demostrar el flujo con calidad, no la cantidad de oferta.

## Riesgos identificados en la sesión (no resueltos, a vigilar)

- **Brecha de alfabetización digital del anfitrión** — el modelo de alta asistida resuelve esto para el MVP, pero es un costo operativo real a considerar para cualquier escalamiento post-hackathon (alguien del equipo tiene que dar de alta manualmente a cada anfitrión).
- **Escepticismo válido levantado en la sesión:** alguien del equipo señaló directamente que "esto ya lo hicieron 3 veces" y que la tecnología por sí sola no es defendible — el pitch debe apoyarse en la curación humana + el canal de distribución + el pago instantáneo, no en "tenemos una app con IA."
- **Dependencia del hotel/canal para descubrimiento inicial** — sin el hotel recomendando activamente, no hay flujo de demanda hacia el anfitrión; el MVP debe demostrar esa conexión explícitamente, no asumirla.
