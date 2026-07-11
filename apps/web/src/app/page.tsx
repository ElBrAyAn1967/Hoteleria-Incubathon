import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Como } from "@/components/Como";
import { Anfitriones } from "@/components/Anfitriones";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

// Landing rediseñada con impeccable: verde mate + blanco cálido, serif display,
// narrativa (no scaffold 01/02/03), tarjetas de anfitriones con carácter.
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Como />
      <Anfitriones />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
