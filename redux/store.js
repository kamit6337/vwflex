import { configureStore } from "@reduxjs/toolkit";
import { watchlistReducer } from "./slice/watchlistSlice";
import { fixedReducer } from "./slice/fixedSlice";
import { toggleReducer } from "./slice/toggleSlice";

const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    fixed: fixedReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
