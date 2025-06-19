export interface IFilm {
  episode_id: number
  title: string
  url: string
}



export interface FilmContextType {
    Films: IFilm[] | null;
    setFilms: React.Dispatch<React.SetStateAction<IFilm[] | null>>;
}