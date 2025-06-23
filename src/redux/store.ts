// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import authReducer from "./slices/auth-slice";
import queryParamsReducer from "./slices/queryParams-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    queryParams: queryParamsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
