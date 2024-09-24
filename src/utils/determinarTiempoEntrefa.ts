export async function determineTiempoEntrega(
  fecha_culminacion: any,
  fecha_avalado: any
) {
  // Definir las fechas
  const fecha1: any = new Date(fecha_culminacion);
  const fecha2: any = fecha_avalado;

  // Restar las fechas y obtener la diferencia en milisegundos
  const diferenciaEnMilisegundos = fecha2 - fecha1;
  console.log(fecha1, fecha_avalado);

  // Convertir la diferencia a días
  const diferenciaEnDias = Math.floor(
    diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
  );
  console.log(diferenciaEnMilisegundos);

  // Variable para almacenar el estado
  let entrega = null;
  if (diferenciaEnMilisegundos < 0) {
    entrega = "Pro"; // Si la diferencia es negativa
  } else if (diferenciaEnDias === 0) {
    entrega = "Bien hecho"; // Si la diferencia es cero
  } else {
    entrega = "Atraso"; // Si la diferencia es positiva
  }
  console.log(entrega);
  console.log(`La diferencia es de ${diferenciaEnDias} días. Estado: `);
  return entrega;
}
