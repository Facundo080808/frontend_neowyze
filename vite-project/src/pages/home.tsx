import { useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchFilms } from "../services/Film_service"

export default function Home() {
  useEffect(()=>{
    fetchFilms().then((data)=>console.log(data)).catch((e)=>console.error(e))
  },[])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white">
      <h1 className="text-4xl font-bold">Star Wars Explorer</h1>
      <div className="flex gap-4">
        <Link to="/films" className="bg-yellow-500 px-6 py-2 rounded text-black hover:bg-yellow-600">
          Ver Películas
        </Link>
        <Link to="/characters" className="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-600">
          Ver Personajes
        </Link>
      </div>
    </div>
  )
}
