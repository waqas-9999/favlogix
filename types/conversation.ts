export type Assignee = {
  id: string;
  name: string;
  avatar: string;
};

export type Conversation = {
  id: string;
  contactName: string;
  contactAvatar: string;
  lastMessage: string;
  timestamp: string;
  channel: "whatsapp" | "instagram" | "email" | "direct";
  status: "open" | "closed" | "unassigned";
  assignee: Assignee | null;
  team: "sales" | "customer_support" | null;
  unreadCount: number;
  label: string | null;
};
