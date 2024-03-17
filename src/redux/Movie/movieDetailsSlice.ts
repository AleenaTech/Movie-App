import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../Utils/Request";

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
        try {
            const response = await axios.get(`/?tt=${movieId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 400:
                        throw new Error(
                            "Bad request. Please check your input."
                        );
                    case 429:
                        throw new Error(
                            "Too Many Requests. Please try again later."
                        );
                    case 500:
                        throw new Error(
                            "Internal server error. Please try again later."
                        );
                    default:
                        throw new Error(`An error occurred (${status}).`);
                }
            } else if (error.request) {
                throw new Error(
                    "No response received from server. Please try again later."
                );
            } else {
                throw new Error("Network error. Please check your connection.");
            }
        }
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
