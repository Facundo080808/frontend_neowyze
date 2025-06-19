import './Header.css';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';

const icons = {
  light: '🌞',
  dark: '🌙'
};

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem("Theme") as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || preferred;

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem("Theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2 text-black dark:text-white">
      <nav className="flex px-3 text-sm font-medium rounded-full justify-center items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative block px-2 py-2 transition ${
              isActive ? 'text-blue-500 underline' : 'hover:text-blue-500 dark:hover:text-blue-400'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/films"
          className={({ isActive }) =>
            `relative block px-2 py-2 transition ${
              isActive ? 'text-blue-500 underline' : 'hover:text-blue-500 dark:hover:text-blue-400'
            }`
          }
        >
          Ver Películas
        </NavLink>

        <NavLink
          to="/characters"
          className={({ isActive }) =>
            `relative block px-2 py-2 transition ${
              isActive ? 'text-blue-500 underline' : 'hover:text-blue-500 dark:hover:text-blue-400'
            }`
          }
        >
          Ver Personajes
        </NavLink>

        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition hover:cursor-pointer"
        >
          <span>{icons[theme]}</span>
        </button>
      </nav>
    </header>
  );
}
