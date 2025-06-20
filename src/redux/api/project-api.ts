import type { IAPIResponse, IProject } from "@/types";
import { apiSlice } from "./api-slice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IAPIResponse<IProject[]>, void>({
      query: () => "/category",
      providesTags: ["Project"],
    }),

    deleteProject: builder.mutation<IProject, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation<IProject, Partial<IProject>>({
      query: (project) => ({
        url: `/category/${project._id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    createProject: builder.mutation<IProject, Partial<IProject>>({
      query: (project) => ({
        url: "/category/create-category",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useCreateProjectMutation,
} = projectApi;
