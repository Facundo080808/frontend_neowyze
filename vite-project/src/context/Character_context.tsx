import { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { CharacterAction , CharacterContextType, State} from "../utils/Character_type";


const initialState: State = {
  all: [],
  filters: {
    eyeColor: 'all',
    gender: 'all',
  },
};

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [AllCharacters, dispatch] = useReducer(CharacterReducer, initialState);

  return (
    <CharacterContext.Provider value={{ AllCharacters, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};


const CharacterReducer = (state: State, action: CharacterAction): State => {
  switch (action.type) {
    case 'setCharacters':
      return { ...state, all: action.payload };
    case 'setEyeColorFilter':
      return {
        ...state,
        filters: { ...state.filters, eyeColor: action.payload },
      };
    case 'setGenderFilter':
      return {
        ...state,
        filters: { ...state.filters, gender: action.payload },
      };
    default:
      return state;
  }
};

