import { BrandBar } from "@/components/ui/BrandBar";

// Encabezado del panel del anfitrión. Usa los tokens de marca (ink/muted/display)
// para que se sienta igual que la landing, y la BrandBar da retorno a la home.
export function BookingHeader({ nombre }: { nombre: string }) {
  return (
    <header>
      <BrandBar back="/experience" label="Mis experiencias" />
      <h1 className="font-display text-4xl font-extrabold text-ink">Agenda</h1>
      <p className="mt-1 font-display text-2xl text-muted">Hey, {nombre}</p>
    </header>
  );
}
