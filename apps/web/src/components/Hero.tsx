// Hero — verde mate como protagonista, blanco cálido de respiro. Serif display
// grande, foto real de naturaleza/costa a la derecha (asimetría editorial, no
// centrado genérico). Sin gradient text, sin video-relleno.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="container-content grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        {/* Columna de texto */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm text-moss">
            <span className="h-1.5 w-1.5 rounded-full bg-lima" />
            Turismo con alma local
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] text-ink">
            Conoce la ciudad con quien de verdad la{" "}
            <span className="text-moss">vive</span>.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            No un tour de catálogo. Una persona local real te lleva a lo suyo —
            su comida, sus rincones, su forma de ver el lugar. Tú eliges con quién.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#como" className="btn-primary">Empieza tu viaje</a>
            <a href="#anfitriones" className="btn-ghost">Ver anfitriones</a>
          </div>
        </div>

        {/* Columna visual — foto real (fallback: bloque verde con textura suave) */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-moss-deep shadow-[0_20px_60px_-20px_rgba(26,37,58,0.5)]">
            {/* TODO(asset): foto real de una experiencia local (costa/manglar/mercado) */}
            <img
              src="/hero-anfitrion.jpg"
              alt="Anfitrión local mostrando su ciudad al amanecer"
              className="h-full w-full object-cover"
            />
            {/* Tarjeta flotante: prueba de la propuesta (humana, no métrica de SaaS) */}
            <figure className="absolute bottom-5 left-5 right-5 rounded-2xl bg-bg/95 p-4 backdrop-blur">
              <blockquote className="text-sm leading-snug text-ink">
                “Con Lucía no vi Oaxaca — la <em>sentí</em>. Me llevó a donde
                comen los de aquí.”
              </blockquote>
              <figcaption className="mt-2 text-xs text-muted">
                Marta · viajó a Puerto Escondido
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
