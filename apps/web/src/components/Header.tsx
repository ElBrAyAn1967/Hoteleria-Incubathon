"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/content/brand";

// Header — limpio, color primario sobre blanco cálido. Logo con marca tipográfica,
// nav discreta, un solo CTA con peso. Los links llevan a los flujos reales del producto.
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/5 bg-bg/85 backdrop-blur-md">
      <div className="site-header-inner">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-primary">
          {brand.siteName}
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {brand.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`site-header-link text-sm transition-colors hover:text-ink ${pathname === l.href ? "is-active" : "text-muted"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        {pathname !== "/request" && (
          <Link href="/request" className="btn-primary !py-1.5 !px-4 text-sm" data-track="header_cta">
            {brand.header.cta}
          </Link>
        )}
      </div>
    </header>
  );
}
