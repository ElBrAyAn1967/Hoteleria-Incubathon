"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BrandBar } from "@/components/ui/BrandBar";
import { ServiceSummaryCard } from "@/components/ui/ServiceSummaryCard";
import { StarRating } from "@/components/ui/StarRating";
import { TextAreaField } from "@/components/ui/FormField";
import type { FeedbackData } from "@/types/tourist-flow";

// Captura de reseña — privada/interna (no pública), tal como define
// docs/specs/SPEC_CASO_USO_TURISMO.md. Requiere calificación antes de enviar.
export default function FeedbackPage() {
  const router = useRouter();
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (calificacion === 0) {
      setError("Selecciona al menos una estrella antes de enviar.");
      return;
    }
    setError(undefined);
    const feedback: FeedbackData = { reservaId: "demo-001", calificacion, comentario };
    sessionStorage.setItem("navigox_feedback", JSON.stringify(feedback));
    setEnviado(true);
  }

  if (enviado) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
        <p className="text-4xl" aria-hidden="true">
          🌿
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink">¡Gracias por tu reseña!</h1>
        <p className="max-w-sm text-sm text-muted">
          Tu opinión es privada y ayuda a que el próximo viajero elija mejor a su anfitrión.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 bg-surface px-6 py-10">
      <BrandBar back="/itinerary" label="Mi itinerario" />
      <h1 className="font-display text-2xl font-semibold text-ink">Califica tu experiencia</h1>

      <ServiceSummaryCard titulo="Cocina de mercado con Lucía" subtitulo="Puerto Escondido · completado" />

      <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-3xl bg-bg p-6 shadow-sm">
        <div>
          <p className="mb-3 text-sm font-medium text-ink">¿Cómo estuvo tu experiencia?</p>
          <StarRating value={calificacion} onChange={setCalificacion} />
          {error && (
            <p role="alert" className="mt-2 text-xs text-accent-deep">
              {error}
            </p>
          )}
        </div>

        <TextAreaField
          label="Cuéntanos más (opcional)"
          value={comentario}
          onChange={setComentario}
          placeholder="¿Qué fue lo que más disfrutaste?"
          rows={5}
        />

        <button type="submit" className="btn-primary w-full justify-center">
          Enviar reseña
        </button>
      </form>
    </main>
  );
}
