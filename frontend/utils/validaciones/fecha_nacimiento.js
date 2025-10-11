export function esFechaValida(dia, mes, anio) {
  const day = parseInt(dia, 10);
  const month = parseInt(mes, 10);
  const year = parseInt(anio, 10);

  // Verifica que todos los valores sean números válidos
  if (
    isNaN(day) || isNaN(month) || isNaN(year) ||
    dia.length === 0 || mes.length === 0 || anio.length === 0
  ) return false;

  // Rango básico
  if (
    day < 1 || day > 31 ||
    month < 1 || month > 12 ||
    year < 1900 || 2020
  ) return false;

  // Fecha válida en el calendario
  const fecha = new Date(year, month - 1, day); // ⚠️ mes base 0
  return (
    fecha.getFullYear() === year &&
    fecha.getMonth() + 1 === month &&
    fecha.getDate() === day
  );
}
