import { type IFilm } from "../utils/Film_types";

export async function fetchFilms(): Promise<IFilm[]> {
  const response = await fetch("https://swapi.info/api/films");
  if (!response.ok) {
    throw new Error("Error al obtener peliculas");
  }

  const data = await response.json();

  const Films: IFilm[] = data.map((film: any) => ({
    episode_id: film.episode_id,
    title: film.title,
    url: film.url,
  }));

  return Films;
}