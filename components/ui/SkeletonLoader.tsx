import React from "react";

interface SkeletonLoaderProps {
  rows: number;
}

export default function SkeletonLoader({ rows }: SkeletonLoaderProps) {
  const bars = Array.from({ length: rows });
  return (
    <div className="animate-pulse space-y-2">
      {bars.map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 rounded w-full"
        ></div>
      ))}
    </div>
  );
}
