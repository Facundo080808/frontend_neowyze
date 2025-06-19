import { useEffect } from "react";

import { fetchFilmsAction } from "../services/Film_service";
import { Header } from "../components/Header/Header";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 ">
      <Header />
      <h1 className="text-4xl font-bold">Star Wars Explorer</h1>
      <p className="text-lg">Explora el universo de Star Wars</p>
    </div>
  );
}
