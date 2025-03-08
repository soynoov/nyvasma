export function getComp(level: number): number {
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

// Ahora con las Stats
export function getCompStat(stat: number) {}
