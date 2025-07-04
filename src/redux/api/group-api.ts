import type { IAPIResponse, IFromUpdateData, IGroup } from "@/types";
import { apiSlice } from "./api-slice";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<IAPIResponse<IGroup[]>, void>({
      query: () => "/group",
      providesTags: ["Group"],
    }),

    getMyGroups: builder.query<IAPIResponse<IGroup[]>, void>({
      query: () => "/group/my-groups",
      providesTags: ["Group"],
    }),

    deleteGroup: builder.mutation<IGroup, string>({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),

    updateGroup: builder.mutation<IGroup, IFromUpdateData>({
      query: ({ id, body }) => ({
        url: `/group/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Group"],
    }),

    createGroup: builder.mutation<IGroup, Partial<IGroup>>({
      query: (group) => ({
        url: "/group/create-group",
        method: "POST",
        body: group,
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useCreateGroupMutation,
  useGetMyGroupsQuery,
} = groupApi;
