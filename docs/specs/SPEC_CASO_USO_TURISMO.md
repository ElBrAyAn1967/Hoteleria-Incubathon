# Spec — Caso de Uso: Turismo (Lado Demanda)

> Refleja el pivot de la sesión del equipo: de "catálogo de tours de operadores" a "marketplace de anfitriones locales reales" para experiencias íntimas y curadas. El canal de distribución (hoteles/hostales/rentas ≤50 llaves) se mantiene igual que en `ICP_CONTEXTO.md`.

## ¿Quién es el usuario final?

- Turista/huésped hospedado en un hotel, hostal o renta vacacional de hasta 50 llaves.
- Perfil: alguien que busca **conectar con una persona local**, no solo "hacer una actividad" — el denominador común identificado en la sesión es que el viajero pregunta *"¿dónde comen los locales? ¿a dónde van los locales?"*, no *"¿qué tour hay disponible?"*.

## ¿Cuál es la entrada de información?

- Descubrimiento inicial: recomendación directa del staff del hotel/hostal (canal principal, ya validado en `ICP_CONTEXTO.md`) — no depende de que el turista encuentre la plataforma por su cuenta.
- Perfil del anfitrión local: bio, años de experiencia, especialidad/enfoque (ej. arquitectura, gastronomía, historia), disponibilidad (puede ser estacional — ej. "solo julio-agosto").
- Confirmación de reserva vía el flujo mínimo ya definido en `MVP_SCOPE.md` (WhatsApp/intake → confirmación → pago).

## ¿Cuál es el objetivo principal?

Permitir que un viajero descubra y reserve una experiencia guiada por una persona local real y verificada — no un producto genérico de catálogo — con la confianza de que el proceso es seguro y el pago está resuelto de principio a fin.

## El insight central de la sesión (no perderlo en el MVP)

**Un mismo lugar puede generar 20 experiencias distintas dependiendo de quién sea el anfitrión** — no es "un walking tour de Bellas Artes", es "el walking tour de Bellas Artes con alguien a quien le apasiona la arquitectura porfiriana" vs. "con alguien que conoce la escena under de música." El perfil del anfitrión (su personalidad, su enfoque) **es** el producto — no un dato secundario del listado.

## Funcionalidades del MVP (lado turista)

1. **Descubrir 2-3 anfitriones/experiencias reales** (pre-cargados, no un catálogo completo) con perfil humano visible: foto, bio corta, especialidad, disponibilidad.
2. **Ver diferenciación real entre anfitriones** aunque compartan ubicación/tema — esto es lo que hace la demo creíble frente al jurado, no solo "aquí hay un tour."
3. **Reservar y confirmar** vía el flujo de WhatsApp ya definido.
4. **Pago simple y transparente** — el turista paga con la confianza de que el anfitrión recibe su parte de inmediato (esto se comunica como señal de confianza, no solo como feature técnico).

## Journey detallado (actualización — integra `Journey de los usuarios & cambios a integrar`)

> Aterrizando la ambigüedad del journey original: esto **no** es una búsqueda abierta tipo Viator, ni un motor de recomendación real. Es una capa ligera de personalización sobre el mismo catálogo pre-cargado de 2-3 anfitriones ya definido arriba. El "mapa" y el "roadmap" son presentación curada de ese catálogo fijo, no un motor de búsqueda/geolocalización real.

1. **Intake de intención + contexto** — antes de mostrar el catálogo, un formulario simple de 2-3 campos: dónde te hospedas (hotel/zona) y presupuesto; opcionalmente, qué quiere vivir (tipo de experiencia/mood, texto libre o categorías simples).
2. **Selección visual en mapa** — el mapa muestra únicamente las 2-3 experiencias pre-cargadas del catálogo, ubicadas geográficamente y filtradas/ordenadas por presupuesto y cercanía al hospedaje declarado. No es exploración libre ni terceros no verificados.
3. **Roadmap/journey personalizado** — con las respuestas del formulario, el sistema arma una secuencia simple ("journey") de la(s) experiencia(s) sugerida(s), presentada como una serie de tarjetas (cards), no como una lista de resultados genérica.
4. **Contenido de cada card** — para dar seguridad y control al turista sin saturar la UI: anfitrión (foto/nombre), rating/estrellas, distancia, medio de transporte sugerido, precio. Mantener UI/UX minimalista — no agregar más campos que estos para el MVP.
5. **Reserva y pago** — sin cambios respecto al flujo ya definido arriba: WhatsApp → confirmación → pago.
6. **Feedback post-experiencia** — al terminar cada experiencia, un comentario/calificación corto (rating simple). Uso **interno** para calibrar/mejorar la precisión de futuras recomendaciones — no es un sistema de reviews públicas (ver exclusión abajo, que sigue vigente para el componente público).

## Fuera de alcance para el MVP

- **Sistema de reviews/calificaciones públicas y estructuradas** — el rating/comentario post-experiencia del punto 6 arriba es interno (para calibrar recomendaciones), no un sistema de reviews público tipo TripAdvisor.
- Búsqueda libre/exploración tipo marketplace abierto (Viator-style) — el descubrimiento sigue dependiendo del canal hotelero + el catálogo pre-cargado; el mapa del journey (ver arriba) no es una barra de búsqueda ni exploración libre de terceros.
- **Actualizado:** un mapa simple del catálogo pre-cargado (2-3 experiencias) y un roadmap personalizado sí entran al MVP (ver "Journey detallado" arriba) — lo que sigue fuera de alcance son mapas de calor, geolocalización en tiempo real, o cualquier capa de exploración geográfica más allá de mostrar el catálogo fijo.
- Verificación/onboarding complejo de identidad — para el MVP, la confianza inicial la aporta el hotel que ya recomienda al anfitrión, no un sistema de verificación propio.

## Riesgos identificados en la sesión (no resueltos, a vigilar)

- **Infraestructura/logística real** (transporte, conectividad del anfitrión) es una limitante que "ni el gobierno ha resuelto" — el MVP no debe prometer escalar esto, solo demostrar el flujo con 2-3 casos controlados.
- **Facilidad de réplica tecnológica** — la ventaja no puede ser "la tecnología", porque se copia rápido. La ventaja es la curación humana + el canal de distribución hotelero ya validado + el pago instantáneo, no el chatbot o la app en sí.
