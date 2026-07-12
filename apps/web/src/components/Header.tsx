import Link from "next/link";
import { brand } from "@/content/brand";

// Header — limpio, color primario sobre blanco cálido. Logo con marca tipográfica,
// nav discreta, un solo CTA con peso. Los links llevan a los flujos reales del producto.
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/5 bg-bg/85 backdrop-blur-md">
      <div className="container-content flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-primary">
          {brand.siteName}
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {brand.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/request" className="btn-primary !py-2 !px-5 text-sm">
          {brand.header.cta}
        </Link>
      </div>
    </header>
  );
}
