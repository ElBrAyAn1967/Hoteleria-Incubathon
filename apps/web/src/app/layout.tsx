import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Roboto } from "next/font/google";
import { brand } from "@/content/brand";
import { TrackingProvider } from "@/components/TrackingProvider";
import "./globals.css";

// Tipografía NavigoX (docs/design/brand_kit.md): Inter (titulares) + Roboto (cuerpo).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: brand.meta.title,
  description: brand.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        {/* Trazabilidad automática del journey → nuestra API (caja negra For3s). */}
        <Suspense fallback={null}>
          <TrackingProvider />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
