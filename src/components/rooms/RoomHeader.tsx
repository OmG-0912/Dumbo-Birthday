"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";

interface RoomHeaderProps {
  roomNumber: string; // e.g. "Room I"
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  badgeCategory?: string;
  stats?: { label: string; count: number | string }[];
  children?: React.ReactNode;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({
  roomNumber,
  title,
  subtitle,
  description,
  badgeCategory = "Sanctuary Chamber",
  stats,
  children,
}) => {
  const { isNight } = useGardenAtmosphere();

  return (
    <div className="mb-10 sm:mb-14">
      {/* Return to Storybook Link */}
      <Link
        href="/"
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors mb-6 group ${
          isNight ? "text-[#FDE08B] hover:text-white" : "text-gold hover:text-cocoa"
        }`}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Return to Garden</span>
      </Link>

      <div
        className={`rounded-3xl p-6 sm:p-10 border transition-all duration-500 relative overflow-hidden ${
          isNight
            ? "bg-[#132521]/90 backdrop-blur-md border-[#B88B4A]/40 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-[#FAF5ED]"
            : "bg-[#FCFAF6]/90 backdrop-blur-md border-gold/30 shadow-storybook text-cocoa"
        }`}
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gold/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-serif font-bold tracking-widest uppercase mb-2">
              <Sparkles className={`w-3.5 h-3.5 ${isNight ? "text-[#FDE08B]" : "text-gold"}`} />
              <span className={isNight ? "text-[#FDE08B]" : "text-gold"}>
                {roomNumber} • {badgeCategory}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight">
              {title}
            </h1>

            <p
              className={`font-serif italic text-base sm:text-lg mt-2 ${
                isNight ? "text-[#D6A0A0]" : "text-gold-deep"
              }`}
            >
              {subtitle}
            </p>

            <BotanicalDivider variant={isNight ? "celestial" : "floral"} className="my-5" />

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isNight ? "text-parchment-200/80" : "text-cocoa-light"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Optional Stats or Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {stats && stats.length > 0 && (
              <div
                className={`flex items-center gap-3 p-2.5 rounded-2xl border ${
                  isNight
                    ? "bg-[#18312B] border-[#B88B4A]/30"
                    : "bg-[#F7F2EA] border-gold/20"
                }`}
              >
                {stats.map((st, i) => (
                  <div key={i} className="px-3 text-center border-r last:border-r-0 border-gold/20">
                    <span className="block font-serif text-lg sm:text-xl font-bold text-gold">
                      {st.count}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-medium ${
                        isNight ? "text-parchment-300/70" : "text-cocoa/60"
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
