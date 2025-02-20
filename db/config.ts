import { column, defineTable, defineDb } from 'astro:db';

// https://astro.build/db/config

// TABLAS
// Jugadores
const Jugadores = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    nombre: column.text(),
    raza: column.text({ references: () => Razas.columns.nombre }), // FK
    clase: column.text({ references: () => Clases.columns.nombre }), //FK
    alineamiento: column.text(), //FK
    trasfondo: column.text({ references: () => Trasfondos.columns.nombre }), //FK
    inspiracion: column.number({ optional: true }),
    estadisticas: column.json(),
  },
});

// -- Razas
const Razas = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
    velocidad: column.number(),
  },
});

// -- Clases
const Clases = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text({ unique: true }),
    dados_golpe: column.number(),
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

// DB
export default defineDb({
  tables: { Jugadores, Razas, Clases, Trasfondos },
});
