import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect} from "react";
import {searchMovies, getPopularMovies} from "../Services/api.js";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.log(error);
                setError("Failed to load movies ..."
                )
            }
            finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        if (loading) {
            return;
        }
        
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch {
            console.log(error);
            setError("Failed to search movies. Please try again.");

        } finally {
            setLoading(false);
        }

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

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading movies...</div> : 
            <div className = "movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>}
        </div>
    );
}

export default Home