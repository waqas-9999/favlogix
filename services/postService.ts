import { apiClient } from "../utils/apiClient";
import { Message } from "../types";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = (
  userId?: number,
  limit?: number
): Promise<Post[]> => {
  const params: Record<string, any> = {};
  if (userId !== undefined) params.userId = userId;
  if (limit !== undefined) params.limit = limit;
  return apiClient.get<Post[]>("/api/posts", params);
};