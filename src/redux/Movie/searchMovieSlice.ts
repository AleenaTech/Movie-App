import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../Utils/Request";

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
        const response = await axios.get(`/search?q=${searchValue}`);
        return response.data;
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
