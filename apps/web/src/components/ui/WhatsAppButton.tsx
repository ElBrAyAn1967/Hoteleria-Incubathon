// Verde de WhatsApp: color de la plataforma, no de nuestra marca — se mantiene
// literal a propósito (así se reconoce como "abre WhatsApp").
export function WhatsAppButton({ label = "Mandar WhatsApp" }: { label?: string }) {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-bg shadow-lg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
    >
      <IconWhatsApp />
      {label}
    </a>
  );
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 13.98c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.03.13-3.3-.69-2.79-1.02-4.6-3.85-4.74-4.03-.14-.18-1.13-1.5-1.13-2.86s.71-2.03.96-2.3c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.8 2 .87 2.15.07.14.11.31.02.5-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.21 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.66-.17 1.35z" />
    </svg>
  );
}
