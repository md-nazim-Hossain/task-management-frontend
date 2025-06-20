import type { IAPIResponse, IFromUpdateData, IUser } from "@/types";
import { apiSlice } from "./api-slice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IAPIResponse<IUser[]>, void>({
      query: (params: any) => {
        const query = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query.append(key, String(value));
          }
        });

        return `/user?${query.toString()}`;
      },

      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Project", "Task", "Group"],
    }),

    updateUser: builder.mutation<IUser, IFromUpdateData>({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User", "Project", "Task", "Group"],
    }),

    createUser: builder.mutation<IUser, FormData>({
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
