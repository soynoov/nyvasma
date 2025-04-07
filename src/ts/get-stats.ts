export function getComp(level: number) {
  if (level >= 17) return 6;
  else if (level >= 13) return 5;
  else if (level >= 9) return 4;
  else if (level >= 5) return 3;
  else return 2;
}

// Ejemplo de uso
console.log(getComp(1)); // 2
console.log(getComp(5)); // 3
console.log(getComp(9)); // 4
console.log(getComp(13)); // 5
console.log(getComp(17)); // 6

// Recoger las Stats
import { getChosen } from './get-id';
export async function getStats(id: number) {
  const chosen = await getChosen(id);
  const stats = chosen.estadisticas;

  return stats;
}

// Ahora con las Stats
export function getCompStat(stat: number) {
  let competencia: number = 0;

  if (stat > 10) {
    competencia = Math.floor((stat - 10) / 2); // Ajustado el cálculo aquí
  } else if (stat > 0 && stat <= 10) {
    competencia = -Math.ceil((10 - stat) / 2);
  } else if (stat <= 0) {
    competencia = -5;
  }

  if (competencia >= 0) {
    return `+${competencia}`;
  }

  return competencia;
}

export function getTotalCompStat(comps: string[], level: number) {
  const todas = [
    'fuerza',
    'destreza',
    'constitucion',
    'inteligencia',
    'sabiduria',
    'carisma',
  ];

  const bonus = getComp(level);
  const resultado: Record<string, boolean> = {};

  for (const nombre of todas) {
    resultado[nombre] = comps.includes(nombre) ? bonus : 0;
  }

  return resultado;
}

export function sum(arr: number[] = []): number {
  let total = 0;
  for (const n of arr) {
    total += n;
  }
  return total;
}
