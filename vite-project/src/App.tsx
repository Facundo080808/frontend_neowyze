import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Films from "./pages/Films"
import {Characters} from "./pages/Characters"
import Providers from "./components/Providers/Providers"
import { CharacterDetail } from "./pages/Character_Detail"
import FilmDetail from "./pages/Film_detail"

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}
