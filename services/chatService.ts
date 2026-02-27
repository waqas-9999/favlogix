import { Conversation, Message, AIMessage } from "../types";
import mockConversations from "../data/mockConversations";
import mockMessages from "../data/mockMessages";
import * as productService from "./productService";

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
  return new Promise(async (resolve) => {
    // simulate typing delay
    setTimeout(async () => {
      messageIdCounter++;
      let reply = "Thanks for reaching out! How can I assist you today?";
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

      // Product keyword handling
      const productKeywords = ["product", "order", "item", "plan", "subscription", "pricing", "price"];
      const hasProduct = productKeywords.some((k) => msg.includes(k));
      if (hasProduct) {
        try {
          // try to extract a query term after the keyword
          const m = userMessage.match(/\b(?:product|order|item|plan|subscription)\s+([\w-]+)/i);
          let product = null as any;
          if (m && m[1]) {
            const q = m[1];
            const res = await productService.searchProducts(q).catch(() => null);
            if (res && Array.isArray(res.products) && res.products.length) product = res.products[0];
          }
          // fallback: fetch a random product
          if (!product) {
            const randSkip = Math.floor(Math.random() * 20);
            const res = await productService.getProducts(1, randSkip).catch(() => null);
            if (res && Array.isArray(res.products) && res.products.length) product = res.products[0];
          }
          if (product) {
            const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;
            reply = `${reply} I can see you're asking about our ${product.title} priced at $${price} — let me help you with that.`;
          }
        } catch (e) {
          // ignore product errors and fall back to default reply
        }
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