# MVP Scope — 36 Horas

> Regla de oro: terminar con algo pequeño que funciona 100% le gana a terminar con algo ambicioso que funciona al 70%. Ante la duda entre agregar un feature más o blindar lo que ya funciona, siempre se elige lo segundo.

## ✅ Lo que SÍ entra (recortado de Navigo X)

Del brief de Navigo X, solo esto para el hackathon:

1. **Intake de consulta** — el huésped (o el staff en su nombre) pregunta "qué hay que hacer" vía WhatsApp.
2. **Catálogo mínimo pre-cargado** — 2-3 experiencias reales (idealmente de operadores reales conseguidos por Eder, o del Hotel del Principado), no el catálogo completo de Navigo X.
3. **Confirmación de reserva** — un flujo simple de confirmar disponibilidad y cerrar la reserva (puede ser semi-manual del lado del operador, no tiene que ser sync bidireccional real).
4. **Pago / liquidación de comisión al operador** — la pieza de Brian: la comisión se libera en minutos, no en semanas. Este es el diferenciador real, no se recorta.
5. **Proof visual de que el dinero se movió** — hash de transacción, wallet, o el equivalente visual que haga creíble el pago en vivo.

## ❌ Lo que NO entra (aunque esté en los documentos de visión)

- Los 3 módulos completos de Navigo X con charge-to-room, split payments con 3DS, sync bidireccional con PMS real — es trabajo de semanas.
- Cualquiera de los 10 "motores de inteligencia" de Early Bird Hospitality OS — eso es visión a 3-5 años, se menciona en el pitch como narrativa, no se construye.
- Sincronización de disponibilidad verdaderamente en tiempo real con múltiples operadores — no hay tiempo de construir esa integración real con 2-3 operadores que ni siquiera tienen API.
- Dashboard de reporting consolidado, admin panel completo, gestión multi-hotel.
- KYC/AML, multisig treasury, rates dinámicos de conversión — cualquier pieza de "hardening" de producción queda para después.

## 🎯 El flujo que se demuestra el domingo

```
Huésped pregunta por WhatsApp "¿qué hay que hacer aquí?"
        ↓
Sistema responde con 2-3 opciones reales (catálogo pre-cargado)
        ↓
Huésped/staff confirma una experiencia
        ↓
Reserva se registra (operador recibe notificación)
        ↓
Al confirmarse la reserva → pago/comisión se libera al operador
        (en minutos, con evidencia on-chain visible)
        ↓
Testimonio en cámara: la persona real del negocio dice
"esto me hubiera ahorrado X tiempo / X dinero"
```

## Checkpoints de tiempo sugeridos

| Hora del hackathon | Hito |
|---|---|
| 0-2h | Discovery con el negocio real asignado/elegido, un caso real (pasado) para replicar |
| 2-10h | Construcción del flujo mínimo (intake + catálogo + confirmación) |
| 10-12h | Prueba "sombra" con el caso real replicado, frente a alguien del negocio |
| ~12-14h | **Punto de congelamiento de alcance** — no se agregan features nuevas después de esto |
| 14-24h | Blindaje: prueba en vivo con transacción real (aunque sea pequeña), grabación de respaldo |
| 24-26h | Testimonio en cámara grabado |
| Últimas 3-4h | Ensayo del pitch: Problema → Demo en vivo (+ video de respaldo) → Número de impacto → Por qué escala después → Ask |

## Riesgo a vigilar activamente

Si en el Q&A un juez pregunta "¿esto corre de verdad en tiempo real con los operadores?" — la respuesta honesta es: *"la demo usa un catálogo pre-cargado de operadores reales; la confirmación y el pago sí corren en vivo. La sincronización completa de inventario es el siguiente paso post-hackathon."* No sobre-prometer aquí es más creíble que fingir una integración que no existe.
