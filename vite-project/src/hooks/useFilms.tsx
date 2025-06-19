import { useContext } from "react";
import { FilmContext } from "../context/FilmsContext";

export const useFilms = () => {
  const context = useContext(FilmContext);
  if (!context) throw new Error("useFilms debe usarse dentro de FilmsProvider");
  return context;
};
