import { getChosen } from '@/ts/get-id';

export async function getLevel(id: number) {
  try {
    // Esperamos la respuesta de getChosen
    const chosen = await getChosen(id);
    let xp = chosen.experiencia || 0;

    // Inicializamos el nivel en 1
    let level = 1;
    const metas = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
      120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
    ];

    // Determinamos el nivel en base a los límites
    while (level < metas.length - 1 && xp >= metas[level]) {
      level++;
    }

    // Determinamos el límite del próximo nivel
    const meta = metas[level];

    // Calculamos el porcentaje de XP en el nivel actual
    let bar = 0;
    if (level < metas.length - 1 && xp >= metas[level - 1]) {
      bar = ((xp - metas[level - 1]) / (meta - metas[level - 1])) * 100;
    }

    // Si XP es mayor o igual al umbral del nivel 20, forzamos el nivel 20
    if (xp >= metas[19]) {
      level = 20;
      bar = 100;
    }

    return { level, meta, bar };
  } catch (error) {
    console.error('Error en getLevel:', error);
    return { level: 1, meta: 300, bar: 0 }; // Retorno seguro en caso de fallo
  }
}
