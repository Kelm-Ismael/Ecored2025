export const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
  const anio = String(fecha.getFullYear()).slice(-2); // Solo últimos dos dígitos
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};

export const formatearFechaSinHora = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
  const anio = String(fecha.getFullYear()).slice(-2); 

  return `${dia}/${mes}/${anio}`;
};