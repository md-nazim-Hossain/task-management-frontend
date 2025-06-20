// src/redux/api/taskApi.ts

import type { IAPIResponse, ITaskComment } from "@/types";
import { apiSlice } from "./api-slice";

export const taskCommentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaskComments: builder.query<IAPIResponse<ITaskComment[]>, string>({
      query: (id) => `/task-comment/all-task-comments/${id}`,
      providesTags: ["Comment", "Project"],
    }),

    deleteTaskComment: builder.mutation<ITaskComment, string>({
      query: (id) => ({
        url: `/task-comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment", "Task", "Project", "SingleProject"],
    }),

    updateTaskComment: builder.mutation<ITaskComment, Partial<ITaskComment>>({
      query: (comment) => ({
        url: `/task-comment/${comment._id}`,
        method: "PATCH",
        body: comment,
      }),
      invalidatesTags: ["Comment", "Task"],
    }),

    createTaskComment: builder.mutation<ITaskComment, Partial<ITaskComment>>({
      query: (comment) => ({
        url: "/task-comment/create-task-comment",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment", "Task", "Project", "SingleProject"],
    }),
  }),
});

export const {
  useGetTaskCommentsQuery,
  useDeleteTaskCommentMutation,
  useUpdateTaskCommentMutation,
  useCreateTaskCommentMutation,
} = taskCommentApi;
