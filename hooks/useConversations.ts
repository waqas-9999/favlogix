import { useState, useEffect } from "react";
import { Conversation } from "../types";
import * as userService from "../services/userService";
import * as postService from "../services/postService";

export function useConversations(
  filter: "all" | "my_inbox" | "unassigned" = "all"
) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    setLoading(true);
    // Fetch users and posts, then map users -> Conversation
    (async () => {
      try {
        const [users, posts] = await Promise.all([userService.getUsers(), postService.getPosts()]);
        // artificial delay so skeletons are visible
        await delay(2000);

        if (!mounted) return;
        const convs: Conversation[] = users.map((u) => {
          const userId = typeof (u as any).id === 'number' ? (u as any).id : Number((u as any).id);
          const userPosts = posts.filter((p) => p.userId === userId);
          const latest = userPosts.length ? userPosts[0] : null;

          const channels: Conversation['channel'][] = ["whatsapp", "instagram", "email", "direct"];
          const teams: Conversation['team'][] = ["sales", "customer_support", null];
          const statuses: Conversation['status'][] = ["open", "closed", "unassigned"];

          const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

          const contactName = (u as any).name || (u as any).username || `User ${userId}`;

          const conv: Conversation = {
            id: String((u as any).id),
            contactName,
            contactAvatar: contactName[0] || "U",
            lastMessage: latest ? `${latest.title}` : "No messages yet",
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)).toISOString(),
            channel: rand(channels),
            status: rand(statuses),
            assignee: Math.random() > 0.6 ? { id: `a-${userId}`, name: `Agent ${Math.floor(Math.random() * 10) + 1}`, avatar: "" } : null,
            team: rand(teams),
            unreadCount: Math.floor(Math.random() * 3),
            label: Math.random() > 0.8 ? "VIP" : null,
          };
          return conv;
        });

        let filtered = convs;
        if (filter === "my_inbox") {
          filtered = convs.filter((c) => c.status === "open");
        } else if (filter === "unassigned") {
          filtered = convs.filter((c) => c.status === "unassigned");
        }
        setConversations(filtered);
      } catch (err: any) {
        setError(err?.message || "Error fetching conversations");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [filter]);

  return { conversations, loading, error };
}