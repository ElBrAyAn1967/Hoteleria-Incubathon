"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (v: number) => void;
}

// Ámbar es semántico de calificación (convención universal), no color de marca.
export function StarRating({ value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const activo = hover || value;

  return (
    <div role="radiogroup" aria-label="Calificación de 1 a 5 estrellas" className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} de 5 estrellas`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onFocus={() => setHover(n)}
          onBlur={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <StarIcon filled={n <= activo} />
        </button>
      ))}
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={filled ? "text-amber-400" : "text-muted"}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z"
      />
    </svg>
  );
}
