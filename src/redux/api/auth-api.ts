import type { IAPIResponse, ILoginUserResponse, IUser } from "@/types";
import { apiSlice } from "./api-slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      IAPIResponse<ILoginUserResponse>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query<IAPIResponse<IUser>, void>({
      query: () => "/user/my-profile",
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

    logOut: builder.mutation<IAPIResponse<boolean>, void>({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
        body: credentials,
      }),
    }),
    dashboard: builder.query<
      IAPIResponse<Array<{ title: string; value: number }>>,
      void
    >({
      query: () => "/auth/dashboard",
      providesTags: ["User", "Project", "Task", "Group"],
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useLogOutMutation,
  useDashboardQuery,
} = authApi;
