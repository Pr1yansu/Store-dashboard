import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, CreateUser } from "@/types/types";

const baseUrl = "http://localhost:5000/api/v1/";

interface CreateUserResponse {
  status: "success" | "error";
  message: string;
  data: User;
}

interface GetUserResponse {
  status: "success" | "error";
  message: string;
  data: User;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUserResponse, Partial<CreateUser>>({
      query: (body) => ({
        url: "users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: () => "users/me",
      providesTags: ["User"],
    }),
    login: builder.mutation<GetUserResponse, Partial<User>>({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<GetUserResponse, void>({
      query: () => "users/logout",
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
