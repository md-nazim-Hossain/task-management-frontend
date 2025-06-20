// src/redux/api/taskApi.ts

import type { IAPIResponse, INotification } from "@/types";
import { apiSlice } from "./api-slice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<
      IAPIResponse<{ data: INotification[]; unreadCount: number }>,
      void
    >({
      query: () => "/notification/my-notifications",
      providesTags: ["Notification"],
    }),

    readNotification: builder.mutation<INotification, string>({
      query: (id) => ({
        url: `/notification/read-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteNotification: builder.mutation<INotification, string>({
      query: (id) => ({
        url: `/notification/delete-notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useReadNotificationMutation,
  useDeleteNotificationMutation,
} = taskApi;
