// Anfitriones — el corazón: "el perfil ES el producto". Muestra que el MISMO
// lugar da experiencias distintas según quién sea el anfitrión. No cards
// idénticas: tarjetas con foto grande, carácter y voz propia de cada persona.
const anfitriones = [
  {
    nombre: "Lucía",
    enfoque: "Cocina de mercado",
    lugar: "Puerto Escondido",
    linea: "Te lleva a desayunar donde desayunan los pescadores, no donde va el turista.",
    foto: "/anfitrion-lucia.jpg",
  },
  {
    nombre: "Diego",
    enfoque: "Manglar & amanecer",
    lugar: "Manialtepec",
    linea: "Bioluminiscencia y aves al alba — conoce la laguna como la palma de su mano.",
    foto: "/anfitrion-diego.jpg",
  },
  {
    nombre: "Renata",
    enfoque: "Arte & barrio",
    lugar: "Oaxaca centro",
    linea: "Talleres de artesanos que no salen en ninguna guía, con la historia detrás.",
    foto: "/anfitrion-renata.jpg",
  },
];

export function Anfitriones() {
  return (
    <section id="anfitriones" className="bg-surface py-24">
      <div className="container-content">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
            El mismo lugar, veinte ciudades distintas.
          </h2>
          <p className="max-w-sm text-muted">
            Cada anfitrión te muestra su versión. Elige la persona, no el paquete.
          </p>
        </div>

        {/* grid responsivo sin breakpoints manuales (regla impeccable) */}
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {anfitriones.map((a) => (
            <article
              key={a.nombre}
              className="group overflow-hidden rounded-2xl bg-bg transition-transform duration-300 ease-out-expo hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-moss-deep">
                <img
                  src={a.foto}
                  alt={`${a.nombre}, anfitriona en ${a.lugar}`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-ink">{a.nombre}</h3>
                  <span className="text-sm text-muted">{a.lugar}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-moss">{a.enfoque}</p>
                <p className="mt-3 leading-relaxed text-muted">{a.linea}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
