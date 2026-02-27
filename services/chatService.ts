import { Conversation, Message, AIMessage } from "../types";
import mockConversations from "../data/mockConversations";
import mockMessages from "../data/mockMessages";

// keep in-memory copies so that sendMessage mutates them
let conversations: Conversation[] = [...mockConversations];
let messagesMap: Record<string, Message[]> = { ...mockMessages };

// Counter to ensure unique message IDs
let messageIdCounter = 0;

export const getConversations = async (): Promise<Conversation[]> => {
  return Promise.resolve(conversations);
};

export const getMessagesByConversation = async (
  conversationId: string
): Promise<Message[]> => {
  return Promise.resolve(messagesMap[conversationId] || []);
};

export const sendMessage = async (
  conversationId: string,
  content: string
): Promise<Message> => {
  messageIdCounter++;
  const newMsg: Message = {
    id: `msg-${messageIdCounter}`,
    conversationId,
    sender: "customer",
    senderName: "You",
    content,
    timestamp: new Date().toISOString(),
    isRead: false,
  };
  if (!messagesMap[conversationId]) {
    messagesMap[conversationId] = [];
  }
  messagesMap[conversationId].push(newMsg);
  return Promise.resolve(newMsg);
};

export const getAIResponse = async (
  userMessage: string,
  agentName: string = process.env.NEXT_PUBLIC_AI_AGENT_NAME || "Michael"
): Promise<AIMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      messageIdCounter++;
      let reply =
        "Thanks for reaching out! How can I assist you today?";
      const msg = userMessage.toLowerCase();
      if (msg.includes("login")) {
        reply =
          "It looks like you are having trouble logged in. Please try resetting your password using the 'Forgot Password' link.";
      } else if (msg.includes("billing")) {
        reply =
          "For billing inquiries, please provide your account number or invoice details and I'll look into it.";
      } else if (msg.includes("cancel")) {
        reply =
          "To cancel your subscription, go to your account settings and select 'Cancel Subscription'. Let me know if you need help.";
      }
      const aiMsg: AIMessage = {
        id: `msg-${messageIdCounter}`,
        conversationId: "",
        sender: "ai",
        senderName: agentName,
        content: reply,
        timestamp: new Date().toISOString(),
        isRead: false,
        agentName,
      };
      resolve(aiMsg);
    }, Math.random() * 1000 + 1000);
  });
};