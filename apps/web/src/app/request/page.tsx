"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { TextField, TextAreaField, Divider } from "@/components/ui/FormField";
import type { QuoteRequest } from "@/types/tourist-flow";

type Errors = Partial<Record<"servicio" | "ubicacion" | "presupuesto", string>>;

// Formulario de cotización — 3 pasos verticales sobre una tarjeta centralizada.
// Validación simple client-side antes de "enviar" (mock: navega a /itinerary).
export default function RequestPage() {
  const router = useRouter();
  const [servicio, setServicio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [usarUbicacionActual, setUsarUbicacionActual] = useState(false);
  const [presupuesto, setPresupuesto] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [enviando, setEnviando] = useState(false);

  function validar(): Errors {
    const next: Errors = {};
    if (servicio.trim().length < 10) {
      next.servicio = "Cuéntanos con un poco más de detalle qué experiencia buscas (mínimo 10 caracteres).";
    }
    if (!usarUbicacionActual && ubicacion.trim().length < 3) {
      next.ubicacion = "Indica tu hotel/zona o usa tu ubicación actual.";
    }
    const monto = Number(presupuesto);
    if (!presupuesto || Number.isNaN(monto) || monto <= 0) {
      next.presupuesto = "Ingresa un presupuesto válido en MXN.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validar();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const request: QuoteRequest = {
      servicio,
      ubicacion: usarUbicacionActual ? "Ubicación actual" : ubicacion,
      usarUbicacionActual,
      presupuestoMXN: Number(presupuesto),
    };
    setEnviando(true);
    // Mock: en producción esto llamaría a apps/api. Por ahora navegamos directo
    // al itinerario simulado, guardando solo lo necesario para la demo.
    sessionStorage.setItem("navigox_quote", JSON.stringify(request));
    router.push("/itinerary");
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface px-4 py-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="form-card mx-auto max-w-lg rounded-3xl bg-bg p-8 shadow-lg"
      >
        <h1 className="font-display text-2xl font-semibold text-primary">Solicita tu cotización</h1>
        <p className="mt-1 text-sm text-muted">Tres datos rápidos y un anfitrión te responde en minutos.</p>

        <div className="mt-8">
          <TextAreaField
            label="¿Qué experiencia buscas?"
            value={servicio}
            onChange={setServicio}
            placeholder="Ej. Un tour de comida callejera con alguien que conozca los puestos locales…"
            required
            error={errors.servicio}
          />
        </div>

        <Divider />

        <div>
          <TextField
            label="Ubicación"
            value={ubicacion}
            onChange={setUbicacion}
            placeholder="Hotel, colonia o zona"
            required={!usarUbicacionActual}
            error={errors.ubicacion}
            icon={<IconPin />}
          />
          <button
            type="button"
            onClick={() => setUsarUbicacionActual((v) => !v)}
            aria-pressed={usarUbicacionActual}
            className={`mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              usarUbicacionActual
                ? "border-accent bg-accent text-bg"
                : "border-surface text-ink hover:border-accent"
            }`}
          >
            <IconLocate />
            Usar ubicación actual
          </button>
        </div>

        <Divider />

        <div>
          <TextField
            label="Presupuesto (MXN)"
            value={presupuesto}
            onChange={setPresupuesto}
            placeholder="800"
            type="number"
            required
            error={errors.presupuesto}
            icon={<span aria-hidden="true">$</span>}
          />
        </div>

        <button type="submit" disabled={enviando} className="btn-primary mt-9 w-full justify-center disabled:opacity-60">
          {enviando ? "Enviando…" : (
            <>
              Enviar solicitud
              <IconSend />
            </>
          )}
        </button>
      </form>
      </main>
    </>
  );
}

function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function IconLocate() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}
