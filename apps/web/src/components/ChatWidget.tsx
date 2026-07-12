"use client";

// Widget de chat flotante — atención al cliente dirigida por For3s (caja negra).
// 🔒 CLAVE: este componente llama SOLO a NUESTRO backend (/chat), jamás a For3s
// directo. La URL/llave de For3s viven en el servidor; el navegador nunca las ve.
// Aquí no hay NADA de For3s: solo un fetch a nuestra API. Cero exposición.
import { useEffect, useRef, useState } from "react";
import { brand } from "@/content/brand";

// Llama a la API Route de Next (mismo dominio) → funciona igual en local y en Vercel,
// y mantiene la caja negra (la llave de For3s vive server-side en /api/chat).
const CHAT_ENDPOINT = "/api/chat";

type Msg = { rol: "bot" | "yo"; texto: string };

// id anónimo por navegador (continuidad del hilo, sin datos personales)
function clientId(): string {
  if (typeof window === "undefined") return "web";
  const key = brand.chat.clientIdStorageKey;
  let id = localStorage.getItem(key);
  if (!id) {
    id = "web-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(key, id);
  }
  return id;
}

export function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { rol: "bot", texto: brand.chat.greeting },
  ]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, abierto]);

  async function enviar() {
    const t = texto.trim();
    if (!t || cargando) return;
    setMsgs((m) => [...m, { rol: "yo", texto: t }]);
    setTexto("");
    setCargando(true);
    try {
      const r = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t, clientId: clientId() }),
      });
      const data = await r.json();
      setMsgs((m) => [...m, { rol: "bot", texto: data.reply ?? "…" }]);
    } catch {
      setMsgs((m) => [...m, { rol: "bot", texto: brand.chat.errorReply }]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      {/* Botón flotante de robot (abajo a la derecha) */}
      <button
        aria-label="Abrir chat de concierge"
        onClick={() => setAbierto((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-bg shadow-[0_10px_30px_-8px_rgba(var(--shadow-ink),0.6)] transition-transform duration-300 ease-out-expo hover:-translate-y-1"
      >
        {abierto ? <IconClose /> : <IconRobot />}
      </button>

      {/* Panel de chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[30rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-bg shadow-[0_24px_60px_-20px_rgba(var(--shadow-ink),0.35)]">
          <header className="flex items-center gap-3 bg-primary px-5 py-4 text-bg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg/15">
              <IconRobot />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{brand.chat.panelTitle}</p>
              <p className="text-xs text-bg/70">{brand.chat.panelSubtitle}</p>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.rol === "yo" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                    m.rol === "yo"
                      ? "bg-primary text-bg"
                      : "bg-bg text-ink shadow-sm"
                  }`}
                >
                  {m.texto}
                </div>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-bg px-3.5 py-2 text-sm text-muted shadow-sm">
                  escribiendo…
                </div>
              </div>
            )}
            <div ref={finRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-ink/10 bg-bg p-3">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviar()}
              placeholder={brand.chat.placeholder}
              className="flex-1 rounded-full bg-surface px-4 py-2 text-sm text-ink outline-none placeholder:text-muted"
            />
            <button
              onClick={enviar}
              disabled={cargando}
              aria-label="Enviar"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-bg transition-transform hover:scale-105 disabled:opacity-50"
            >
              <IconSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// — íconos inline (sin dependencias) —
function IconRobot() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2 12v3M22 12v3" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l16-7-7 16-2-7-7-2z" />
    </svg>
  );
}
