// Backend del marketplace — Hono sobre BUN (runtime nativo, corre TS directo).
// Rol: orquesta entre el frontend, la base de datos (por definir, ver issue DB)
// y el CEREBRO For3s (que se CONSUME por API como caja negra — nunca se integra).
// Aún SIN lógica de negocio: esqueleto para colgar rutas conforme aterricen los specs.
import { Hono } from "hono";

const app = new Hono();
const PORT = Number(Bun.env.PORT ?? 3001);

app.get("/health", (c) => c.json({ ok: true, service: "hoteleria-api", runtime: "bun" }));

// TODO (issues): /anfitriones (CRUD), /experiencias, /reservas, /recomendar
// (proxy al cerebro For3s — server-side, la llave NUNCA al cliente), /pago (web3).

export default { port: PORT, fetch: app.fetch }; // Bun.serve lee este default export
console.log(`hoteleria-api (bun) en http://localhost:${PORT}`);
