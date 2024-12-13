import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "@/types/types";

const baseUrl = "https://store-backend-qjoq.onrender.com/api/v1/";

interface CreateCategoryResponse {
  status: "success" | "error";
  message: string;
  data: Category;
}

interface GetCategoryResponse {
  status: "success" | "error";
  message: string;
  data: Category[];
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryResponse, Partial<Category>>(
      {
        query: (body) => ({
          url: "categories/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Category"],
      }
    ),
    getCategories: builder.query<GetCategoryResponse, void>({
      query: () => "categories",
      providesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
