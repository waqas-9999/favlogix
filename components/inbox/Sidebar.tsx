"use client";

import Image from "next/image";
import { useInbox } from "@/store/inboxStoreV2";
import { useMemo } from "react";
import { Conversation } from "@/types/conversation";

type Item = {
  label: string;
  icon: string;
  count?: number;
  filterKey?: string;
};

type Props = {
  conversations?: Conversation[];
};

// inboxItems will be computed inside the component so counts stay in sync

const teamItems: Item[] = [
  { label: "Sales", icon: "/icons/user.svg", count: 7, filterKey: "sales" },
  { label: "Customer Support", icon: "/icons/user.svg", count: 16, filterKey: "customer_support" },
];

const channelItems: Item[] = [
  { label: "WhatsApp", icon: "/icons/whatsapp.svg", filterKey: "whatsapp" },
  { label: "Instagram", icon: "/icons/insta.svg", filterKey: "instagram" },
];

function Sidebar({ conversations }: Props) {
  const { state, dispatch } = useInbox();

  const agentName = process.env.NEXT_PUBLIC_AI_AGENT_NAME || "Michael";

  const counts = useMemo(() => {
    const all = conversations ? conversations.length : 0;
    const myInbox = conversations
      ? conversations.filter((c) => c.assignee?.name === agentName).length
      : 0;
    const unassigned = conversations ? conversations.filter((c) => c.status === "unassigned").length : 0;
    return { all, myInbox, unassigned };
  }, [conversations, agentName]);

  const inboxItems: Item[] = [
    { label: "My Inbox", icon: "/icons/profile.svg", count: counts.myInbox, filterKey: "my_inbox" },
    { label: "All", icon: "/icons/profiles.svg", count: counts.all, filterKey: "all" },
    { label: "Unassigned", icon: "/icons/unassigned.svg", count: counts.unassigned, filterKey: "unassigned" },
  ];
  return (
    <div className="min-w-42 w-full bg-[#FAFAF8] rounded-tl-[11.23px] border-r border-[#0000003D] rounded-bl-[11.23px] h-auto lg:h-[90vh]">
      <div className="px-[11.23px] py-[5.61px] flex justify-start items-center h-[42.11px]">
        <span className="text-[12.63px] font-[790]">Inbox</span>
      </div>

      <div className="flex flex-col gap-2 px-[7.02px]">

        {/* Inbox */}
        <div className="flex flex-col gap-0.5 mr-0.5">
          {inboxItems.map((item, index) => {
            if (!item.count) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (item.filterKey) {
                      dispatch({
                        type: "SET_FILTER",
                        payload: item.filterKey as "all" | "my_inbox" | "unassigned",
                      });
                    }
                  }}
                  className={`text-[9.82px] font-[556] h-6.5 rounded-[5.61px] ${
                    state.activeFilter === item.filterKey
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px] text-[10.73px] font-[457]">
                    <Image src={item.icon} alt={item.label} width={14} height={14} />
                    {item.label}
                  </div>
                </button>
              );
            }

            return (
              <button
                key={index}
                onClick={() => {
                  if (item.filterKey) {
                    dispatch({
                      type: "SET_FILTER",
                      payload: item.filterKey as "all" | "my_inbox" | "unassigned",
                    });
                  }
                }}
                className={`text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px] rounded-[5.61px] ${
                  state.activeFilter === item.filterKey
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[10.73px] font-[457]">
                  <Image src={item.icon} alt={item.label} width={14} height={14} />
                  {item.label}
                </div>
                <div className="text-[#222222] font-[457] text-[8.42px] px-1 h-[11.23px]">
                  {item.count}
                </div>
              </button>
            );
          })}
        </div>

        {/* Teams Title */}
        <div className="flex justify-between items-center w-full px-[7.02px]">
          <span className="text-[9.82px] font-[556]">Teams</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-0.5">
          {teamItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.filterKey) {
                  dispatch({
                    type: "SET_TEAM",
                    payload: item.filterKey as "sales" | "customer_support" | "all",
                  });
                }
              }}
              className={`text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px] rounded-[5.61px] ${
                state.activeTeam === item.filterKey
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[9.82px] font-[457]">
                <Image src={item.icon} alt={item.label} width={14} height={14} />
                {item.label}
              </div>
              <div className="text-[#222222] font-[457] text-[8.42px] h-[11.23px] px-1">
                {item.count}
              </div>
            </button>
          ))}
        </div>

        {/* Channels Title */}
        <div className="flex justify-between items-center w-full px-[7.02px]">
          <span className="text-[9.82px] font-[556]">Channels</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-0.5">
          {channelItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.filterKey) {
                  dispatch({
                    type: "SET_CHANNEL",
                    payload: item.filterKey as "whatsapp" | "instagram" | "all",
                  });
                }
              }}
              className={`text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px] rounded-[5.61px] ${
                state.activeChannel === item.filterKey
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[9.82px] font-[457]">
                <Image src={item.icon} alt={item.label} width={14} height={14} />
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;