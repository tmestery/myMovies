// This is a state manager for all of the user's favorited movies
import {createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(Movie)

export const MovieProvider = () => ({children}) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) {
            setFavoriteMovies(JSON.parse(storedFavs))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.srringify(favoriteMovies))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favoriteMovies.some(movie => movie.id === movieId);
    }

    const value = {
        favoriteMovies,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>
}