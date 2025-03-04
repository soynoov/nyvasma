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
      raza: 'Tiefling',
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
      raza: 'Aasimar',
      clase: 'Mago',
      exp: 435,
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
  ]);
}
