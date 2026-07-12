interface AvatarProps {
  nombre: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-9 w-9 text-sm", md: "h-12 w-12 text-base", lg: "h-16 w-16 text-lg" };

// Avatar circular con iniciales — sin dependencia de assets de foto real.
export function Avatar({ nombre, size = "md" }: AvatarProps) {
  const iniciales = nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      role="img"
      aria-label={`Avatar de ${nombre}`}
      className={`flex ${sizes[size]} shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface font-display font-semibold text-primary`}
    >
      {iniciales}
    </div>
  );
}
