"use client";

// ─────────────────────────────────────────────────────────────────────────────
// TrackingProvider — captura AUTOMÁTICA del journey
// ─────────────────────────────────────────────────────────────────────────────
// Se monta UNA vez en el layout raíz y traza sin cablear pantalla por pantalla:
//   • page_view + tiempo en cada pantalla (al cambiar de ruta)
//   • profundidad máxima de scroll por pantalla
//   • clicks en cualquier elemento con atributo data-track="etiqueta"
//   • flush garantizado al ocultar/cerrar la pestaña
// Todo va a nuestro endpoint interno /api/track (mismo dominio, un hilo por sesión).
//
// Para trazar un click nuevo: añade data-track="lo_que_sea" al elemento. Nada más.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track, flush } from "@/lib/track";

export function TrackingProvider() {
  const pathname = usePathname();
  const entrada = useRef<number>(Date.now());
  const scrollMax = useRef<number>(0);

  // page_view + tiempo en la pantalla anterior + reset de scroll, en cada cambio de ruta.
  useEffect(() => {
    const ahora = Date.now();
    const segundos = Math.round((ahora - entrada.current) / 1000);
    // Al entrar a una ruta nueva, cerramos la anterior (si hubo tiempo medible).
    if (segundos > 0) {
      track("page_time", {
        meta: { segundos, scrollPct: scrollMax.current },
      });
    }
    entrada.current = ahora;
    scrollMax.current = 0;
    track("page_view", { ruta: pathname });
  }, [pathname]);

  // Scroll: guardamos la profundidad máxima alcanzada (%).
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const alcance = doc.scrollTop + window.innerHeight;
      const total = doc.scrollHeight || 1;
      const pct = Math.min(100, Math.round((alcance / total) * 100));
      if (pct > scrollMax.current) scrollMax.current = pct;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clicks: delegación global. Solo trazamos elementos marcados con data-track.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-track]");
      if (!el) return;
      track("click", {
        ruta: pathname,
        etiqueta: el.getAttribute("data-track") || "sin-etiqueta",
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  // Flush garantizado al ocultar/cerrar la pestaña (no perder el final del journey).
  useEffect(() => {
    function onHide() {
      if (document.visibilityState === "hidden") {
        const segundos = Math.round((Date.now() - entrada.current) / 1000);
        track("page_time", { meta: { segundos, scrollPct: scrollMax.current } });
        flush(true); // sendBeacon
      }
    }
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", () => flush(true));
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  return null; // no renderiza nada
}
