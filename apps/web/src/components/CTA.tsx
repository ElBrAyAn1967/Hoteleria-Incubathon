// CTA de cierre — verde profundo (la marca "drenada" en un bloque), invitación
// cálida y humana. Un solo botón con peso.
export function CTA() {
  return (
    <section id="reservar" className="bg-moss-deep py-24">
      <div className="container-content text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight text-bg">
          Tu próximo viaje merece un local que lo haga inolvidable.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-bg/80">
          Sin comisiones abusivas. Anfitriones reales. Una experiencia hecha para ti.
        </p>
        <a
          href="#como"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-lima px-8 py-3.5 text-base font-semibold text-moss-deep transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          Empezar ahora
        </a>
      </div>
    </section>
  );
}
