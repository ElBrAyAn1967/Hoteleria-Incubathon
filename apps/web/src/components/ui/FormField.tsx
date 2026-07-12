"use client";

import { useId, type ReactNode } from "react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 4, required, error }: TextAreaFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true" className="text-accent"> *</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-2xl border border-surface bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-accent-deep">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  error?: string;
  type?: string;
}

export function TextField({ label, value, onChange, placeholder, icon, required, error, type = "text" }: TextFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true" className="text-accent"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-full border border-surface bg-bg py-3 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary ${
            icon ? "pl-11" : "pl-4"
          }`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-accent-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export function Divider() {
  return <hr className="my-8 border-t border-primary/20" />;
}
