"use client";

import Sidebar from "@/components/inbox/Sidebar";
import Conversations from "@/components/inbox/Conversations";
import Chat from "@/components/inbox/Chat";
import Details from "@/components/inbox/Details";

export default function InboxPage() {
  return (
    <>
      {/* Main Layout */}
      <div className="hidden min-[1188px]:flex pt-[7.75px] gap-[7.75px] overflow-y-auto">
        <div className="flex">
          <Sidebar />
          <Conversations />
        </div>
        <Chat />
        <Details />
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="flex flex-col gap-[7.75px] pt-[7.75px] min-[1188px]:hidden">
        <div className="h-auto lg:h-[70vh] min-h-70 w-full overflow-auto shrink-0">
          <Sidebar />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-70 w-full overflow-auto shrink-0">
          <Conversations />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-80 w-full overflow-auto shrink-0 flex-1">
          <Chat />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-70 w-full overflow-auto shrink-0">
          <Details />
        </div>
      </div>
    </>
  );
}
