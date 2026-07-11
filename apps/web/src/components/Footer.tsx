// Footer — sobrio sobre blanco cálido. Marca serif, contacto, legal.
export function Footer() {
  return (
    <footer id="hoteles" className="border-t border-ink/5 bg-bg py-16">
      <div className="container-content grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-display text-xl font-semibold text-moss">anfitriones</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Vive la ciudad con quien la vive. Turismo con alma local, curado y humano.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">Explora</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><a href="#como" className="hover:text-ink">Cómo funciona</a></li>
            <li><a href="#anfitriones" className="hover:text-ink">Anfitriones</a></li>
            <li><a href="#hoteles" className="hover:text-ink">Para hoteles</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>hola@anfitriones.mx</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>
      <div className="container-content mt-12 border-t border-ink/5 pt-6 text-xs text-muted">
        © 2026 Anfitriones — Incubathon. Recomendaciones potenciadas por For3s (vía API).
      </div>
    </footer>
  );
}
