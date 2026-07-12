import { brand } from "@/content/brand";

// Anfitriones — el corazón: "el perfil ES el producto". Muestra que el MISMO
// lugar da experiencias distintas según quién sea el anfitrión. No cards
// idénticas: tarjetas con foto grande, carácter y voz propia de cada persona.
export function Anfitriones() {
  const { anfitriones } = brand;
  return (
    <section id="anfitriones" className="bg-surface py-24">
      <div className="container-content">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
            {anfitriones.headline}
          </h2>
          <p className="max-w-sm text-muted">{anfitriones.subhead}</p>
        </div>

        {/* grid responsivo sin breakpoints manuales (regla impeccable) */}
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {anfitriones.lista.map((a) => (
            <article
              key={a.nombre}
              className="group overflow-hidden rounded-2xl bg-bg transition-transform duration-300 ease-out-expo hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-primary-deep">
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
                <p className="mt-1 text-sm font-medium text-primary">{a.enfoque}</p>
                <p className="mt-3 leading-relaxed text-muted">{a.linea}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
