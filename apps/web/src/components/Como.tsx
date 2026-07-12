import { brand } from "@/content/brand";

// "Cómo funciona" — SIN los 01/02/03 de scaffold (tell de IA, prohibido por
// impeccable). El flujo se cuenta como una narrativa de 3 momentos en filas
// alternadas (zig-zag editorial), cada una con su carácter, no cards idénticas.
export function Como() {
  const { como } = brand;
  return (
    <section id="como" className="bg-bg py-24">
      <div className="container-content">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-ink">
            {como.headline}
          </h2>
          <p className="mt-4 text-lg text-muted">{como.subhead}</p>
        </div>

        <div className="flex flex-col gap-5">
          {como.momentos.map((m) => (
            <div
              key={m.k}
              className={`grid items-center gap-6 rounded-2xl p-8 md:grid-cols-[1fr_1.4fr] md:p-10 ${
                m.highlight ? "bg-primary text-bg" : "bg-surface"
              }`}
            >
              <h3
                className={`font-display text-2xl font-semibold md:text-3xl ${
                  m.highlight ? "text-bg" : "text-primary"
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
