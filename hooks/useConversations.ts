import { useState, useEffect } from "react";
import { Conversation } from "../types";
import { getConversations } from "../services/chatService";

export function useConversations(
  filter: "all" | "my_inbox" | "unassigned" = "all"
) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then((data) => {
        let filtered = data;
        if (filter === "my_inbox") {
          filtered = data.filter((c) => c.status === "open");
        } else if (filter === "unassigned") {
          filtered = data.filter((c) => c.status === "unassigned");
        }
        setConversations(filtered);
      })
      .catch((err) => {
        setError(err.message || "Error fetching conversations");
      })
      .finally(() => setLoading(false));
  }, [filter]);

  return { conversations, loading, error };
}