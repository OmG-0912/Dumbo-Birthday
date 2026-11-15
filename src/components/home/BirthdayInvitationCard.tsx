"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles, Gift, Mail, Camera, ArrowRight } from "lucide-react";
import { WaxSealBadge } from "../ui/WaxSealBadge";
import { BotanicalDivider } from "../ui/BotanicalDivider";

export const BirthdayInvitationCard: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl p-8 sm:p-14 md:p-16 border border-[#B88B4A]/50 bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF5ED]/90 to-[#F5ECE0]/95 shadow-[0_20px_60px_-15px_rgba(23,45,41,0.22)] backdrop-blur-md overflow-hidden text-center">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDE08B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D6A0A0]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Wax Seal Badge */}
          <div className="relative z-10 flex justify-center mb-6">
            <WaxSealBadge label="16" size="lg" variant="blush" />
          </div>

          {/* Chapter Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/40 text-[#B88B4A] text-xs uppercase tracking-[0.25em] font-semibold mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
            <span>Dedicated Celebration • 16 November</span>
          </div>

          {/* Main Title */}
          <h2 className="relative z-10 font-serif text-3xl sm:text-5xl md:text-6xl text-[#3D2A24] font-normal tracking-tight leading-[1.15]">
            Anavi&apos;s Birthday Experience
          </h2>

          <BotanicalDivider variant="laurel" className="my-5 max-w-sm mx-auto text-[#B88B4A]/80" />

          {/* Description */}
          <p className="relative z-10 font-sans text-sm sm:text-base md:text-lg text-[#60463E] max-w-2xl mx-auto leading-relaxed mb-10">
            A private storybook chapter created with all my love—unfolding through an antique wax-sealed envelope, memories of our favourite times, a heartfelt letter, and an audio keepsake.
          </p>

          {/* 4 Feature Stage Cards */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white/80 border border-[#B88B4A]/25 shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#D6A0A0]/20 flex items-center justify-center mb-2.5">
                <Mail className="w-5 h-5 text-[#B87F7F]" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#3D2A24]">Wax-Sealed Letter</span>
              <span className="text-[11px] text-[#60463E]/80 mt-0.5">Interactive envelope</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-[#B88B4A]/25 shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#FDE08B]/30 flex items-center justify-center mb-2.5">
                <Sparkles className="w-5 h-5 text-[#B88B4A]" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#3D2A24]">Floral Reveal</span>
              <span className="text-[11px] text-[#60463E]/80 mt-0.5">Petals &amp; celebration</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-[#B88B4A]/25 shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#526B50]/15 flex items-center justify-center mb-2.5">
                <Camera className="w-5 h-5 text-[#526B50]" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#3D2A24]">Our Scrapbook</span>
              <span className="text-[11px] text-[#60463E]/80 mt-0.5">Cherished moments</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-[#B88B4A]/25 shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#B88B4A]/20 flex items-center justify-center mb-2.5">
                <Gift className="w-5 h-5 text-[#B88B4A]" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#3D2A24]">Keepsake Box</span>
              <span className="text-[11px] text-[#60463E]/80 mt-0.5">Voice note &amp; wishes</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/birthday"
              className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FDE08B] via-[#F5D076] to-[#E5BD60] text-[#172D29] shadow-[0_6px_28px_rgba(184,139,74,0.4)] hover:shadow-[0_8px_36px_rgba(184,139,74,0.55)] hover:scale-105 border border-[#B88B4A]/60"
            >
              <Heart className="w-5 h-5 text-[#B83232] fill-[#B83232] animate-pulse" />
              <span>Step Inside The Birthday Experience</span>
              <ArrowRight className="w-5 h-5 text-[#172D29]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayInvitationCard;
