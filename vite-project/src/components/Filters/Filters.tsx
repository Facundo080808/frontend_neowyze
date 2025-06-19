import { useCharacters } from "../../hooks/useCharacters";

export const Filters = () => {
  const { dispatch } = useCharacters();

  const handleEyeColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setEyeColorFilter', payload: e.target.value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setGenderFilter', payload: e.target.value });
  };

  return (
    <div className="p-4 flex gap-4 justify-center items-center">
      <select
        onChange={handleEyeColorChange}
        className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="all">Todos los colores</option>
        <option value="blue">Azul</option>
        <option value="brown">Marrón</option>
        <option value="red">Rojo</option>
        <option value="yellow">Amarillo</option>
      </select>

      <select
        onChange={handleGenderChange}
        className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="all">Todos</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="n/a">No especificado</option>
      </select>
    </div>
  );
};
