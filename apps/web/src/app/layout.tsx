import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { brand } from "@/content/brand";
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
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
