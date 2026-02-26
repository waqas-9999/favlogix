"use client";

import React from "react";

interface RoundedPolygonProps {
  children?: React.ReactNode;
  className?: string;
  size?: number; // 👈 new prop
}

const hexPath = `
  M65 5
  H135
  Q145 5 150 15
  L185 80
  Q190 90 185 100
  L150 165
  Q145 173 135 173
  H65
  Q55 173 50 165
  L15 100
  Q10 90 15 80
  L50 15
  Q55 5 65 5
  Z
`;

export default function RoundedPolygon({
  children,
  className = "",
  size = 80, // 👈 default 80px
}: RoundedPolygonProps) {
  return (
    <div
      className={`relative group rotate-90 ${className}`}
      style={{ width: size, height: size }} // 👈 dynamic size
    >
      <svg
        viewBox="0 0 200 173"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="hoverGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="12%" stopColor="#007AEC" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#007AEC" />
          </linearGradient>
        </defs>

        {/* Base */}
        <path
          d={hexPath}
          fill="rgba(0,0,0,0.2)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.33"
        />

        {/* Hover Border */}
        <path
          d={hexPath}
          fill="transparent"
          stroke="url(#hoverGradient)"
          strokeWidth="1.33"
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 -rotate-90">
        {children}
      </div>
    </div>
  );
}