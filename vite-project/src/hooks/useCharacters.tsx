import { useContext } from "react";
import { CharacterContext } from "../context/Character_context";

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacters debe usarse dentro de CharacterProvider");
  }
  return context;
};
