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
    const response = await axios.get("/?q=best");
    return response.data;
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
