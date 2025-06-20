import { setToken } from "../slices/auth-slice";
import { apiSlice } from "./api-slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string }, // response shape
      { email: string; password: string } // request shape
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          localStorage.setItem("accessToken", data.accessToken);
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),
    changePassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string; confirmPassword: string } // request shape
    >({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
