import React from "react";

export default function SkeletonDetailsPanel() {
  return (
    <div className="animate-pulse p-[11.23px]">
      <div className="flex items-center flex-col gap-3">
        <div className="w-[72px] h-[72px] rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-[12px] bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-[10px] bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-[10px] bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="flex gap-2 mt-2">
          <div className="h-[19.65px] w-[75px] rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-[19.65px] w-[56px] rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
