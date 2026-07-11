# 💰 IDEA WEB3 sobre Next.js (para cuando dé tiempo — NO bloqueante del MVP)

> El MVP funciona SIN web3. Esto es el "plus" que conecta con el track de pagos/PayFi y da el
> "wow" de dinero moviéndose en vivo. Diseñado para encajar en el monorepo sin reescribir nada.

## Qué resuelve

El dolor real de los specs: **al anfitrión local se le paga tarde y a mano** (transferencia días
después). Web3 permite **liquidarle su comisión en minutos, con evidencia visible** (un hash de
transacción) — el segundo golpe del diferenciador (el cerebro For3s es el primero).

## Dónde vive en el monorepo

- **`packages/web3/`** — la lógica de liquidación (ya hay un placeholder `liquidar()`).
- **`apps/web`** — un botón "Pagar / Liberar comisión" que al confirmar la reserva llama al backend.
- **`apps/api`** — ruta `/pago` que orquesta la liquidación (no exponer llaves de wallet al cliente).

## Flujo propuesto (mínimo para la demo)

```
Turista confirma la experiencia
   → backend registra la reserva
   → backend llama packages/web3 → liquida la comisión al anfitrión
   → devuelve txHash
   → el frontend muestra "✅ El anfitrión recibió su pago" + el hash (evidencia visible)
```

## Decisiones a tomar en un ISSUE (aún abiertas)

- **Chain:** ¿Base? ¿Arbitrum? ¿una L2 barata? (confirmar si el hackathon fija SDK/chain).
- **Real vs simulado para la demo:** recomendación = **simulado con evidencia visual** (a prueba
  de fallos en vivo) + una transacción real pequeña grabada de respaldo. Igual que en la charla.
- **Moneda:** stablecoin (USDC) para que el monto sea legible y estable.
- **Wallet del anfitrión:** ¿se le crea una custodiada? (el anfitrión puede no saber de cripto —
  mismo problema de alfabetización digital de los specs → probablemente wallet custodiada simple).

## Regla de seguridad (igual que For3s)

Las llaves privadas / seed / claves de wallet **NUNCA** en el repo ni en variables `NEXT_PUBLIC_`.
Solo server-side, en `.env` (que está en `.gitignore`). El navegador jamás las ve.

## Por qué NO ahora (disciplina de MVP)

El MVP se juzga por el flujo completo funcionando (turista → cerebro → anfitrión → reserva). El
pago web3 se agrega SOLO si el flujo base ya está sólido. "Pequeño que funciona > ambicioso al 70%".
