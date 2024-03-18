import { useEffect } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // Import RootState and AppDispatch interfaces
import { getMovies } from "../redux/Movie/randomMoviesSlice";
import { getMovieDetails } from "../redux/Movie/movieDetailsSlice";
import { getSearchedMovie } from "../redux/Movie/searchMovieSlice";

// Define TypedUseSelectorHook with RootState
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const useMovieSDK = () => {
    const dispatch: AppDispatch = useDispatch();

    // Selectors for accessing state from Redux store
    const movieDetailsState = useTypedSelector((state) => state.movieDetails);
    const randomMoviesState = useTypedSelector((state) => state.randomMovie);
    const searchedMovieState = useTypedSelector((state) => state.searchMovie);

    const fetchRandomMovies = () => {
        dispatch(getMovies());
    };
    const fetchMovieDetails = (movieId: string) => {
        dispatch(getMovieDetails(movieId));
    };

    const searchMovie = (searchValue: string) => {
        dispatch(getSearchedMovie(searchValue));
    };

    return {
        movieDetailsState,
        randomMoviesState,
        searchedMovieState,
        fetchRandomMovies,
        fetchMovieDetails,
        searchMovie,
    };
};

export default useMovieSDK;
