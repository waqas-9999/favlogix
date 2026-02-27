import { Message, AIMessage } from "../types";

// threads keyed by conversationId
const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      conversationId: "1",
      sender: "customer",
      senderName: "Sarah Johnson",
      content: "Hi, I lost access to my account and can't log in.",
      timestamp: "2026-02-26T23:08:00.000Z",
      isRead: true,
    },
    {
      id: "m2",
      conversationId: "1",
      sender: "ai",
      senderName: "Michael",
      content: "Hello Sarah 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
      timestamp: "2026-02-26T23:08:30.000Z",
      isRead: true,
    },
    {
      id: "m3",
      conversationId: "1",
      sender: "customer",
      senderName: "Sarah Johnson",
      content: "Yes, it's sarah.j@example.com",
      timestamp: "2026-02-26T23:10:00.000Z",
      isRead: true,
    },
    {
      id: "m4",
      conversationId: "1",
      sender: "ai",
      senderName: "Michael",
      content: "Thanks! I've sent a password reset link. Let me know once you're back in.",
      timestamp: "2026-02-26T23:10:20.000Z",
      isRead: true,
    },
  ],
  "2": [
    {
      id: "m5",
      conversationId: "2",
      sender: "customer",
      senderName: "Marcus Lee",
      content: "My bill seems incorrect this month.",
      timestamp: "2026-02-26T22:00:00.000Z",
      isRead: false,
    },
    {
      id: "m6",
      conversationId: "2",
      sender: "ai",
      senderName: "Michael",
      content: "Hi Marcus, I'm sorry about that. Could you tell me the invoice number so I can take a look?",
      timestamp: "2026-02-26T22:01:00.000Z",
      isRead: false,
    },
    {
      id: "m7",
      conversationId: "2",
      sender: "customer",
      senderName: "Marcus Lee",
      content: "It's INV-12345.",
      timestamp: "2026-02-26T22:02:00.000Z",
      isRead: false,
    },
    {
      id: "m8",
      conversationId: "2",
      sender: "ai",
      senderName: "Michael",
      content: "Thanks, I see the overcharge and have issued a refund. You'll see it in 3–5 business days.",
      timestamp: "2026-02-26T22:03:00.000Z",
      isRead: false,
    },
  ],
};

export default mockMessages;