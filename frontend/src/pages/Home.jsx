import MovieCard from "../components/MovieCard.jsx";
import {useState} from "react";    // 48:20 Learn React With This ONE Project (tech with tim)

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "John Wick", release_date: "2014" },
        { id: 2, title: "Inception", release_date: "2010" },
        { id: 3, title: "The Matrix", release_date: "1999" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        alert(searchQuery);
        setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className= "search-form">
                <input 
                    type = "text"
                    placeholder = "Search for movies..." 
                    className = "search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type = "submit" className = "search-button">Search</button>
            </form>

            <div className = "movies-grid">
                {movies.map((movie) => (
                    movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Home