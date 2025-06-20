// export interface IFilm {
//   episode_id: number
//   title: string
//   url: string
// }
export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  url: string;
  characters?: string[]; // ← agrega esta línea
}



export interface FilmContextType {
    Films: IFilm[] | null;
    setFilms: React.Dispatch<React.SetStateAction<IFilm[] | null>>;
}