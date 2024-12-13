import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateProduct, Size } from "@/types/types";

const baseUrl = "https://store-backend-qjoq.onrender.com/api/v1/";

interface CreateProductResponse {
  status: "success" | "error";
  message: string;
  data: CreateProduct;
}

interface CreateSizeResponse {
  status: "success" | "error";
  message: string;
  data: Size;
}

interface GetSizesResponse {
  status: "success" | "error";
  message: string;
  data: Size[];
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<
      CreateProductResponse,
      Partial<CreateProduct>
    >({
      query: (body) => ({
        url: "products/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    createSize: builder.mutation<CreateSizeResponse, Partial<Size>>({
      query: (body) => ({
        url: "products/size/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getSizes: builder.query<GetSizesResponse, void>({
      query: () => "products/sizes",
    }),
  }),
});

export const {
  useCreateProductMutation,
  useCreateSizeMutation,
  useGetSizesQuery,
} = productApi;
