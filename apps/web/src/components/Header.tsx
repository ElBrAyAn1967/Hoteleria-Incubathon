// Header — limpio, verde mate sobre blanco cálido. Logo con marca tipográfica
// (serif), nav discreta, un solo CTA con peso.
export function Header() {
  const links = [
    { href: "#como", label: "Cómo funciona" },
    { href: "#anfitriones", label: "Anfitriones" },
    { href: "#hoteles", label: "Para hoteles" },
  ];
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/5 bg-bg/85 backdrop-blur-md">
      <div className="container-content flex items-center justify-between py-4">
        <a href="/" className="font-display text-xl font-semibold tracking-tight text-moss">
          anfitriones
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#reservar" className="btn-primary !py-2 !px-5 text-sm">
          Vive una experiencia
        </a>
      </div>
    </header>
  );
}
