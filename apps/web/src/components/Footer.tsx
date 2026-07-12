import { brand } from "@/content/brand";

// Footer — sobrio sobre blanco cálido. Marca serif, contacto, legal.
export function Footer() {
  const { footer } = brand;
  return (
    <footer id="hoteles" className="border-t border-ink/5 bg-bg py-16">
      <div className="container-content grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-display text-xl font-semibold text-primary">{brand.siteName}</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{footer.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Explora</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {brand.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Contacto</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{footer.email}</li>
            <li>{footer.whatsappLabel}</li>
          </ul>
        </div>
      </div>
      <div className="container-content mt-12 border-t border-ink/5 pt-6 text-xs text-muted">
        {footer.legal}
      </div>
    </footer>
  );
}
