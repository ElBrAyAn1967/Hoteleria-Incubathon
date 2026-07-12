import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

// Tipografía Atlas Nexus (docs/design/brand_kit.md): Inter (titulares) + Roboto (cuerpo).
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
  title: "Anfitriones — vive la ciudad con quien la vive",
  description:
    "Conecta con una persona local real que te muestra su ciudad. Experiencias curadas, humanas, no un catálogo.",
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
