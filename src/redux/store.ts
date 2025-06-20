// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
