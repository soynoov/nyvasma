import { db, eq, Jugadores, Clases } from 'astro:db';
export function getId(pathname: string): number {
  const id = Number(pathname.split('/').pop()!);
  console.log(id);

  return id;
}

export async function getChosen(id: number) {
  let jugador = await db.select().from(Jugadores).where(eq(Jugadores.id, id));
  const chosen = jugador[0];

  return chosen;
}

export async function getChosenClass(id: number) {
  const chosen = await getChosen(id);
  const selectClass = chosen.clase;
  let queryClass = await db
    .select()
    .from(Clases)
    .where(eq(Clases.nombre, selectClass));
  const chosenClass = queryClass[0];

  return chosenClass;
}
