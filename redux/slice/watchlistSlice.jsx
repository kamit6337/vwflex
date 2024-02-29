import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  movies: [],
  tv: [],
};

const watchlistSlice = createSlice({
  name: "watchlistSlice",
  initialState,
  reducers: {
    initialWatchlistData: (state, { payload }) => {
      const { movies, tv, _id } = payload;

      state.id = _id;
      state.movies = movies;
      state.tv = tv;

      return state;
    },
    updateWatchlistData: (state, { payload }) => {
      const { movies, tv } = payload;

      state.movies = movies;
      state.tv = tv;

      return state;
    },
  },
});

export const { initialWatchlistData, updateWatchlistData } =
  watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;

export const watchlistState = (state) => state.watchlist;
