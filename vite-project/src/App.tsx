import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Films from "./pages/Films"
import Characters from "./pages/Characters"
import Providers from "./components/Providers"

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}
