import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import InputSearchField from "../../components/UiElements/InputSearchField/InputSearchField";
import { useDebounce } from "../../customHooks/useDebounce";
import MovieListItem from "./MovieListItem/MovieListItem";
import useMovieSDK from "../../customHooks/useMovieSDK";
import { MovieType } from "../../commonTypes";

const MovieList: React.FC = () => {
    const {
        randomMoviesState,
        searchedMovieState,
        fetchRandomMovies,
        searchMovie,
    } = useMovieSDK();

    const [formattedMoviesList, setFormattedMoviesList] = useState<MovieType[]>(
        []
    );
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(
        randomMoviesState.loading || searchedMovieState.loading
    );
    const [searchValue, setSearchValue] = useState<string>("");

    // Debounce search value
    const debouncedSearchValue = useDebounce(searchValue, 1000);

    const handleMovieSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        // Fetch random movies initially
        fetchRandomMovies();
    }, []);

    useEffect(() => {
        if (randomMoviesState.data) {
            const formattedList: MovieType[] = randomMoviesState.data
                .slice(0, 10)
                .map((movie: any) => ({
                    TITLE: movie["#TITLE"] || "",
                    IMDB_ID: movie["#IMDB_ID"] || "",
                    IMG_POSTER: movie["#IMG_POSTER"] || "",
                    ACTORS: movie["#ACTORS"] || [],
                    DESCRIPTION: movie["#AKA"] || "",
                    RANK: movie["#RANK"] || "",
                    YEAR: movie["#YEAR"] || "",
                }));
            setFormattedMoviesList(formattedList);
        }
    }, [randomMoviesState.data]);

    useEffect(() => {
        if (debouncedSearchValue !== "") {
            searchMovie(debouncedSearchValue);
        }
    }, [debouncedSearchValue]);

    useEffect(() => {
        if (searchedMovieState.data) {
            const formattedList: MovieType[] = searchedMovieState.data
                .slice(0, 10)
                .map((movie: any) => ({
                    TITLE: movie["#TITLE"] || "",
                    IMDB_ID: movie["#IMDB_ID"] || "",
                    IMG_POSTER: movie["#IMG_POSTER"] || "",
                    ACTORS: movie["#ACTORS"] || [],
                    DESCRIPTION: movie["#AKA"] || "",
                    RANK: movie["#RANK"] || "",
                    YEAR: movie["#YEAR"] || "",
                }));
            setFormattedMoviesList(formattedList);
        }
    }, [searchedMovieState.data]);

    useEffect(() => {
        setError(searchedMovieState.error || randomMoviesState.error);
    }, [searchedMovieState.error, randomMoviesState.error]);

    useEffect(() => {
        setLoading(searchedMovieState.loading || randomMoviesState.loading);
    }, [searchedMovieState.loading, randomMoviesState.loading]);

    const searchContainer = () => {
        return (
            <>
                <h3>Search Movie</h3>
                <InputSearchField
                    value={searchValue}
                    onChange={handleMovieSearch}
                />
            </>
        );
    };

    const listMovies = () => {
        return (
            <div className="movie-list-wrap">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="listing-error">{error}</p>
                ) : formattedMoviesList.length > 0 ? (
                    <div className="movie-list">
                        {formattedMoviesList.map((movie: MovieType) => (
                            <MovieListItem key={movie.IMDB_ID} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="listing-error">No movies found.</p>
                )}
            </div>
        );
    };

    return (
        <div className="movie-wrap">
            {searchContainer()}
            {listMovies()}
        </div>
    );
};

export default MovieList;
