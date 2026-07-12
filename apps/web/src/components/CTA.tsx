import Link from "next/link";
import { brand } from "@/content/brand";

// CTA de cierre — color primario profundo (la marca "drenada" en un bloque),
// invitación cálida y humana. Un solo botón con peso → arranca el flujo del viajero.
export function CTA() {
  const { cta } = brand;
  return (
    <section id="reservar" className="bg-primary-deep py-24">
      <div className="container-content text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight text-bg">
          {cta.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-bg/80">{cta.body}</p>
        <Link
          href="/request"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-primary-deep transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          {cta.button}
        </Link>
      </div>
    </section>
  );
}
