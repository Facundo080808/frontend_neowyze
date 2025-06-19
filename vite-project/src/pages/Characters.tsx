import { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { fetchCharacters } from "../services/Character_service";
import type { ICharacter } from "../utils/Character_type";
import { Header } from "../components/Header/Header";
import { Filters } from "../components/Filters/Filters";
import { Pagination } from "../components/Pagination/Pagination";
import { Link } from "react-router-dom";

export function Characters() {
  const { AllCharacters: state, dispatch } = useCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const charactersPerPage = 9;


  useEffect(() => {
    const getCharacters = async () => {
      const allChars = await fetchCharacters();
      dispatch({ type: "setCharacters", payload: allChars });
    };

    getCharacters();
  }, [dispatch]);

useEffect(() => {
  let result = state.all;

  if (state.filters.eyeColor !== "all") {
    result = result.filter(
      (char) => char.eye_color.toLowerCase() === state.filters.eyeColor.toLowerCase()
    );
  }

  if (state.filters.gender !== "all") {
    result = result.filter(
      (char) => char.gender.toLowerCase() === state.filters.gender.toLowerCase()
    );
  }

  const totalPages = Math.ceil(result.length / charactersPerPage);
  setHasPrev(page > 1);
  setHasNext(page < totalPages);

  const startIndex = (page - 1) * charactersPerPage;
  const paginated = result.slice(startIndex, startIndex + charactersPerPage);

  setFilteredCharacters(paginated);
  console.log(filteredCharacters);
  
}, [state.all, state.filters, page]);

useEffect(() => {
  setPage(1); 
}, [state.filters]);


  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4">

      <Header />
      <div className="flex flex-row items-center justify-between mb-6 col-span-full">
        <h1 className="text-3xl font-bold mb-6 col-span-full">Personajes</h1>
        <Filters />
      </div>
      
      {filteredCharacters.length === 0 ? (
        <p>No hay personajes que coincidan con los filtros.</p>
      ) : (
        filteredCharacters.map((char) => {
          const id = char.url.split("/").filter(Boolean).pop();
          return(
          <Link key={id} 
          to={`/characters/${id}`}
          className=""
          >
          <div
            key={char.url}
            className=" border rounded-xl p-4 shadow-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src="https://imgs.search.brave.com/bSMsgDaD07WHzIO5RbhBdIEU8gdr5wbA5gkQuDyWWzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3Rh/ci13YXJzLWNoYXJh/Y3RlcnMtdXJib2tq/cHI0M3U3NGFmdi5q/cGc"
              alt="Personaje"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{char.name}</h3>
            <p className="text-sm">
              <span className="font-medium">👁 Color de ojos:</span> {char.eye_color}
            </p>
            <p className="text-sm">
              <span className="font-medium">🚻 Género:</span> {char.gender ===  "n/a" ? "No especificado":char.gender}
            </p>
          </div>
          </Link>
        )})
      )}
      <div className="col-span-full flex justify-center mt-4">
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={() => setPage((prev) => prev + 1)}
          onPrev={() => setPage((prev) => prev - 1)}
        />
      </div>
    </div>
  );
};


