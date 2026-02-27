"use client";

import React, { ReactNode, createContext, useContext, useReducer } from "react";

export type InboxState = {
  activeConversationId: string | null;
  activeFilter: "all" | "my_inbox" | "unassigned";
  activeChannel: "all" | "whatsapp" | "instagram";
  activeTeam: "all" | "sales" | "customer_support";
  searchQuery: string;
};

export type InboxAction =
  | { type: "SET_ACTIVE_CONVERSATION"; payload: string | null }
  | { type: "SET_FILTER"; payload: InboxState["activeFilter"] }
  | { type: "SET_CHANNEL"; payload: InboxState["activeChannel"] }
  | { type: "SET_TEAM"; payload: InboxState["activeTeam"] }
  | { type: "SET_SEARCH"; payload: string };

const initialState: InboxState = {
  activeConversationId: null,
  activeFilter: "all",
  activeChannel: "all",
  activeTeam: "all",
  searchQuery: "",
};

function reducer(state: InboxState, action: InboxAction): InboxState {
  switch (action.type) {
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversationId: action.payload };
    case "SET_FILTER":
      return { ...state, activeFilter: action.payload };
    case "SET_CHANNEL":
      return { ...state, activeChannel: action.payload };
    case "SET_TEAM":
      return { ...state, activeTeam: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

type ContextValue = { state: InboxState; dispatch: React.Dispatch<InboxAction> };
const InboxContext = createContext<ContextValue | null>(null);

interface InboxProviderProps {
  children: ReactNode;
}

export const InboxProvider: React.FC<InboxProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(
    InboxContext.Provider,
    { value: { state, dispatch } },
    children
  );
};

export function useInbox(): ContextValue {
  const ctx = useContext(InboxContext);
  if (!ctx) {
    throw new Error("useInbox must be used within an InboxProvider");
  }
  return ctx;
}
