interface ServiceSummaryCardProps {
  titulo: string;
  subtitulo: string;
}

export function ServiceSummaryCard({ titulo, subtitulo }: ServiceSummaryCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-bg p-5 shadow-sm">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
        aria-hidden="true"
      >
        <IconCheck />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{titulo}</h3>
        <p className="text-sm text-muted">{subtitulo}</p>
      </div>
    </div>
  );
}

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
