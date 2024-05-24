import { configureStore } from "@reduxjs/toolkit";
import { fixedReducer } from "./slice/fixedSlice";
import { toggleReducer } from "./slice/toggleSlice";

const store = configureStore({
  reducer: {
    fixed: fixedReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: false,
});

export default store;
