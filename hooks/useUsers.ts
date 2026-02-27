import { useState, useEffect } from "react";
import { User } from "../types";
import * as userService from "../services/userService";

export function useUsers(search?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    userService
      .getUsers(search)
      .then((res) => setUsers(res))
      .catch((err) => setError(err.message || "Error loading users"))
      .finally(() => setLoading(false));
  }, [search]);

  return { users, loading, error };
}