"use client";

import React from "react";

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle Paper Grain & Deckle Texture Canvas */}
      <div
        className="absolute inset-0 opacity-[0.45] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(247, 239, 227, 0.8) 0%, rgba(250, 245, 237, 0.4) 60%), radial-gradient(circle at 100% 100%, rgba(232, 201, 202, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* 2. Top-Left Delicate Botanical Silhouettes */}
      <svg
        className="absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96 text-sage/20 opacity-70"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Soft curving fern fronds & olive leaf branches */}
        <path
          d="M10 10 Q60 50 110 30 Q160 10 190 70"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M40 30 Q35 15 50 12 Q65 15 55 35 Z" fill="currentColor" opacity="0.6" />
        <path d="M70 40 Q65 25 80 20 Q95 25 85 45 Z" fill="currentColor" opacity="0.6" />
        <path d="M105 35 Q105 18 120 18 Q130 28 118 42 Z" fill="currentColor" opacity="0.6" />
        <path d="M135 30 Q140 12 155 18 Q160 32 145 40 Z" fill="currentColor" opacity="0.6" />
        {/* Secondary delicate vine */}
        <path
          d="M0 60 Q40 90 70 80 Q110 70 130 110"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="35" cy="72" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="65" cy="85" r="5" fill="currentColor" opacity="0.5" />
        <circle cx="95" cy="76" r="4" fill="currentColor" opacity="0.5" />
      </svg>

      {/* 3. Mid-Right Graceful Rose & Leaf Flourish */}
      <svg
        className="absolute top-[35%] -right-8 w-64 h-80 sm:w-80 sm:h-96 text-gold/15 opacity-60"
        viewBox="0 0 200 240"
        fill="none"
      >
        <path
          d="M190 10 Q140 80 150 140 Q160 200 120 230"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="155" cy="80" r="14" fill="#E8C9CA" opacity="0.25" />
        <circle cx="145" cy="140" r="16" fill="#C5A16B" opacity="0.2" />
        <circle cx="130" cy="195" r="12" fill="#E8C9CA" opacity="0.22" />
        {/* Soft leaf sprigs */}
        <path d="M165 60 Q180 50 185 65 Q175 75 160 68 Z" fill="currentColor" opacity="0.5" />
        <path d="M140 115 Q120 110 125 125 Q135 130 145 120 Z" fill="currentColor" opacity="0.5" />
        <path d="M155 170 Q175 165 178 180 Q165 188 152 176 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* 4. Bottom-Left Foliage Margin */}
      <svg
        className="absolute -bottom-10 -left-10 w-64 h-64 sm:w-80 sm:h-80 text-sage/15 opacity-60"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 190 Q60 140 110 160 Q160 180 190 130"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="60" cy="155" r="6" fill="currentColor" opacity="0.4" />
        <circle cx="100" cy="158" r="7" fill="currentColor" opacity="0.4" />
        <circle cx="145" cy="165" r="6" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
};
