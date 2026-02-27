import React from "react";

export default function SkeletonMessageBubble({ align = "left", width = "60%" }: { align?: "left" | "right"; width?: string | number }) {
  const alignClass = align === "right" ? "justify-end" : "justify-start";
  const bubbleClass = align === "right" ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700";

  return (
    <div className={`flex ${alignClass} px-[11.23px]`}> 
      <div className={`rounded-[12px] ${bubbleClass} animate-pulse`} style={{ width }}>
        <div style={{ height: 12 }} />
      </div>
    </div>
  );
}
