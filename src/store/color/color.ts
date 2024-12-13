import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Color } from "@/types/types";

const baseUrl = "http://localhost:5000/api/v1/";

interface CreateColorResponse {
  status: "success" | "error";
  message: string;
  data: Color;
}

interface ColorResponse {
  status: "success" | "error";
  data: Color[];
}

export const colorApi = createApi({
  reducerPath: "colorApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Color"],
  endpoints: (builder) => ({
    createColor: builder.mutation<CreateColorResponse, Partial<Color>>({
      query: (body) => ({
        url: "products/color/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Color"],
    }),
    getColors: builder.query<ColorResponse, void>({
      query: () => `products/colors`,
    }),
  }),
});

export const { useCreateColorMutation, useGetColorsQuery } = colorApi;
