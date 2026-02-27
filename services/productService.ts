import { apiClient } from "../utils/apiClient";
import { Product, ProductsResponse } from "../types";

export const getProducts = (
  limit?: number,
  skip?: number,
  category?: string
): Promise<ProductsResponse> => {
  const params: Record<string, any> = {};
  if (limit !== undefined) params.limit = limit;
  if (skip !== undefined) params.skip = skip;
  if (category) params.category = category;
  return apiClient.get<ProductsResponse>("/api/products", params);
};

export const searchProducts = (query: string): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>("/api/products", { search: query });
};

export const getProductById = (id: number): Promise<Product> => {
  return apiClient.get<Product>(`/api/products/${id}`);
};