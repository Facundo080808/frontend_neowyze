import { useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"

type Character = {
  name: string
  eye_color: string
  gender: string
  url: string
}

const genericImage = "/character.jpg"

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filtered, setFiltered] = useState<Character[]>([])
  const [filters, setFilters] = useState({ eye_color: "", gender: "" })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Carga desde SWAPI
  const fetchCharacters = async () => {
    setLoading(true)
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
    const data = await res.json()
    setCharacters(prev => [...prev, ...data.results])
    setLoading(false)
  }

  // Scroll infinito usando IntersectionObserver
  const lastElement = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  // Filtro en memoria
  useEffect(() => {
    const filteredData = characters.filter(c => {
      const eyeMatch = filters.eye_color === "" || c.eye_color === filters.eye_color
      const genderMatch = filters.gender === "" || c.gender === filters.gender
      return eyeMatch && genderMatch
    })
    setFiltered(filteredData)
  }, [filters, characters])

  useEffect(() => {
    fetchCharacters()
  }, [page])

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Personajes</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="text-black p-2 rounded"
          value={filters.eye_color}
          onChange={e => setFilters(prev => ({ ...prev, eye_color: e.target.value }))}
        >
          <option value="">Todos los colores de ojos</option>
          {[...new Set(characters.map(c => c.eye_color))]
            .filter(c => c !== "unknown" && c !== "n/a")
            .map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
        </select>

        <select
          className="text-black p-2 rounded"
          value={filters.gender}
          onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value }))}
        >
          <option value="">Todos los géneros</option>
          {[...new Set(characters.map(c => c.gender))]
            .filter(g => g !== "unknown" && g !== "n/a")
            .map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
        </select>
      </div>

      {/* Personajes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((char, idx) => {
          const id = char.url.split("/").filter(Boolean).pop()
          return (
            <Link
              to={`/characters/${id}`}
              key={id! + idx}
              className="bg-gray-800 p-3 rounded hover:bg-gray-700 text-center"
            >
              <img src={genericImage} alt={char.name} className="w-full h-32 object-cover mb-2 rounded" />
              <h2 className="text-lg">{char.name}</h2>
              <p className="text-sm">👁️ {char.eye_color}</p>
              <p className="text-sm">⚥ {char.gender}</p>
            </Link>
          )
        })}
      </div>

      {/* Loader final */}
      <div ref={lastElement} className="h-20 flex justify-center items-center">
        {loading && <p className="text-gray-400">Cargando más personajes...</p>}
      </div>
    </div>
  )
}
