// Punto único de marca del frontend. Todo el copy/identidad que antes vivía
// hardcodeado dentro de los componentes vive aquí. Los colores (tailwind.config.ts)
// y las imágenes (public/) son las otras dos piezas de la identidad visual —
// ver docs/dev/DUPLICACION.md para el playbook completo de re-branding.
//
// Al duplicar este proyecto para una segunda identidad: reemplaza este archivo
// completo (no edites campo por campo) y pide al usuario el nombre/tono/copy real
// en vez de inventarlo.

export const brand = {
  siteName: "anfitriones",

  meta: {
    title: "Anfitriones — vive la ciudad con quien la vive",
    description:
      "Conecta con una persona local real que te muestra su ciudad. Experiencias curadas, humanas, no un catálogo.",
  },

  nav: [
    { href: "#como", label: "Cómo funciona" },
    { href: "#anfitriones", label: "Anfitriones" },
    { href: "#hoteles", label: "Para hoteles" },
  ],

  header: {
    cta: "Vive una experiencia",
  },

  hero: {
    eyebrow: "Turismo con alma local",
    headline: "Conoce la ciudad con quien de verdad la ",
    headlineHighlight: "vive",
    body: "No un tour de catálogo. Una persona local real te lleva a lo suyo — su comida, sus rincones, su forma de ver el lugar. Tú eliges con quién.",
    ctaPrimary: "Empieza tu viaje",
    ctaSecondary: "Ver anfitriones",
    image: "/hero-anfitrion.svg",
    imageAlt: "Anfitrión local mostrando su ciudad al amanecer",
    testimonial: {
      quoteBefore: "Con Lucía no vi Oaxaca — la ",
      quoteEm: "sentí",
      quoteAfter: ". Me llevó a donde comen los de aquí.",
      author: "Marta · viajó a Puerto Escondido",
    },
  },

  como: {
    headline: "Del “no sé qué hacer aquí” a una tarde que no vas a olvidar.",
    subhead: "Tres momentos. Del resto nos encargamos nosotros.",
    momentos: [
      {
        k: "Cuéntanos qué te mueve",
        d: "Tres preguntas rápidas: qué disfrutas, cuándo viajas, con quién. Sin formularios eternos — como contarle a un amigo.",
      },
      {
        k: "El cerebro arma tu ruta",
        d: "Un motor de inteligencia lee tu perfil y a los anfitriones disponibles, y te propone experiencias hechas para ti. Recuerda lo que te gusta entre viajes. No es una lista: es una recomendación con criterio.",
        highlight: true,
      },
      {
        k: "Vívelo con un local",
        d: "Reservas con un anfitrión real y verificado. Pago claro y seguro — y él recibe su parte al instante, sin esperar semanas.",
      },
    ],
  },

  anfitriones: {
    headline: "El mismo lugar, veinte ciudades distintas.",
    subhead: "Cada anfitrión te muestra su versión. Elige la persona, no el paquete.",
    lista: [
      {
        nombre: "Lucía",
        enfoque: "Cocina de mercado",
        lugar: "Puerto Escondido",
        linea: "Te lleva a desayunar donde desayunan los pescadores, no donde va el turista.",
        foto: "/anfitrion-lucia.svg",
      },
      {
        nombre: "Diego",
        enfoque: "Manglar & amanecer",
        lugar: "Manialtepec",
        linea: "Bioluminiscencia y aves al alba — conoce la laguna como la palma de su mano.",
        foto: "/anfitrion-diego.svg",
      },
      {
        nombre: "Renata",
        enfoque: "Arte & barrio",
        lugar: "Oaxaca centro",
        linea: "Talleres de artesanos que no salen en ninguna guía, con la historia detrás.",
        foto: "/anfitrion-renata.svg",
      },
    ],
  },

  cta: {
    headline: "Tu próximo viaje merece un local que lo haga inolvidable.",
    body: "Sin comisiones abusivas. Anfitriones reales. Una experiencia hecha para ti.",
    button: "Empezar ahora",
  },

  footer: {
    tagline: "Vive la ciudad con quien la vive. Turismo con alma local, curado y humano.",
    email: "hola@anfitriones.mx",
    whatsappLabel: "WhatsApp",
    legal: "© 2026 Anfitriones — Incubathon. Recomendaciones potenciadas por For3s (vía API).",
  },

  chat: {
    // Prefijo de la key de localStorage para el id de cliente anónimo del chat.
    clientIdStorageKey: "anf_cid",
    greeting: "¡Hola! 🌿 Soy tu concierge local. ¿Qué te gustaría vivir en tu viaje?",
    panelTitle: "Concierge local",
    panelSubtitle: "Te ayuda a armar tu experiencia",
    placeholder: "Escribe tu mensaje…",
    errorReply: "Ups, intenta de nuevo en un momento.",
  },
};
