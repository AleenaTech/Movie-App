import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../commonTypes";
import axios from "../../Utils/Request";

export interface randomMoviesState {
    data: MovieType[] | [] | null;
    loading: boolean;
    error: string | null;
}

const initialState: randomMoviesState = {
    data: [],
    loading: false,
    error: "",
};

export const getMovies = createAsyncThunk("randomMovies", async () => {
    try {
        const response = await axios.get("/?q=best");
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    throw new Error("Bad request. Please check your input.");

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
});

export const randomMoviesSlice = createSlice({
    name: "randomMovies",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.description;
                state.error = null;
            })
            .addCase(
                getMovies.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.data = null;
                    state.error = action.payload;
                }
            );
    },
});

export default randomMoviesSlice.reducer;
