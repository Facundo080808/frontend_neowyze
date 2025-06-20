import type { ICharacter } from "../utils/Character_type";

export async function fetchCharacters(): Promise<ICharacter[]> {
  const response = await fetch("https://swapi.info/api/people");
  if (!response.ok) {
    throw new Error("Error al obtener personajes");
  }

  const data = await response.json();

  const characters: ICharacter[] = data.map((char: any) => ({
    name: char.name,
    eye_color: char.eye_color,
    gender: char.gender,
    url: char.url,
    birth_year: char.birth_year,
    hair_color: char.hair_color,
    height: char.height,
    skin_color: char.skin_color,
    mass: char.mass,
  }));

  return characters;
}

