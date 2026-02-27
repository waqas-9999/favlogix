import { useState, useEffect } from "react";
import { Message } from "../types";
import {
  getMessagesByConversation,
  sendMessage as serviceSendMessage,
  getAIResponse,
} from "../services/chatService";

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAITyping, setIsAITyping] = useState(false);

  useEffect(() => {
    if (!conversationId) return;
    setLoading(true);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    (async () => {
      try {
        const msgs = await getMessagesByConversation(conversationId);
        // artificial delay so skeletons are visible
        await delay(1500);
        setMessages(msgs);
      } catch (err: any) {
        setError(err.message || "Error fetching messages");
      } finally {
        setLoading(false);
      }
    })();
  }, [conversationId]);

  const sendMessage = async (content: string) => {
    try {
      const customerMsg = await serviceSendMessage(conversationId, content);
      setMessages((prev) => [...prev, customerMsg]);
      setIsAITyping(true);
      const aiResp = await getAIResponse(content);
      setMessages((prev) => [...prev, aiResp]);
    } catch (err: any) {
      setError(err.message || "Error sending message");
    } finally {
      setIsAITyping(false);
    }
  };

  return { messages, sendMessage, isAITyping, loading, error };
}