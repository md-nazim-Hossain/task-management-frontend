import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as any)?.auth?.accessToken ||
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRlZTIxNjJjNDJiYjA4OTVhMjkwZmQiLCJyb2xlIjoidXNlciIsImVtYWlsIjoibmF6aW1AZ21haWwuY29tIiwiaWF0IjoxNzUwMzg5OTA4LCJleHAiOjE3NTU1NzM5MDh9.JOT9614dUnGON9GaNwIxqwX5JthVzG8N6c2UeyuBYNw`;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Task", "Notification", "User", "Group", "Project", "Auth"],
  endpoints: () => ({}),
});
