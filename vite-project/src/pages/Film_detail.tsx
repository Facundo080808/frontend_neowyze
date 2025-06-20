import { useParams, Link } from "react-router-dom";
import { useFilms } from "../hooks/useFilms";
import { useCharacters } from "../hooks/useCharacters";
import { useMemo } from "react";
import { Header } from "../components/Header/Header";

export default function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const { Films } = useFilms();
  const { AllCharacters:Characters } = useCharacters();

  const film = useMemo(() => {
    return Films?.find((f) => f.url.endsWith(`/${id}`));
  }, [Films, id]);

  const charactersInFilm = useMemo(() => {
    if (!film) return [];
    return Characters.all.filter((char) => film.characters?.includes(char.url));
  }, [film, Characters.all]);

  if (!film) {
    return (
      <div className="min-h-screen p-6 text-red-500 bg-white dark:bg-gray-900">
        Película no encontrada.
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Header />
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{film.title}</h1>
      <img
        src="https://imgs.search.brave.com/Q5MnfG0sDVlh9St_di7iCzxvO1-CCZxP_5ZORKwgdZw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFuQktEWnluK0wu/anBn"
        alt={film.title}
        className="w-full max-w-md h-64 object-cover rounded mb-6"
      />
      <div className="space-y-2 text-lg mb-8">
        <p><strong>🎞 Episodio:</strong> {film.episode_id}</p>
        <p><strong>🎬 Director:</strong> {film.director}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">👥 Personajes</h2>
      {charactersInFilm.length === 0 ? (
        <p>No hay personajes disponibles para esta película.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {charactersInFilm.map((char) => {
            const charId = char.url.split("/").filter(Boolean).pop();
            return (
              <Link
                to={`/characters/${charId}`}
                key={char.url}
                className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src="https://imgs.search.brave.com/bSMsgDaD07WHzIO5RbhBdIEU8gdr5wbA5gkQuDyWWzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3Rh/ci13YXJzLWNoYXJh/Y3RlcnMtdXJib2tq/cHI0M3U3NGFmdi5q/cGc"
                  alt={char.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-medium">{char.name}</h3>
              </Link>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}
