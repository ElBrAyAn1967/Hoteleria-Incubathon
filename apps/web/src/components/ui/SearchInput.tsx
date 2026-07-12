"use client";

import { useId } from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}

export function SearchInput({ placeholder = "Buscar experiencias…", value, onChange }: SearchInputProps) {
  const id = useId();
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Buscar
      </label>
      <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-transparent bg-surface py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:bg-bg"
      />
    </div>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
