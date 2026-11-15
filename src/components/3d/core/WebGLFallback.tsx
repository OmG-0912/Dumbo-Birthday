"use client";

import React from "react";
import { RoomIllustration } from "@/components/ui/RoomIllustration";

interface WebGLFallbackProps {
  message?: string;
  className?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  message = "A serene watercolor glimpse of the enchanted garden.",
  className = "",
}) => {
  return (
    <div
      className={`relative w-full h-full min-h-[360px] rounded-3xl bg-parchment-100 border border-gold/30 p-8 flex flex-col items-center justify-center text-center shadow-storybook overflow-hidden ${className}`}
    >
      <div className="max-w-md w-full rounded-2xl overflow-hidden border border-gold/25 shadow-inner mb-4">
        <RoomIllustration type="garden" className="w-full h-48 sm:h-56" />
      </div>
      <p className="font-serif italic text-cocoa-light text-sm max-w-sm">
        {message}
      </p>
      <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mt-2">
        Storybook 2D Sanctuary Mode
      </span>
    </div>
  );
};
