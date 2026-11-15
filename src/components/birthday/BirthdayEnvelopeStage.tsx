"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { WaxSealBadge } from "@/components/ui/WaxSealBadge";

interface BirthdayEnvelopeStageProps {
  tagline: string;
  recipient: string;
  onOpenComplete: () => void;
  onSkipIntro: () => void;
}

export const BirthdayEnvelopeStage: React.FC<BirthdayEnvelopeStageProps> = ({
  tagline,
  recipient,
  onOpenComplete,
  onSkipIntro,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 450);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* Subtle Botanical Leaf Accents in Corners */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-20 hidden md:block">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-[#526B50]">
          <path
            d="M10 90 C 20 60, 40 40, 90 10 C 60 40, 40 60, 10 90 Z"
            fill="currentColor"
          />
          <path
            d="M30 70 C 45 45, 65 30, 85 15"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="absolute top-6 right-6 pointer-events-none opacity-20 hidden md:block rotate-90">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-[#526B50]">
          <path
            d="M10 90 C 20 60, 40 40, 90 10 C 60 40, 40 60, 10 90 Z"
            fill="currentColor"
          />
          <path
            d="M30 70 C 45 45, 65 30, 85 15"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Header Tagline */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/30 text-[#B88B4A] text-xs font-medium uppercase tracking-[0.25em] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
          <span>A Gentle Moment</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3D2A24] font-medium leading-relaxed italic px-2">
          &ldquo;{tagline}&rdquo;
        </h2>
      </div>

      {/* =========================================================================
          THE ENVELOPE INTERACTION CONTAINER
          Generous margin-top and margin-bottom ensures the rising letter has
          complete vertical clearance and is never blocked or clipped.
         ========================================================================= */}
      <div className="relative w-full max-w-md sm:max-w-lg aspect-[1.45/1] flex items-center justify-center mt-10 mb-28 sm:mt-14 sm:mb-36">
        {/* Soft shadow below envelope */}
        <div className="absolute -bottom-6 w-4/5 h-10 bg-black/15 blur-2xl rounded-full pointer-events-none" />

        {/* Envelope Base Body */}
        <div
          onClick={handleOpen}
          className={`relative w-full h-full rounded-2xl bg-gradient-to-b from-[#FBF8F2] to-[#F1E8DC] border border-[#B88B4A]/40 shadow-storybook-lg cursor-pointer transition-all duration-500 group ${
            !isOpen ? "hover:scale-[1.02] hover:shadow-2xl" : ""
          }`}
          style={{ perspective: "1200px" }}
        >
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 bg-deckle-edge opacity-30 rounded-2xl pointer-events-none" />

          {/* Decorative Gold Inset Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl border border-dashed border-[#B88B4A]/30 pointer-events-none" />

          {/* Envelope Pocket Triangles (Lower Fold Lines on the Envelope Body) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
            {/* Left triangle diagonal */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#EAE0D1]/85 to-transparent [clip-path:polygon(0%_100%,_50%_52%,_0%_0%)]" />
            {/* Right triangle diagonal */}
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#E4D8C7]/85 to-transparent [clip-path:polygon(100%_100%,_50%_52%,_100%_0%)]" />
            {/* Bottom triangle pocket */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#EDE4D6] to-transparent [clip-path:polygon(0%_100%,_50%_54%,_100%_100%)] border-t border-[#B88B4A]/25" />
          </div>

          {/* =====================================================================
              CARD EMERGING FROM INSIDE (Rises up with z-50 to NEVER be blocked)
             ===================================================================== */}
          <div
            onClick={(e) => {
              if (isOpen) {
                e.stopPropagation();
                onOpenComplete();
              }
            }}
            className={`absolute inset-x-3 sm:inset-x-5 top-2 sm:top-3 rounded-2xl bg-[#FCFAF6] border-2 border-[#B88B4A]/50 p-6 sm:p-8 flex flex-col items-center justify-between text-center transition-all duration-700 ease-out z-50 ${
              isOpen
                ? "-translate-y-36 sm:-translate-y-48 md:-translate-y-52 opacity-100 shadow-[0_25px_60px_rgba(23,45,41,0.25)] scale-105 cursor-pointer hover:border-[#B88B4A]"
                : "translate-y-0 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* Inner Gold Inset Frame */}
            <div className="absolute inset-2 sm:inset-3 rounded-xl border border-dashed border-[#B88B4A]/30 pointer-events-none" />

            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#172D29]/5 border border-[#B88B4A]/30 text-[#B88B4A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] mb-2">
                <Heart className="w-3 h-3 text-[#D6A0A0] fill-[#D6A0A0]" />
                <span>{recipient}</span>
                <Heart className="w-3 h-3 text-[#D6A0A0] fill-[#D6A0A0]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#172D29] tracking-tight">
                Happy Birthday, Anavi
              </h3>
            </div>

            <div className="relative z-10 my-3 sm:my-4 max-w-sm px-2">
              <p className="font-serif italic text-sm sm:text-base text-[#60463E] leading-relaxed">
                Today, this entire sanctuary blooms in your honor. Open your storybook to walk through the garden of our cherished moments.
              </p>
            </div>

            {/* Click to Step Inside Button (Unobstructed & High Contrast) */}
            <div className="relative z-10 w-full pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenComplete();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#172D29] hover:bg-[#1E3B36] text-[#FDE08B] font-semibold text-xs sm:text-sm tracking-wide shadow-xl hover:shadow-celestial-glow transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span>Step Inside Her World</span>
                <ArrowRight className="w-4 h-4 text-[#FDE08B] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* =====================================================================
              TOP ENVELOPE FLAP (Folds back cleanly with 3D rotation)
             ===================================================================== */}
          <div
            className="absolute top-0 left-0 w-full h-[55%] pointer-events-none transition-transform duration-700 ease-in-out"
            style={{
              transformOrigin: "top center",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
              zIndex: isOpen ? 5 : 25,
            }}
          >
            {/* The triangular top flap */}
            <div className="w-full h-full bg-gradient-to-b from-[#FAF5ED] via-[#F3EADB] to-[#E9DEC9] border-t border-[#B88B4A]/40 [clip-path:polygon(0%_0%,_100%_0%,_50%_100%)] shadow-md flex items-center justify-center relative">
              <div className="absolute inset-0 [clip-path:polygon(0%_0%,_100%_0%,_50%_100%)] border-b border-[#B88B4A]/30" />
            </div>
          </div>

          {/* =====================================================================
              WAX SEAL BADGE (Positioned at the tip of the flap)
             ===================================================================== */}
          {!isOpen && (
            <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <div
                className={`transition-all duration-300 ${
                  isOpening ? "scale-125 opacity-0 rotate-12" : "group-hover:scale-110"
                }`}
              >
                <WaxSealBadge label="A" size="lg" variant="gold" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#60463E] bg-[#FAF5ED]/95 px-3 py-1 rounded-full border border-[#B88B4A]/30 shadow-xs group-hover:text-[#B88B4A] transition-colors">
                {isOpening ? "Opening Letter..." : "Click to Open Letter"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skip Intro & Helper Footnote */}
      <div className="mt-4 flex items-center gap-4 text-xs">
        <button
          onClick={onSkipIntro}
          className="text-[#60463E]/70 hover:text-[#172D29] hover:underline font-medium transition-colors"
        >
          Skip intro →
        </button>
      </div>
    </section>
  );
};
