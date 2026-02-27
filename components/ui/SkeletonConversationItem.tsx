import React from "react";

export default function SkeletonConversationItem() {
  return (
    <div className="animate-pulse flex items-center gap-3 bg-transparent px-[8.42px] py-[5.61px]">
      <div className="w-[19.65px] h-[19.65px] rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="h-[10px] bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-[8px] bg-gray-200 dark:bg-gray-700 rounded w-10 ml-2" />
        </div>
        <div className="mt-2 h-[9px] bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
      </div>
    </div>
  );
}
