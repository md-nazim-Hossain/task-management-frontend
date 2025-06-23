// src/redux/api/taskApi.ts

import type { IAPIResponse, IFromUpdateData, ITask } from "@/types";
import { apiSlice } from "./api-slice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/task/all-tasks",
      providesTags: ["Task"],
    }),

    getSingleTask: builder.query<ITask, string>({
      query: (id) => `/task/${id}`,
      providesTags: ["Task"],
    }),

    getMyTasks: builder.query<IAPIResponse<ITask[]>, Record<string, any>>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else if (value) {
            searchParams.set(key, String(value));
          }
        });

        return `/task/my-tasks?${searchParams.toString()}`;
      },
    }),

    getTasksByProject: builder.query<
      IAPIResponse<ITask[]>,
      Record<string, any>
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else if (value) {
            searchParams.set(key, String(value));
          }
        });

        return `/task/get-task-by-category?${searchParams.toString()}`;
      },
    }),

    deleteTask: builder.mutation<ITask, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Task",
        "Project",
        "SingleProject",
        "Notification",
        "MyTasks",
      ],
    }),

    updateTask: builder.mutation<ITask, IFromUpdateData>({
      query: ({ id, body }) => ({
        url: `/task/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        "Task",
        "Project",
        "SingleProject",
        "Notification",
        "MyTasks",
      ],
    }),

    createTask: builder.mutation<ITask, Partial<ITask>>({
      query: (task) => ({
        url: "/task/create-task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task", "Project", "SingleProject", "MyTasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetMyTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useGetSingleTaskQuery,
  useGetTasksByProjectQuery,
} = taskApi;
