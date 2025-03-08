// Función para Calcula el Nivel y los Thresholds (Limites)
export function calculateLevel(xp: number) {
  // Necesito que agarres el numero de XP, y con ese dato, alteres o generes una variable level.
  // Se necesita también calcular los TresHolds. Ejemplo: El treshold del nivel 1 es 300, de nivel 2 es 900...

  // DEEP AI
  // Inicializamos el nivel en 1
  let nivel = 1; // Aquí el nivel comienza desde 1
  // Límites según el avance de nivel
  const metas = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
    120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
  ];

  // Determinamos el nivel en base a los límites
  while (nivel < metas.length - 1 && xp >= metas[nivel]) {
    nivel++;
  }

  // Determinamos el límite del próximo nivel
  const meta = metas[nivel];

  // Calculamos el porcentaje de XP en el nivel actual
  let bar = 0;
  if (nivel < metas.length - 1) {
    // Si no estamos en el último nivel, calculamos el porcentaje
    if (xp >= metas[nivel - 1]) {
      bar = ((xp - metas[nivel - 1]) / (meta - metas[nivel - 1])) * 100;
    }
  }

  // Nivel 20
  if (xp >= metas[19]) {
    nivel = 20;
    bar = 100;
  }

  // Mostrar la información de depuración
  console.log('Nivel: ' + nivel);
  console.log('Meta: ' + meta);
  console.log('XP Bar: ' + xp);
  console.log('Porcentaje: ' + bar + '%'); // %

  return {
    nivel,
    meta,
    bar,
  };
}
