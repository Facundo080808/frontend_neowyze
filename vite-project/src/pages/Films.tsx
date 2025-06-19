import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Film } from "../utils/interface"


export default function Films() {
  const [films, setFilms] = useState<Film[]>([])

  useEffect(() => {
    fetch("https://swapi.info/api/films")
      .then(res => res.json())
      .then(data => {
        const sorted = data.results.sort((a: Film, b: Film) => a.episode_id - b.episode_id)
        setFilms(sorted)
      })
  }, [])

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Películas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {films.map(film => {
          const id = film.url.split("/").filter(Boolean).pop()
          return (
            <Link key={id} to={`/films/${id}`} className="bg-gray-800 p-4 rounded hover:bg-gray-700">
              <img src="/film.jpg" alt="Film" className="w-full h-40 object-cover mb-2 rounded" />
              <h2 className="text-xl">{film.title}</h2>
              <p>Episodio {film.episode_id}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
