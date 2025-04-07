import { getChosen } from '@/ts/get-id';

export async function getLevel(id: number) {
  try {
    // Esperamos la respuesta de getChosen
    const chosen = await getChosen(id);
    let xp = chosen.experiencia || 0;

    // Inicializamos el nivel en 1
    let nivel = 1;
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
    if (nivel < metas.length - 1 && xp >= metas[nivel - 1]) {
      bar = ((xp - metas[nivel - 1]) / (meta - metas[nivel - 1])) * 100;
    }

    // Si XP es mayor o igual al umbral del nivel 20, forzamos el nivel 20
    if (xp >= metas[19]) {
      nivel = 20;
      bar = 100;
    }

    return { nivel, meta, bar };
  } catch (error) {
    console.error('Error en getLevel:', error);
    return { nivel: 1, meta: 300, bar: 0 }; // Retorno seguro en caso de fallo
  }
}
