import { db, Jugadores, Razas, Clases, Trasfondos } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Razas).values([{ nombre: 'Tiefling', velocidad: 30 }]);
  await db.insert(Clases).values([
    { nombre: 'Mago', dados_golpe: 6 },
    { nombre: 'Bardo', dados_golpe: 6 },
  ]);
  await db
    .insert(Trasfondos)
    .values([{ nombre: 'Artista', competencias: ['Historia', 'Medicina'] }]);

  await db.insert(Jugadores).values([
    {
      nombre: 'Lirael Lira',
      raza: 'Tiefling',
      clase: 'Bardo',
      alineamiento: 'Caótico Bueno',
      trasfondo: 'Artista',
      estadisticas: {
        fue: 10,
        des: 14,
        con: 12,
        int: 14,
        sab: 10,
        car: 16,
      },
    },
    {
      nombre: 'Nyliss Avacynn',
      raza: 'Tiefling',
      clase: 'Mago',
      alineamiento: 'Caótico Malo',
      trasfondo: 'Artista',
      estadisticas: {
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
