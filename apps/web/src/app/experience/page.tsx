import { MediaTextBlock } from "@/components/host/MediaTextBlock";
import { VideoUploadCard } from "@/components/host/VideoUploadCard";
import type { MediaTextBlockData } from "@/types/host-flow";

const bloques: MediaTextBlockData[] = [
  {
    id: "1",
    titulo: "Muestra tu especialidad",
    descripcion: "Una foto o video corto de lo que haces mejor — eso es lo que va a convencer.",
  },
  {
    id: "2",
    titulo: "Cuenta tu historia",
    descripcion: "Unas líneas sobre quién eres y por qué conoces este lugar como nadie más.",
  },
  {
    id: "3",
    titulo: "El lugar exacto",
    descripcion: "Dónde ocurre la experiencia — así el viajero sabe qué esperar.",
  },
];

// Carga de experiencia del anfitrión — misma paleta neutra que /booking.
export default function ExperiencePage() {
  return (
    <main className="space-y-10 bg-white px-6 py-8">
      <header>
        <h1 className="text-4xl font-extrabold text-gray-900">Sube tu experiencia</h1>
        <p className="mt-1 text-sm text-gray-500">Así la va a ver el viajero antes de reservar contigo.</p>
      </header>

      <VideoUploadCard />

      <section aria-label="Detalles de tu experiencia" className="space-y-8">
        {bloques.map((b, i) => (
          <MediaTextBlock key={b.id} data={b} reverse={i % 2 === 1} />
        ))}
      </section>

      <button type="button" className="w-full rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white">
        Publicar experiencia
      </button>
    </main>
  );
}
