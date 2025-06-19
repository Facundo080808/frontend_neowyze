import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { IFilm , FilmContextType} from "../utils/Film_types";


export const FilmContext = createContext<FilmContextType | undefined>(undefined);

export const FilmsProvider = ({ children }: { children: ReactNode }) => {
    const [Films,setFilms] = useState<IFilm[]|null>(null)
  return (
    <FilmContext.Provider value={ {Films,setFilms} }>
      {children}
    </FilmContext.Provider>
  );
};

// const FilmReducer = (state:Film[],action: FilmAction):Film[]=>{
//   switch (action.type) {
//     case 'set':
//       return action.payload;
//     case 'add':
//       return state ? [...state, action.payload] : [action.payload];
//     default:
//       return state!;
// }
// }
