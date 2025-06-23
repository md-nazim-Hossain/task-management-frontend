import type { IAPIResponse, IProject } from "@/types";
import { apiSlice } from "./api-slice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IAPIResponse<IProject[]>, Record<string, any>>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else if (value) {
            searchParams.set(key, String(value));
          }
        });

        return `/category?${searchParams.toString()}`;
      },
      providesTags: ["Project"],
    }),
    getSingleProject: builder.query<IAPIResponse<IProject[]>, void>({
      query: (params: any) => {
        const query = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query.append(key, String(value));
          }
        });
        return `/category?${query.toString()}`;
      },
      providesTags: ["SingleProject"],
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
  useGetSingleProjectQuery,
} = projectApi;
