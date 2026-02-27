"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useState } from "react";
import { useInbox } from "@/store/inboxStoreV2";
import { useConversations } from "@/hooks/useConversations";
import { SkeletonLoader, ErrorMessage } from "@/components/ui";
import { Conversation } from "@/types";

type SortOption = "newest" | "oldest" | "alphabetical";

function Conversations() {
  const { state, dispatch } = useInbox();
  const { conversations, loading, error } = useConversations(state.activeFilter);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Find active conversation for header display
  const activeConversation = conversations.find(c => c.id === state.activeConversationId);

  // Filter conversations
  const filtered = conversations.filter((conv) => {
    let matches = true;
    if (state.activeChannel !== "all") {
      matches = matches && conv.channel === state.activeChannel;
    }
    if (state.activeTeam !== "all") {
      matches = matches && conv.team === state.activeTeam;
    }
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      matches = matches && (conv.contactName.toLowerCase().includes(query) || conv.lastMessage.toLowerCase().includes(query));
    }
    return matches;
  });

  // Helper function to get numeric value for time ago
  const getTimeValue = (timestamp: string): number => {
    const timeOrder: Record<string, number> = {
      '2m ago': 2,
      '1h ago': 60,
      '1d ago': 1440,
      '2d ago': 2880,
      'Yesterday': 1440,
      '1 day ago': 1440,
      '2 days ago': 2880,
    };
    
    for (const [key, minutes] of Object.entries(timeOrder)) {
      if (timestamp.includes(key)) return minutes;
    }
    
    try {
      return new Date(timestamp).getTime();
    } catch {
      return 0;
    }
  };

  const formatRelative = (iso: string) => {
    try {
      const now = Date.now();
      const then = new Date(iso).getTime();
      const diff = Math.floor((now - then) / 1000);
      if (diff < 60) return "Just now";
      const mins = Math.floor(diff / 60);
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days === 1) return "Yesterday";
      return `${days}d ago`;
    } catch {
      return iso;
    }
  };

  // Sort conversations
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") {
      return getTimeValue(a.timestamp) - getTimeValue(b.timestamp);
    } else if (sortBy === "oldest") {
      return getTimeValue(b.timestamp) - getTimeValue(a.timestamp);
    } else if (sortBy === "alphabetical") {
      return a.contactName.localeCompare(b.contactName);
    }
    return 0;
  });

  if (loading) return <SkeletonLoader rows={5} />;
  if (error) return <ErrorMessage message={error} />;

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "my_inbox", label: "My Inbox" },
    { value: "unassigned", label: "Unassigned" },
  ];

  const sortOptions = [
    { value: "newest" as SortOption, label: "Newest" },
    { value: "oldest" as SortOption, label: "Oldest" },
    { value: "alphabetical" as SortOption, label: "Alphabetical" },
  ];

  return (
    <div className="min-w-62.25 w-full bg-[#FAFAF8] rounded-tr-[11.23px] rounded-br-[11.23px] h-auto lg:h-[90vh]">
      
      {/* Header - Shows active conversation name or "Conversations" */}
      <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px]">
        <div className="flex gap-[8.42px] items-center">
          <button>
            <Image src="/icons/tab.svg" alt="tab" width={22} height={22} />
          </button>
          <span className="text-[12.63px] font-[656]">
            {activeConversation ? activeConversation.contactName : "Conversations"}
          </span>
        </div>
        <button>
          <Image src="/icons/edit.svg" alt="edit" width={22} height={22} />
        </button>
      </div>

      <div className="px-[8.42px] py-[5.61px]">
        
        {/* Search */}
        <div className="px-[11.23px] py-[5.61px] flex justify-between w-full items-center h-[42.11px]">
          <div className="flex gap-[8.42px] items-center">
            <button>
              <Image src="/icons/search.svg" alt="search" width={10} height={10} />
            </button>
            <input
              placeholder="Search Chat"
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
              className="text-[9.82px] placeholder:text-[#000000]/30 font-[556] flex-1"
            />
          </div>
          <button>
            <Image src="/icons/filter.svg" alt="filter" width={14} height={14} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between h-8 w-full items-center relative">
          {/* Status Filter Dropdown */}
          <div className="flex items-center w-full px-[7.02px] relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-1 text-[9.82px] font-[656] hover:bg-gray-100 px-2 py-1 rounded"
            >
              <span className="capitalize">{state.activeFilter}</span>
              <Image src="/icons/down.svg" alt="down" width={14} height={14} />
            </button>
            
            {showStatusDropdown && (
              <div className="absolute top-8 left-0 bg-white border border-[#D8DEE4] rounded-[5.61px] shadow-lg z-50">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      dispatch({ type: "SET_FILTER", payload: option.value as "all" | "my_inbox" | "unassigned" });
                      setShowStatusDropdown(false);
                    }}
                    className={`block w-full text-left px-[11.23px] py-[8.42px] text-[9.82px] font-[556] hover:bg-gray-50 ${
                      state.activeFilter === option.value ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-end w-full px-[7.02px] relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1 text-[9.82px] font-[656] hover:bg-gray-100 px-2 py-1 rounded"
            >
              <span className="capitalize">{sortBy}</span>
              <Image src="/icons/down.svg" alt="down" width={14} height={14} />
            </button>
            
            {showSortDropdown && (
              <div className="absolute top-8 right-0 bg-white border border-[#D8DEE4] rounded-[5.61px] shadow-lg z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`block w-full text-left px-[11.23px] py-[8.42px] text-[9.82px] font-[556] hover:bg-gray-50 ${
                      sortBy === option.value ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex flex-col gap-[2.81px]">
          {sorted.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">
              No conversations found
            </div>
          ) : (
            sorted.map((conv: Conversation) => (
              <button
                key={conv.id}
                onClick={() => dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conv.id })}
                className={`${
                  state.activeConversationId === conv.id
                    ? "border-[0.7px] border-[#0000001F] shadow-[0px_2.81px_8.42px_0px_#E7EBEC]"
                    : ""
                } bg-[#FFFFFF] rounded-[5.61px] h-12.5 px-[8.42px] py-[5.61px] flex items-center gap-[8.42px] w-full hover:bg-gray-50 transition-colors`}
              >
                <div className="flex-shrink-0">
                  {/** Use DiceBear initials avatar or fallback to initial */}
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(conv.contactName)}`}
                    alt={conv.contactName}
                    className="w-[19.65px] h-[19.65px] rounded-full"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex w-full items-start justify-between">
                    <span className="text-[9.82px] font-[656]">
                      {conv.contactName}
                    </span>
                    <span className="text-[7.72px] text-[#000000CC] font-[556]">
                      {formatRelative(conv.timestamp)}
                    </span>
                  </div>

                  <span className="text-[9.82px] font-[457] text-[#00000080] truncate">
                    {conv.lastMessage}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
