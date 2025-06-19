import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFilms } from "../hooks/useFilms"; // tu custom hook
import { fetchFilmsAction } from "../services/Film_service";
import { Header } from "../components/Header/Header";
export default function Films() {
  const { Films, setFilms } = useFilms();

  useEffect(() => {
    if (!Films) {
      fetchFilmsAction().then((data) => {setFilms(data);}).catch((error) => {
        console.error("Error fetching films:", error);})
    }
  }, [Films, setFilms]);
  console.log(Films);
  
  if (!Films) {
    return <div className="p-8 text-white bg-gray-900 min-h-screen">...</div>;
  }

  return (
     <div className="p-8 text-black dark:text-white bg-white dark:bg-gray-900 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Películas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Films.map((film) => {
          const id = film.url.split("/").filter(Boolean).pop();
          return (
            <Link
              key={id}
              to={`/films/${id}`}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src="https://imgs.search.brave.com/Q5MnfG0sDVlh9St_di7iCzxvO1-CCZxP_5ZORKwgdZw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFuQktEWnluK0wu/anBn"
                alt="Film"
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold">{film.title}</h2>
              <p className="text-sm">Episodio {film.episode_id}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
