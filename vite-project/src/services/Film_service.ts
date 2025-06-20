import { type IFilm } from "../utils/Film_types";

export async function fetchFilmsAction(): Promise<IFilm[]> {
  const response = await fetch("https://swapi.info/api/films");
  if (!response.ok) {
    throw new Error("Error al obtener peliculas");
  }

  const data = await response.json();

  const Films: IFilm[] = data.map((film: any) => ({
    title: film.title,
    episode_id: film.episode_id,
    opening_crawl: film.opening_crawl,
    director: film.director,
    producer: film.producer,
    release_date: film.release_date,
    url: film.url,
    characters: film.characters,
  }));

  return Films.sort((a: IFilm, b: IFilm) => a.episode_id - b.episode_id);
}