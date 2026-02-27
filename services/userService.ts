import { apiClient } from "../utils/apiClient";
import { User } from "../types";

export const getUsers = (search?: string): Promise<User[]> => {
  const params: Record<string, any> = {};
  if (search) params.search = search;
  return apiClient.get<User[]>("/api/users", params);
};

export const getUserById = (id: number): Promise<User> => {
  return apiClient.get<User>(`/api/users/${id}`);
};