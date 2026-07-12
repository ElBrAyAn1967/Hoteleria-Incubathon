import Link from "next/link";
import { brand } from "@/content/brand";

// Hero — color primario como protagonista, blanco cálido de respiro. Serif display
// grande, foto real a la derecha (asimetría editorial, no centrado genérico). Sin
// gradient text, sin video-relleno.
export function Hero() {
  const { hero } = brand;
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="container-content grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        {/* Columna de texto */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] text-ink">
            {hero.headline}
            <span className="text-primary">{hero.headlineHighlight}</span>.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {hero.body}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {/* Botón principal → flujo del viajero (cotización). Segundo → ver anfitriones. */}
            <Link href="/request" className="btn-primary" data-track="hero_empieza_viaje">{hero.ctaPrimary}</Link>
            <Link href="/home" className="btn-ghost" data-track="hero_ver_anfitriones">{hero.ctaSecondary}</Link>
          </div>
        </div>

        {/* Columna visual — foto real */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-primary-deep shadow-[0_20px_60px_-20px_rgba(var(--shadow-ink),0.5)]">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="h-full w-full object-cover"
            />
            {/* Tarjeta flotante: prueba de la propuesta (humana, no métrica de SaaS) */}
            <figure className="absolute bottom-5 left-5 right-5 rounded-2xl bg-bg/95 p-4 backdrop-blur">
              <blockquote className="text-sm leading-snug text-ink">
                “{hero.testimonial.quoteBefore}
                <em>{hero.testimonial.quoteEm}</em>
                {hero.testimonial.quoteAfter}”
              </blockquote>
              <figcaption className="mt-2 text-xs text-muted">
                {hero.testimonial.author}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
