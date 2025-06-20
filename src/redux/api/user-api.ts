import type { IAPIResponse, IUser } from "@/types";
import { apiSlice } from "./api-slice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IAPIResponse<IUser[]>, void>({
      query: () => "/user",
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (user) => ({
        url: "/user/create-user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;
