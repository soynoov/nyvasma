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

// Esta función calcula el modificador de competencia (o "modificador de habilidad")
// basado en el valor de una estadística (`stat`) y devuelve una cadena formateada
// con signo positivo si el modificador es cero o mayor, o el número negativo directamente.
export function getCompStat(stat: number): string | number {
  // Inicializamos el modificador de competencia en 0
  let competencia: number = 0;

  // Si la estadística es mayor que 10, calculamos el modificador
  // como el piso de ((stat - 10) / 2). Por ejemplo, stat = 14 → (14 - 10)/2 = 2 → floor(2) = 2
  if (stat > 10) {
    competencia = Math.floor((stat - 10) / 2); // Ajuste clásico de D&D
  }
  // Si la estadística está entre 1 y 10 inclusive, calculamos un modificador negativo
  // usando el techo de ((10 - stat) / 2), luego lo hacemos negativo.
  // Por ejemplo, stat = 8 → (10 - 8)/2 = 1 → ceil(1) = 1 → -1
  else if (stat > 0 && stat <= 10) {
    competencia = -Math.ceil((10 - stat) / 2);
  }
  // Si la estadística es cero o negativa, establecemos un modificador fijo de -5
  else if (stat <= 0) {
    competencia = -5;
  }

  // Formateamos la salida: si el modificador es cero o positivo, le anteponemos '+'
  if (competencia >= 0) {
    return `+${competencia}`; // e.g. "+2" o "+0"
  }

  // Para modificadores negativos, devolvemos el número directamente (con el signo '-')
  return competencia; // e.g. -1, -2, -5
}

// Esta función calcula los valores totales de competencia para cada estadística base,
// dependiendo del nivel y de las competencias indicadas como activas.
export function getTotalCompStat(comps: string[], level: number) {
  // Lista con todas las estadísticas posibles de un personaje.
  const todas = [
    'fuerza',
    'destreza',
    'constitucion',
    'inteligencia',
    'sabiduria',
    'carisma',
  ];

  // Se obtiene el bonificador de competencia correspondiente al nivel del personaje.
  const bonus = getComp(level);

  // Se inicializa un objeto para guardar los resultados.
  // Cada estadística tendrá un valor booleano (aunque esto parece un error, ver más abajo).
  const resultado: Record<string, number> = {};

  // Recorremos todas las estadísticas...
  for (const nombre of todas) {
    // Si la estadística está en la lista de competencias activas (`comps`),
    // se le asigna el bonus de competencia, si no, se le asigna 0.
    resultado[nombre] = comps.includes(nombre) ? bonus : 0;
  }

  // Devolvemos el objeto con los valores totales de competencia.
  return resultado;
}

export function sum(arr: number[] = []): number {
  let total = 0;
  for (const n of arr) {
    total += n;
  }
  return total;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Obtiene el modificador de competencia formateado para una estadística concreta de un personaje.
 *
 * @param id – ID del personaje
 * @param stat – Código corto de la estadística (se toman las 3 primeras letras de cada estadística)
 *               'fue'|'des'|'con'|'int'|'sab'|'car'
 * @returns El modificador de competencia (p.ej. "+2", "-1", etc.)
 * @throws Error si se pasa un código de estadística inválido
 */
export async function getStatModifier(
  id: number,
  stat: 'fue' | 'des' | 'con' | 'int' | 'sab' | 'car'
): Promise<number> {
  // 1. Obtenemos las estadísticas base y, opcionalmente, las adicionales
  const stats = (await getStats(id)) as {
    base: Record<
      | 'fuerza'
      | 'destreza'
      | 'constitucion'
      | 'inteligencia'
      | 'sabiduria'
      | 'carisma',
      number
    >;
    // Ahora 'adicional' puede no existir, o ser un objeto vacío
    adicional?: Record<
      | 'fuerza'
      | 'destreza'
      | 'constitucion'
      | 'inteligencia'
      | 'sabiduria'
      | 'carisma',
      number[]
    >;
  };

  // 2. Mapeo dinámico de los 3 primeros caracteres → nombre completo
  const names = [
    'fuerza',
    'destreza',
    'constitucion',
    'inteligencia',
    'sabiduria',
    'carisma',
  ] as const;
  const map3 = Object.fromEntries(
    names.map((n) => [n.slice(0, 3), n])
  ) as Record<string, (typeof names)[number]>;

  const key = map3[stat];
  if (!key) throw new Error(`Estadística inválida: ${stat}`);

  // 3. Calculamos el total: base + (si existen) adicionales
  const baseValue = stats.base[key];
  // Si stats.adicional es undefined o no tiene la clave, caemos a []
  const adicionales = stats.adicional?.[key] ?? [];
  const total = baseValue + adicionales.reduce((a, b) => a + b, 0);

  // 4. Calculamos el modificador numérico
  if (total > 10) {
    return Math.floor((total - 10) / 2);
  } else if (total > 0) {
    return -Math.ceil((10 - total) / 2);
  } else {
    return -5;
  }
}
