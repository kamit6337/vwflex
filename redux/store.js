import { configureStore } from "@reduxjs/toolkit";
import { watchlistReducer } from "./slice/watchlistSlice";
import { fixedReducer } from "./slice/fixedSlice";

const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    fixed: fixedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
