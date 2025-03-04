import { column, defineTable, defineDb } from 'astro:db';

// https://astro.build/db/config

// TABLAS
// Jugadores
const Jugadores = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    raza: column.text({ references: () => Razas.columns.name }), // FK
    clase: column.text({ references: () => Clases.columns.name }), //FK
    // Experiencia (Nivel)
    exp: column.number({ default: 0 }),
    alineamiento: column.text(), //FK
    trasfondo: column.text({ references: () => Trasfondos.columns.name }), //FK
    // La Cantidad de Inspiración que tiene
    inspiracion: column.number({ optional: true }),
    // Estadisticas
    stats: column.json(), // FUE, DES, CON, INT, SAB, CAR
    //Tabla de Salud
    health_table: column.json({ optional: true }), // Los Resultados que le han salido en el Dado de Salud al subir de Nivel
  },
});

// -- Razas
const Razas = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    pies: column.number({ default: 30 }),
    volar: column.number({ optional: true, default: 0 }),
    excavar: column.number({ optional: true, default: 0 }),
  },
});

// -- Clases
const Clases = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    dados_golpe: column.number(),
    competencias: column.json(),
  },
});

// -- Trasfondos
const Trasfondos = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    competencias: column.json(),
  },
});

// DB
export default defineDb({
  tables: { Jugadores, Razas, Clases, Trasfondos },
});
