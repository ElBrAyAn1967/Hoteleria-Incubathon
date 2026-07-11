// Tipos compartidos entre frontend y backend (evita duplicar contratos).
// Se irán poblando conforme se defina el schema de datos (ver issue de DB).

/** Un anfitrión local — el corazón del producto (su perfil ES la experiencia). */
export interface Anfitrion {
  id: string;
  nombre: string;
  bio: string;
  especialidad: string; // ej. "arquitectura porfiriana", "gastronomía de barrio"
  aniosExperiencia?: number;
  disponibilidad?: string; // puede ser estacional, ej. "julio-agosto"
  zona: string;
  fotoUrl?: string;
}

/** Una experiencia ofrecida por un anfitrión. */
export interface Experiencia {
  id: string;
  anfitrionId: string;
  titulo: string;
  descripcion: string;
  duracionHoras?: number;
  precioMXN?: number; // opcional: algunas son "cotiza"
}
