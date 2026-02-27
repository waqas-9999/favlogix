import { useState, useEffect } from "react";
import { User } from "../types";
import * as userService from "../services/userService";

export function useUsers(search?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    setLoading(true);
    (async () => {
      try {
        const res = await userService.getUsers(search);
        await delay(1500);
        if (mounted) setUsers(res);
      } catch (err: any) {
        if (mounted) setError(err.message || "Error loading users");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [search]);

  return { users, loading, error };
}