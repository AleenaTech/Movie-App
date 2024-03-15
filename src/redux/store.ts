import { configureStore } from "@reduxjs/toolkit";
import randomMoviesSlice from "./Movie/randomMoviesSlice";
import movieDetailsSlice from "./Movie/movieDetailsSlice";
import searchMovieSlice from "./Movie/searchMovieSlice";

export const store = configureStore({
    reducer: {
        randomMovie: randomMoviesSlice,
        movieDetails: movieDetailsSlice,
        searchMovie: searchMovieSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
