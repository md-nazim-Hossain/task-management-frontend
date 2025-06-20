import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      (import.meta.env.VITE_API_URL ?? "http://localhost:5000") + "/api/v1",
    credentials: "include",
  }),
  tagTypes: [
    "Task",
    "Notification",
    "User",
    "Group",
    "Project",
    "Auth",
    "Comment",
    "SingleProject",
  ],
  endpoints: () => ({}),
});
