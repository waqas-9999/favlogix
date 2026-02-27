import React from "react";

export default function SkeletonConversationItem() {
  return (
    <div>
    <div className="animate-pulse bg-white rounded-lg border border-[#E5E7EB] h-12.5 shadow-sm px-3 py-1.25 flex items-center gap-1.5 w-full">
      
      {/* Avatar */}
      <div className="w-[19.64px] h-[19.64px] rounded-full bg-[#F2F2F2] shrink-0" />

      {/* Text Content */}
      <div className="flex flex-col justify-center w-full gap-1.5">
        
        <div className="flex justify-between items-center w-full">
          <div className="h-1.5 bg-[#D9D9D9] rounded w-10" />
          <div className="h-1.5 bg-[#D9D9D9] rounded w-4" />
        </div>

        <div className="h-1.5 bg-[#E5E7EB] rounded w-[70%]" />

      </div>
    </div>
    </div>
  );
}