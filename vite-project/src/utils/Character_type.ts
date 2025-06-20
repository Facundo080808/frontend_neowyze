export interface ICharacter {
  name: string;
  eye_color: string;
  gender: string;
  url: string;
  birth_year?: string;
  hair_color?: string;
  height?: string;
  skin_color?: string;
  mass?: string;
}


export type State = {
  all: ICharacter[];
  filters: {
    eyeColor: string;
    gender: string;
  };
};

export type CharacterAction =
  | { type: 'setCharacters'; payload: ICharacter[] }
  | { type: 'setEyeColorFilter'; payload: string }
  | { type: 'setGenderFilter'; payload: string };


export interface CharacterContextType {
  AllCharacters: State ;
  dispatch: React.Dispatch<CharacterAction>;
}