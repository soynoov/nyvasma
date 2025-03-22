import { db, Jugadores, Razas, Clases, Trasfondos } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db
    .insert(Razas)
    .values([{ name: 'Tiefling' }, { name: 'Aasimar', volar: 60 }]);
  await db.insert(Clases).values([
    { name: 'Mago', dados_golpe: 6, competencias: [] },
    { name: 'Bardo', dados_golpe: 8, competencias: ['DES', 'CAR'] },
  ]);
  await db
    .insert(Trasfondos)
    .values([{ name: 'Artista', competencias: ['Historia', 'Medicina'] }]);

  await db.insert(Jugadores).values([
    {
      name: 'Lirael Lira',
      age: 20,
      raza: 'Tiefling',
      height: 1.68,
      weight: 53,
      clase: 'Bardo',
      alineamiento: 'Caótico Bueno',
      trasfondo: 'Artista',
      stats: {
        fue: 10,
        des: 14,
        con: 12,
        int: 14,
        sab: 10,
        car: 16,
      },
    },
    {
      name: 'Nyliss Avacynn',
      age: 83,
      height: 1.79,
      weight: 72,
      raza: 'Aasimar',
      clase: 'Mago',
      xp: 435,
      alineamiento: 'Caótico Malo',
      trasfondo: 'Artista',
      stats: {
        fue: 10,
        des: 16,
        con: 10,
        int: 16,
        sab: 14,
        car: 10,
      },
    },
    {
      nombre: 'Aus',
      raza: 'Undead',
      clase: 'Guerrero',
      trasfondo: 'Soldado',
      alineamiento: ['Caótico', 'Neutral'],
      experiencia: 23000,
      estadisticas: {
        fuerza: 24,
        destreza: 12,
        constitucion: 18,
        inteligencia: 12,
        sabiduria: 11,
        carisma: 5,
      },
      armas: ['Lanza de Caballería', 'Hacha'],
      mochila: {
        monedero: {
          pc: 2,
          pp: 1,
          pe: 0,
          po: 0,
          ppt: 0,
        },
        objetos: {
          comun: [
            'Cuerno de Minotauro',
            'Dados de Hueso',
            'Ropa Común',
            'Calabaza',
          ],
          poco_comun: ['Mapa', 'Martillo'],
          raro: [],
          epico: [],
          legendario: ['Hexcore'],
        },
      },
    },
  ]);
}
