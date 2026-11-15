"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

interface BirthdayRevealStageProps {
  title: string;
  subtitle: string;
  date: string;
  onContinue: () => void;
}

export const BirthdayRevealStage: React.FC<BirthdayRevealStageProps> = ({
  title,
  subtitle,
  date,
  onContinue,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden rounded-3xl border border-[#B88B4A]/40 my-6 shadow-2xl">
      {/* 1. Cinematic Golden Hour Garden Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/garden/golden-hour.jpg"
          alt="Golden hour sanctuary garden"
          fill
          priority
          className="object-cover object-[center_45%] transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Warm Golden Glow Scrim & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172D29]/90 via-[#172D29]/40 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(23,45,41,0.6)_80%)]" />
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-color" />
      </div>

      {/* 2. Soft Floating Petals (Restrained, elegant CSS particles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60 animate-float"
            style={{
              width: `${12 + (i % 4) * 4}px`,
              height: `${16 + (i % 3) * 6}px`,
              left: `${(i * 7.5 + 4) % 96}%`,
              top: `${(i * 11 + 6) % 90}%`,
              background: i % 2 === 0 ? "rgba(253, 224, 139, 0.45)" : "rgba(214, 160, 160, 0.55)",
              filter: "blur(0.5px)",
              animationDuration: `${5 + (i % 5)}s`,
              animationDelay: `${(i * 0.4)}s`,
              transform: `rotate(${i * 24}deg)`,
            }}
          />
        ))}
      </div>

      {/* 3. Central Glass Editorial Plaque */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 py-12 sm:py-16 text-center animate-in fade-in zoom-in-95 duration-1000">
        {/* Date Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132521]/80 backdrop-blur-md border border-[#FDE08B]/40 text-[#FDE08B] text-xs font-semibold uppercase tracking-[0.25em] mb-6 shadow-celestial-glow">
          <Heart className="w-3.5 h-3.5 fill-[#FDE08B]" />
          <span>{date}</span>
          <Heart className="w-3.5 h-3.5 fill-[#FDE08B]" />
        </div>

        {/* Main Birthday Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F1E7] tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] mb-4">
          {title}
        </h1>

        {/* Golden Flourish Line */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FDE08B]" />
          <Sparkles className="w-4 h-4 text-[#FDE08B] animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FDE08B]" />
        </div>

        {/* Subtitle */}
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FDE08B] font-medium italic drop-shadow-md max-w-xl mx-auto leading-relaxed mb-8">
          &ldquo;{subtitle}&rdquo;
        </p>

        {/* Call-to-Action to Stage 3 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#FDE08B] hover:bg-[#FFF2B2] text-[#172D29] font-semibold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[0_0_30px_rgba(253,224,139,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>Walk Through Her Moments</span>
            <ArrowRight className="w-4 h-4 text-[#172D29] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
