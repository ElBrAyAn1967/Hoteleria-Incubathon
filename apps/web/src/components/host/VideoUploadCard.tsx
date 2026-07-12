"use client";

import { useState } from "react";

// Zona de carga/reproducción de video simulada — sin backend de storage aún.
// Borde punteado se vuelve negro sólido en hover (afordance de "soltar aquí").
export function VideoUploadCard() {
  const [reproduciendo, setReproduciendo] = useState(false);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-900">
      <div className="flex h-full w-full items-center justify-center">
        {reproduciendo ? (
          <p className="text-sm text-gray-500" role="status">
            Reproduciendo vista previa…
          </p>
        ) : (
          <p className="text-sm text-gray-500">Arrastra tu video aquí o toca para subir</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setReproduciendo((v) => !v)}
        aria-label={reproduciendo ? "Pausar vista previa" : "Reproducir vista previa"}
        className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900/80 text-white backdrop-blur-sm transition-transform hover:scale-105"
      >
        {reproduciendo ? <IconPause /> : <IconPlay />}
      </button>
    </div>
  );
}

function IconPlay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
