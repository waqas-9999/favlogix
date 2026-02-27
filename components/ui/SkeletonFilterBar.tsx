import Image from "next/image";
import React from "react";

export default function SkeletonFilterBar() {
  return (
    <div className="animate-pulse flex justify-between items-center h-8 w-full">
      
      {/* Left Dropdown */}
      <div className="flex items-center gap-[2.41px]">
        <div className="h-2.5 w-10 bg-[#D9D9D9] rounded-full" />
        <Image src="/icons/down-s.svg" alt="down" width={14} height={14}/>
      </div>

      {/* Right Dropdown */}
      <div className="flex items-center gap-[2.41px]">
        <div className="h-2.5 w-10 bg-[#D9D9D9] rounded-full" />
        <Image src="/icons/down-s.svg" alt="down" width={14} height={14}/>
      </div>

    </div>
  );
}