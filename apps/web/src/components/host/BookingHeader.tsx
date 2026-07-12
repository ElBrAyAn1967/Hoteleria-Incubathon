export function BookingHeader({ nombre }: { nombre: string }) {
  return (
    <header>
      <h1 className="text-4xl font-extrabold text-gray-900">Agenda</h1>
      <p className="mt-1 text-2xl text-gray-700">Hey, {nombre}</p>
    </header>
  );
}
