import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface MovieDetailsState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: MovieDetailsState = {
    data: [],
    loading: false,
    error: "",
};
export const getSearchedMovie = createAsyncThunk(
    "searchMovie",
    async (searchValue: string) => {
        return fetch(
            `https://search.imdbot.workers.dev/search?q=${searchValue}`
        ).then((response) => response.json());
    }
);

export const searchMovieSlice = createSlice({
    name: "searchMovie",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getSearchedMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchedMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.description;
                state.error = null;
            })
            .addCase(
                getSearchedMovie.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = null;
                    state.error = action.payload;
                }
            );
    },
});

export default searchMovieSlice.reducer;
