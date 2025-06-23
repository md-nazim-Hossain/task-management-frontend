import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QueryParamsState {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | undefined;
}

const initialState: QueryParamsState = {};

const queryParamsSlice = createSlice({
  name: "queryParams",
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<QueryParamsState>) => {
      return { ...state, ...action.payload };
    },
    resetQueryParams: () => {
      return {};
    },
  },
});

export const { setQueryParams, resetQueryParams } = queryParamsSlice.actions;
export default queryParamsSlice.reducer;
