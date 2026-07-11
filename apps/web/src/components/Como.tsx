// "Cómo funciona" — SIN los 01/02/03 de scaffold (tell de IA, prohibido por
// impeccable). El flujo se cuenta como una narrativa de 3 momentos en filas
// alternadas (zig-zag editorial), cada una con su carácter, no cards idénticas.
const momentos = [
  {
    k: "Cuéntanos qué te mueve",
    d: "Tres preguntas rápidas: qué disfrutas, cuándo viajas, con quién. Sin formularios eternos — como contarle a un amigo.",
    tone: "bg-surface",
  },
  {
    k: "El cerebro arma tu ruta",
    d: "Un motor de inteligencia lee tu perfil y a los anfitriones disponibles, y te propone experiencias hechas para ti. Recuerda lo que te gusta entre viajes. No es una lista: es una recomendación con criterio.",
    tone: "bg-moss text-bg",
    highlight: true,
  },
  {
    k: "Vívelo con un local",
    d: "Reservas con un anfitrión real y verificado. Pago claro y seguro — y él recibe su parte al instante, sin esperar semanas.",
    tone: "bg-surface",
  },
];

export function Como() {
  return (
    <section id="como" className="bg-bg py-24">
      <div className="container-content">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-ink">
            Del “no sé qué hacer aquí” a una tarde que no vas a olvidar.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Tres momentos. Del resto nos encargamos nosotros.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {momentos.map((m) => (
            <div
              key={m.k}
              className={`grid items-center gap-6 rounded-2xl p-8 md:grid-cols-[1fr_1.4fr] md:p-10 ${m.tone}`}
            >
              <h3
                className={`font-display text-2xl font-semibold md:text-3xl ${
                  m.highlight ? "text-bg" : "text-moss"
                }`}
              >
                {m.k}
              </h3>
              <p
                className={`text-lg leading-relaxed ${
                  m.highlight ? "text-bg/90" : "text-muted"
                }`}
              >
                {m.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
