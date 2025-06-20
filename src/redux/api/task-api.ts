// src/redux/api/taskApi.ts

import type { ITask } from "@/types";
import { apiSlice } from "./api-slice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/task/all-tasks",
      providesTags: ["Task"],
    }),

    getMyTasks: builder.query<ITask[], void>({
      query: () => "/task/my-tasks",
      providesTags: ["Task"],
    }),

    deleteTask: builder.mutation<ITask, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    updateTask: builder.mutation<ITask, Partial<ITask>>({
      query: (task) => ({
        url: `/task/${task._id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    createTask: builder.mutation<ITask, Partial<ITask>>({
      query: (task) => ({
        url: "/task/create-task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task", "Project"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetMyTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateTaskMutation,
} = taskApi;
