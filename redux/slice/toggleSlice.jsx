const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  inlargeImage: {
    bool: false,
    data: null,
  },
};

const toggleSlice = createSlice({
  name: "ToggleSlice",
  initialState,
  reducers: {
    toggleInLargeImage: (state, { payload }) => {
      const { bool, data } = payload;

      if (!bool) {
        state.inlargeImage.bool = false;
        state.inlargeImage.data = null;
        return state;
      }

      state.inlargeImage.bool = true;
      state.inlargeImage.data = data;
    },
  },
});

export const { toggleInLargeImage } = toggleSlice.actions;

export const toggleReducer = toggleSlice.reducer;

export const toggleState = (state) => state.toggle;
