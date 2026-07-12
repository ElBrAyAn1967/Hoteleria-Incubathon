"use client";

import type { TaskItem } from "@/types/tourist-flow";

interface TaskItemCardProps {
  tarea: TaskItem;
  onToggle: (id: string) => void;
}

export function TaskItemCard({ tarea, onToggle }: TaskItemCardProps) {
  return (
    <li className="flex items-start gap-3 rounded-2xl bg-bg p-4 shadow-sm">
      <button
        type="button"
        role="checkbox"
        aria-checked={tarea.completado}
        aria-label={`Marcar "${tarea.titulo}" como ${tarea.completado ? "pendiente" : "completada"}`}
        onClick={() => onToggle(tarea.id)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          tarea.completado ? "border-primary bg-primary text-bg" : "border-muted"
        }`}
      >
        {tarea.completado && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </button>
      <div className={tarea.completado ? "opacity-60" : undefined}>
        <p className="text-xs font-medium text-accent">{tarea.hora}</p>
        <h4 className={`font-display text-sm font-semibold text-ink ${tarea.completado ? "line-through" : ""}`}>
          {tarea.titulo}
        </h4>
        <p className="text-sm text-muted">{tarea.detalle}</p>
      </div>
    </li>
  );
}
