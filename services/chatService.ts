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
  const msgs = messagesMap[conversationId];
  if (msgs && msgs.length) return Promise.resolve(msgs);

  // generate a single opening message when none exist
  const openers = [
    "Hey, I need some help with my account.",
    "Hi there, I have a question about my recent order.",
    "Hello, I'm having trouble logging in.",
    "Hi, I'd like to know more about my subscription.",
  ];

  // derive an index from conversationId deterministically
  let idx = 0;
  if (conversationId) {
    let sum = 0;
    for (let i = 0; i < conversationId.length; i++) sum += conversationId.charCodeAt(i);
    idx = sum % openers.length;
  }

  // try to find contact name from conversations list
  const conv = conversations.find((c) => String(c.id) === String(conversationId));
  const senderName = conv?.contactName || "Customer";

  messageIdCounter++;
  const opener: Message = {
    id: `msg-${messageIdCounter}`,
    conversationId,
    sender: "customer",
    senderName,
    content: openers[idx],
    timestamp: "Just now",
    isRead: false,
  };

  // store it so subsequent calls see the opener
  messagesMap[conversationId] = [opener];
  return Promise.resolve(messagesMap[conversationId]);
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
      const msg = userMessage.toLowerCase();

      // product handling
      const productKeywords = ["product", "order", "item", "plan", "subscription", "pricing", "price"];
      const hasProduct = productKeywords.some((k) => msg.includes(k));
      if (hasProduct) {
        try {
          let product = null as any;
          const m = userMessage.match(/\b(?:product|order|item|plan|subscription)\s+([\w-\s]+)/i);
          if (m && m[1]) {
            const q = m[1].trim();
            const res = await productService.searchProducts(q).catch(() => null);
            if (res && Array.isArray(res.products) && res.products.length) product = res.products[0];
          }
          if (!product) {
            const randSkip = Math.floor(Math.random() * 20);
            const res = await productService.getProducts(1, randSkip).catch(() => null);
            if (res && Array.isArray(res.products) && res.products.length) product = res.products[0];
          }
          if (product) {
            const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;
            const reply = `I can see you're asking about our ${product.title} priced at $${price}. How can I assist you with that?`;
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
            return;
          }
        } catch (e) {
          // ignore and continue to fallback
        }
      }

      if (msg.includes("login")) {
        const reply = "It looks like you're having trouble logging in. Please click 'Forgot Password' on the login page, enter your account email, and follow the reset link. If you don't receive an email, check your spam folder or reply here and I can assist further.";
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
        return;
      }

      if (msg.includes("billing")) {
        const reply = "For billing inquiries, please provide your account number or invoice ID and a brief description of the issue. I'll check the transaction and get back to you with details and next steps.";
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
        return;
      }

      if (msg.includes("cancel")) {
        const reply = "To cancel your subscription, go to your account settings, choose 'Subscription' and select 'Cancel Subscription'. If you prefer, provide your account email and I can submit the cancellation for you and confirm when it's processed.";
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
        return;
      }

      // default standalone message
      const defaultReply = `Hi! I'm ${agentName}, your support assistant. How can I help you today?`;
      const aiMsg: AIMessage = {
        id: `msg-${messageIdCounter}`,
        conversationId: "",
        sender: "ai",
        senderName: agentName,
        content: defaultReply,
        timestamp: new Date().toISOString(),
        isRead: false,
        agentName,
      };
      resolve(aiMsg);
    }, Math.random() * 1000 + 1000);
  });
};