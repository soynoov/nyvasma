import { column, defineTable, defineDb } from 'astro:db';

// https://astro.build/db/config

// TABLAS
// Jugadores
const Jugadores = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    // LORE
    nombre: column.text({ unique: true }),
    edad: column.number({ optional: true }),
    altura: column.number({ optional: true }),
    peso: column.number({ optional: true }),
    raza: column.text({ references: () => Razas.columns.nombre }), // FK
    clase: column.text({ references: () => Clases.columns.nombre }), //FK
    // Experiencia (Nivel)
    experiencia: column.number({ default: 0, optional: true }),
    alineamiento: column.json(), //FK
    trasfondo: column.text({ references: () => Trasfondos.columns.nombre }), //FK
    // La Cantidad de Inspiración que tiene
    inspiracion: column.number({ optional: true }),
    currentHP: column.number({ optional: true }),
    // Estadisticas
    estadisticas: column.json(), // FUE, DES, CON, INT, SAB, CAR
    //Tabla de Salud
    tabla_vida: column.json({ optional: true }), // Los Resultados que le han salido en el Dado de Salud al subir de Nivel
    armas: column.json({ optional: true }), // Array con el nombre de las Armas (Armas es un Tabla independiente)
    mochila: column.json({ optional: true }),
  },
});

// NPCs
const Personajes = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text({ unique: true }),
    age: column.number(),
    raza: column.text({ references: () => Razas.columns.nombre }), // FK
    clase: column.text({
      references: () => Clases.columns.nombre,
      optional: true,
    }), // FK
    work: column.text({ optional: true }),
  },
});

// -- Razas
const Razas = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
    movimiento: column.json({ default: { feets: 30 } }),
  },
});

// -- Clases
const Clases = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
    dados_golpe: column.number(),
    competencias: column.json(),
  },
});

// -- Trasfondos
const Trasfondos = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
    competencias: column.json(),
  },
});

// -- Armas
const Armas = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
  },
});

// DB
export default defineDb({
  tables: { Jugadores, Personajes, Razas, Clases, Trasfondos },
});
