import { db, Jugadores, Razas, Clases, Trasfondos } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db
    .insert(Razas)
    .values([
      { nombre: 'Tiefling' },
      { nombre: 'Aasimar', volar: 60 },
      { nombre: 'Undead' },
      { nombre: 'Kenku' },
    ]);

  await db.insert(Clases).values([
    {
      nombre: 'Mago',
      dados_golpe: 6,
      competencias: ['inteligencia', 'sabiduria'],
    },
    { nombre: 'Bardo', dados_golpe: 8, competencias: ['destreza', 'carisma'] },
    {
      nombre: 'Guerrero',
      dados_golpe: 10,
      competencias: ['fuerza', 'constitucion'],
    },
    {
      nombre: 'Brujo',
      dados_golpe: 8,
      competencias: ['fuerza', 'constitucion'],
    },
  ]);

  await db.insert(Trasfondos).values([
    { nombre: 'Artista', competencias: ['Historia', 'Medicina'] },
    { nombre: 'Soldado', competencias: ['Historia', 'Medicina'] },
    { nombre: 'Huerfano', competencias: ['Historia', 'Medicina'] },
  ]);

  await db.insert(Jugadores).values([
    {
      nombre: 'Lirael Lira',
      edad: 20,
      raza: 'Tiefling',
      altura: 1.68,
      peso: 53,
      clase: 'Bardo',
      alineamiento: 'Caótico Bueno',
      trasfondo: 'Artista',
      estadisticas: {
        base: {
          fuerza: 6,
          destreza: 14,
          constitucion: 12,
          inteligencia: 14,
          sabiduria: 0,
          carisma: 16,
        },
      },
    },
    {
      nombre: 'Nyliss Avacynn',
      edad: 83,
      altura: 1.79,
      peso: 72,
      raza: 'Aasimar',
      clase: 'Mago',
      experiencia: 435,
      alineamiento: 'Caótico Malo',
      trasfondo: 'Artista',
      estadisticas: {
        base: {
          fuerza: 10,
          destreza: 16,
          constitucion: 10,
          inteligencia: 16,
          sabiduria: 14,
          carisma: 10,
        },
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
        base: {
          fuerza: 20,
          destreza: 10,
          constitucion: 13,
          inteligencia: 12,
          sabiduria: 12,
          carisma: 5,
        },
        adicional: {
          fuerza: [1],
          destreza: [1, 2],
          constitucion: [2, 1],
        },
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
    {
      nombre: 'Elgrim',
      raza: 'Kenku',
      clase: 'Brujo',
      trasfondo: 'Huerfano',
      alineamiento: ['Neutral', 'Malvado'],
      experiencia: 3000000,
      estadisticas: {
        base: {
          fuerza: 50,
          destreza: 50,
          constitucion: 50,
          inteligencia: 50,
          sabiduria: 50,
          carisma: 50,
        },
      },
    },
  ]);
}
