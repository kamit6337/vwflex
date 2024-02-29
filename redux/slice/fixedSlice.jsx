import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const fixedSlice = createSlice({
  name: "FixedSlice",
  initialState,
  reducers: {
    initialFixedData: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { initialFixedData } = fixedSlice.actions;

export const fixedReducer = fixedSlice.reducer;

export const fixedState = (state) => state.fixed;
