"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, ArrowDown } from "lucide-react";
import { BotanicalDivider } from "../ui/BotanicalDivider";
import { CinematicGardenBackground } from "./CinematicGardenBackground";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";

export const HeroStorybook: React.FC = () => {
  const { isNight } = useGardenAtmosphere();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 px-4 sm:px-6">
      {/* 1. Full-Bleed 4-State Cinematic Botanical Garden Background */}
      <CinematicGardenBackground />

      {/* 2. Hero Editorial Storybook Card (Day/Night Adaptive Translucent Glass) */}
      <div
        style={{
          backgroundColor: isNight
            ? "rgba(18, 34, 31, 0.80)"
            : "rgba(247, 241, 231, 0.72)",
          boxShadow: isNight
            ? "0 16px 48px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(184, 139, 74, 0.3) inset"
            : "0 12px 40px -8px rgba(23, 45, 41, 0.16), 0 0 0 1px rgba(247, 241, 231, 0.45) inset",
        }}
        className={`relative z-20 w-[calc(100%-1.5rem)] sm:w-full max-w-2xl mx-auto px-6 py-7 sm:px-10 sm:py-9 rounded-2xl border backdrop-blur-md text-center flex flex-col items-center transition-all duration-700 ${
          isNight ? "border-[#B88B4A]/50" : "border-[#B88B4A]/35"
        }`}
      >
        {/* Storybook Chronicle Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-sm border shadow-xs mb-4 max-w-full transition-all duration-500 ${
            isNight
              ? "bg-[#132521]/90 border-[#B88B4A]/55"
              : "bg-[#F7F1E7]/85 border-[#B88B4A]/40"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
              isNight ? "bg-[#FDE08B]" : "bg-[#B88B4A]"
            }`}
          />
          <span
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] font-semibold ${
              isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
            }`}
          >
            Chapter I • The Living Storybook
          </span>
          <span
            className={`hidden sm:inline text-[11px] font-serif italic ${
              isNight ? "text-[#F7F1E7]/80" : "text-[#60463E]/80"
            }`}
          >
            Edition 2026
          </span>
        </div>

        {/* Primary Storybook Heading - Cormorant Garamond */}
        <h1
          className={`font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.14] tracking-tight transition-colors duration-500 ${
            isNight
              ? "text-[#F7F1E7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
              : "text-[#3D2A24] drop-shadow-[0_1px_6px_rgba(247,241,231,0.9)]"
          }`}
        >
          Come wander through <br />
          <span
            className={`italic font-light relative inline-block mt-0.5 ${
              isNight ? "text-[#FDE08B]" : "text-[#60463E]"
            }`}
          >
            your story
            {/* Elegant curved antique-gold underline */}
            <svg
              className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full text-[#B88B4A]/90 h-2.5 sm:h-3.5"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 7 Q50 12 100 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h1>

        <BotanicalDivider
          variant="laurel"
          className="my-3.5 sm:my-4 max-w-xs mx-auto text-[#B88B4A]/80"
        />

        {/* Narrative Subtitle - DM Sans */}
        <p
          className={`font-sans text-xs sm:text-sm md:text-base font-normal max-w-lg mx-auto leading-relaxed transition-colors duration-500 ${
            isNight
              ? "text-[#F7F1E7]/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
              : "text-[#60463E] drop-shadow-[0_1px_4px_rgba(247,241,231,0.7)]"
          }`}
        >
          An enchanted sanctuary dedicated to every dream you nurture, every quiet triumph, the books that hold your heart, and the memories we gather along the way.
        </p>

        {/* Entrance Buttons */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="#spaces"
            className={`w-full sm:w-auto px-7 py-3 rounded-full font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group ${
              isNight
                ? "bg-[#B88B4A] hover:bg-[#D4A359] text-[#132521] font-semibold shadow-[0_4px_20px_rgba(184,139,74,0.35)]"
                : "bg-[#60463E] text-[#F7F1E7] shadow-[0_4px_16px_rgba(23,45,41,0.18)] hover:bg-[#172D29] hover:shadow-[0_6px_20px_rgba(23,45,41,0.25)]"
            }`}
          >
            <Compass
              className={`w-4 h-4 group-hover:rotate-45 transition-transform duration-300 ${
                isNight ? "text-[#132521]" : "text-[#B88B4A]"
              }`}
            />
            <span>Wander Through The Rooms</span>
          </Link>

          <Link
            href="#universe"
            className={`w-full sm:w-auto px-7 py-3 rounded-full font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group shadow-xs ${
              isNight
                ? "bg-[#172D29]/80 backdrop-blur-sm text-[#F7F1E7] border border-[#B88B4A]/50 hover:border-[#FDE08B] hover:text-[#FDE08B]"
                : "bg-[#F7F1E7]/85 backdrop-blur-sm text-[#60463E] border border-[#B88B4A]/40 hover:border-[#B88B4A] hover:bg-[#F7F1E7] hover:text-[#172D29]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FDE08B] group-hover:scale-110 transition-transform" />
            <span>Visit Our Little Universe</span>
          </Link>
        </div>

        {/* Floating Book Quote Inscription */}
        <div
          className={`mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-[11px] font-serif italic ${
            isNight ? "text-[#F7F1E7]/80" : "text-[#60463E]/75"
          }`}
        >
          <ArrowDown
            className={`w-3 h-3 animate-bounce ${
              isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
            }`}
          />
          <span>Turn the page to explore six living spaces</span>
        </div>
      </div>
    </section>
  );
};

export default HeroStorybook;
