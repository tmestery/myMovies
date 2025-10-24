import "./App.css"
import MovieCard from "./components/MovieCard.jsx"

function App() {
  return (
    <>
      <MovieCard movie={{title: "Terrifier 2", release_date: "2024"}}/>
      <MovieCard movie={{title: "Terrifier", release_date: "2013"}}/>
    </>
  )
}

export default App