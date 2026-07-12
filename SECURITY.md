# Security Policy

NavigoX es un marketplace de anfitriones locales que maneja **datos sensibles**: perfiles de
anfitriones, reservas, y (en el roadmap) pagos. El razonamiento del concierge lo provee un
servicio externo (For3s OS) consumido como caja negra — sus credenciales viven **solo
server-side**, nunca en el navegador. Nos tomamos la seguridad en serio.

---

## Reportar una vulnerabilidad

**Por favor NO abras un issue público para vulnerabilidades de seguridad.** La divulgación
pública antes de un arreglo pone en riesgo a los usuarios.

Repórtala en privado a los mantenedores del equipo. Incluye:

- Descripción del problema y su impacto.
- Pasos para reproducirlo.
- Versión / commit afectado.

Nos comprometemos a responder en un plazo razonable y a acreditar tu aporte si lo deseas.

---

## Prácticas de seguridad del proyecto

- **Secretos fuera del código.** Ninguna llave, token o credencial se commitea. Todo vive en
  `.env` (ignorado por git) o en las variables de entorno de la plataforma (Vercel).
- **Caja negra del cerebro.** Las credenciales de For3s (URL del túnel + API key) son
  **server-side únicamente** — jamás con prefijo `NEXT_PUBLIC_`, jamás visibles al navegador.
  El chat se llama desde una API Route de Next (server), no desde el cliente.
- **Blindaje anti-extracción.** El concierge se niega a revelar arquitectura, código o modelo
  del cerebro que lo alimenta.
- **Sin datos personales innecesarios.** El chat usa un id anónimo por navegador, sin PII.

---

## Alcance

Este proyecto es un MVP de hackathon en evolución. Algunas piezas (pagos web3, base de datos)
están en el roadmap y aún no endurecidas para producción. No lo uses con datos reales de
clientes hasta que esas capas maduren.
