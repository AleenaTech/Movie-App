import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface MovieDetailsState {
    fake: any;
    short: any;

    loading: boolean;
    error: string | null;
}

const initialState: MovieDetailsState = {
    fake: [],
    short: [],
    loading: false,
    error: "",
};
export const getMovieDetails = createAsyncThunk(
    "movieDetail",
    async (movieId: string) => {
        return fetch(`https://search.imdbot.workers.dev/?tt=${movieId}`).then(
            (response) => response.json()
        );
    }
);

export const movieDetailsSlice = createSlice({
    name: "movieDetail",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getMovieDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.fake = action.payload.fake;
                state.short = action.payload.short;
                state.error = null;
            })
            .addCase(
                getMovieDetails.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.fake = null;
                    state.short = null;
                    state.error = action.payload;
                }
            );
    },
});

export default movieDetailsSlice.reducer;
