import React, { useMemo } from "react";

type Props = {
  align?: "left" | "right";
  width?: string | number;
};

export default function SkeletonMessageBubble({
  align = "left",
  width = "65%",
}: Props) {
  const isRight = align === "right";

  const height = useMemo(() => {
    const heights = [120, 72, 96, 48];
    return heights[Math.floor(Math.random() * heights.length)];
  }, []);

  return (
    <div
      className={`flex flex-col ${
        isRight ? "items-end" : "items-start"
      } px-[11.23px] py-1.5`}
    >
      {/* Bubble */}
      <div
        className={`rounded-2xl animate-pulse ${
          isRight ? "bg-[#F0F1EF]" : "bg-[#EFF2F2]"
        }`}
        style={{
          width,
          height,
        }}
      />

      <div className="mt-1 h-2.5" />
    </div>
  );
}