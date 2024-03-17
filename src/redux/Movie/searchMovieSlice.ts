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
    async (searchValue: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/search?q=${searchValue}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 400:
                        return rejectWithValue(
                            "Bad request. Please check your input."
                        );

                    case 429:
                        return rejectWithValue(
                            "Too Many Requests. Please try again later."
                        );
                    case 500:
                        return rejectWithValue(
                            "Internal server error. Please try again later."
                        );

                    default:
                        return rejectWithValue(
                            `An error occurred (${status}).`
                        );
                }
            } else {
                return rejectWithValue(
                    "Network error. Please check your connection."
                );
            }
        }
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
                state.error = null;
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
