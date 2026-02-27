export type Message = {
  id: string;
  conversationId: string;
  sender: "customer" | "agent" | "ai";
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
};

export interface AIMessage extends Message {
  sender: "ai";
  agentName: string;
}
