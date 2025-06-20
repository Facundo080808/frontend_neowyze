import { useParams } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";
import { useMemo } from "react";
import type { ICharacter } from "../utils/Character_type";
import { Header } from "../components/Header/Header";

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { AllCharacters: state } = useCharacters();

  const character: ICharacter | undefined = useMemo(() => {
    return state.all.find((char) => char.url.endsWith(`/${id}`));
  }, [state.all, id]);

  if (!character) {
    return (
      <div className="min-h-screen p-6 text-red-600 bg-white dark:bg-gray-900">
        Personaje no encontrado.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Header />
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{character.name}</h1>
      <img
        src="https://imgs.search.brave.com/bSMsgDaD07WHzIO5RbhBdIEU8gdr5wbA5gkQuDyWWzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3Rh/ci13YXJzLWNoYXJh/Y3RlcnMtdXJib2tq/cHI0M3U3NGFmdi5q/cGc"
        alt={character.name}
        className="w-full max-w-md h-64 object-cover rounded mb-6"
      />
      <div className="space-y-2 text-lg">
        <p><strong>👁 Color de ojos:</strong> {character.eye_color}</p>
        <p><strong>🎂 Año de cumpleaños:</strong> {character.birth_year}</p>
        <p><strong>💇‍♂️ Color de pelo:</strong> {character.hair_color}</p>
        <p><strong>📏 Altura:</strong> {character.height} cm</p>
        <p><strong>🧴 Color de piel:</strong> {character.skin_color}</p>
        <p><strong>⚖️ Masa:</strong> {character.mass} kg</p>
        <p><strong>🚻 Género:</strong> {character.gender === "n/a" ? "No especificado" : character.gender}</p>
      </div>
    </div>
    </div>
  );
}
