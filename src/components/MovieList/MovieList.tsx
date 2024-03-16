import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getMovies } from "../../redux/Movie/randomMoviesSlice";
import { getSearchedMovie } from "../../redux/Movie/searchMovieSlice";
import { MovieType } from "../../commonTypes";
import MovieListItem from "../MovieListItem/MovieListItem";
import { useDebounce } from "../../customHooks/useDebounce";
import Loader from "../Loader/Loader";
import InputSearchField from "../UiElements/InputSearchField/InputSearchField";

const MovieList: React.FC = () => {
    const dispatch = useAppDispatch();

    // handle random movie and searched Movie state
    const moviesList = useAppSelector((state) => state.randomMovie.data);
    const movieSearched = useAppSelector((state) => state.searchMovie.data);
    const [formattedMoviesList, setFormattedMoviesList] = useState<MovieType[]>(
        []
    );

    // handle loading state
    const movieLoading = useAppSelector((state) => state.randomMovie.loading);
    const movieSearchLoading = useAppSelector(
        (state) => state.searchMovie.loading
    );

    // handle error state
    const movieError = useAppSelector((state) => state.randomMovie.error);
    const movieSearchError = useAppSelector((state) => state.searchMovie.error);
    const [error, setError] = useState<string | null>("");

    const [searchValue, setSearchValue] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(
        movieSearchLoading || movieLoading
    );

    // Debounce search value
    const debouncedSearchValue = useDebounce(searchValue, 1000);

    const handleMovieSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        dispatch(getMovies());
        console.log("error state", moviesList);
    }, [dispatch]);

    useEffect(() => {
        if (moviesList) {
            const formattedList: MovieType[] = moviesList.map((movie: any) => ({
                TITLE: movie["#TITLE"] || "",
                IMDB_ID: movie["#IMDB_ID"] || "",
                IMG_POSTER: movie["#IMG_POSTER"] || "",
                ACTORS: movie["#ACTORS"] || [],
                DESCRIPTION: movie["#AKA"] || "",
                RANK: movie["#RANK"] || "",
                YEAR: movie["#YEAR"] || "",
            }));
            setFormattedMoviesList(formattedList);
            setLoading(false);
        }
    }, [moviesList]);

    useEffect(() => {
        if (debouncedSearchValue !== "") {
            dispatch(getSearchedMovie(debouncedSearchValue));
        }
    }, [dispatch, debouncedSearchValue]);

    useEffect(() => {
        if (movieSearched) {
            const formattedList: MovieType[] = movieSearched.map(
                (movie: any) => ({
                    TITLE: movie["#TITLE"] || "",
                    IMDB_ID: movie["#IMDB_ID"] || "",
                    IMG_POSTER: movie["#IMG_POSTER"] || "",
                    ACTORS: movie["#ACTORS"] || [],
                    DESCRIPTION: movie["#AKA"] || "",
                    RANK: movie["#RANK"] || "",
                    YEAR: movie["#YEAR"] || "",
                })
            );
            setFormattedMoviesList(formattedList);
        }
    }, [movieSearched]);

    useEffect(() => {
        setError(movieSearchError || movieError);
    }, [movieSearchError, movieError]);

    const searchContainer = () => {
        return (
            <InputSearchField
                value={searchValue}
                onChange={handleMovieSearch}
            />
        );
    };

    const listMovies = () => {
        return (
            <div className="movie-list-wrap">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p>{error}</p>
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
