"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Heart } from "lucide-react";
import { WaxSealBadge } from "../ui/WaxSealBadge";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { AccountSwitcherPill } from "@/components/ui/AccountSwitcherPill";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { isNight } = useGardenAtmosphere();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Day/Night Pill Glass Styling
  const pillGlassClasses = isNight
    ? isScrolled
      ? "bg-[#132521]/94 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-[#B88B4A]/55"
      : "bg-[#132521]/82 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.45)] border-[#B88B4A]/40"
    : isScrolled
      ? "bg-[#F7F1E7]/92 backdrop-blur-lg shadow-[0_8px_30px_rgba(23,45,41,0.14)] border-[#B88B4A]/45"
      : "bg-[#F7F1E7]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(23,45,41,0.08)] border-[#B88B4A]/30";

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 1. Upper-Left Floating Logo Pill */}
          <Link
            href="/"
            className={`pointer-events-auto group flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 hover:scale-102 hover:border-[#B88B4A] ${pillGlassClasses}`}
          >
            <WaxSealBadge label="A" size="sm" variant={isNight ? "gold" : "gold"} />
            <div className="flex flex-col">
              <span
                className={`font-serif text-base sm:text-lg font-bold tracking-wide transition-colors ${
                  isNight
                    ? "text-[#F7F1E7] group-hover:text-[#FDE08B]"
                    : "text-[#3D2A24] group-hover:text-[#B88B4A]"
                }`}
              >
                Anavi&apos;s World
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-medium -mt-0.5 ${
                  isNight ? "text-[#D6A0A0]/90" : "text-[#60463E]/80"
                }`}
              >
                Living Storybook
              </span>
            </div>
          </Link>

          {/* 2. Center Floating Main Navigation Pill (Desktop) */}
          <nav
            className={`pointer-events-auto hidden md:flex items-center gap-2 px-5 py-1.5 rounded-full border transition-all duration-300 ${pillGlassClasses}`}
          >
            <Link
              href="/"
              className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                isNight
                  ? "text-[#F7F1E7]/90 hover:text-[#FDE08B] hover:bg-white/10"
                  : "text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10"
              }`}
            >
              Home Garden
            </Link>

            {/* Birthday Experience Highlight Pill */}
            <Link
              href="/birthday"
              className="relative group ml-1 px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-[#172D29] bg-gradient-to-r from-[#FDE08B] to-[#F3C978] hover:from-[#FFF0B8] hover:to-[#FDE08B] shadow-[0_2px_14px_rgba(184,139,74,0.35)] border border-[#B88B4A]/50 transition-all duration-300 flex items-center gap-2 hover:scale-105"
              title="Anavi's Birthday Celebration (16 November)"
            >
              <Heart className="w-3.5 h-3.5 text-[#B83232] fill-[#B83232] animate-pulse" />
              <span>Anavi&apos;s Birthday (16 Nov)</span>
              <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
            </Link>
          </nav>

          {/* 3. Upper-Right Floating Account Switcher Pill */}
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="hidden sm:block">
              <AccountSwitcherPill />
            </div>

            {/* Mobile Floating Pill with Direct Birthday & Hamburger button */}
            <div className={`md:hidden flex items-center gap-1.5 p-1 rounded-full border ${pillGlassClasses}`}>
              <Link
                href="/birthday"
                className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#172D29] bg-gradient-to-r from-[#FDE08B] to-[#F3C978] border border-[#B88B4A]/50 flex items-center gap-1.5 shadow-xs"
              >
                <Heart className="w-3 h-3 text-[#B83232] fill-[#B83232] animate-pulse" />
                <span>16 Nov 🎂</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`p-1.5 rounded-full transition-colors ${
                  isNight
                    ? "text-[#F7F1E7] hover:bg-white/10"
                    : "text-[#60463E] hover:bg-[#B88B4A]/10"
                }`}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Glass Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B1513]/60 backdrop-blur-sm md:hidden animate-fade-in pointer-events-auto">
          <div
            className={`absolute top-20 right-4 left-4 rounded-3xl p-6 space-y-4 border ${
              isNight
                ? "bg-[#132521]/98 backdrop-blur-xl border-[#B88B4A]/50 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
                : "bg-[#F7F1E7]/96 backdrop-blur-lg border-[#B88B4A]/40 shadow-[0_16px_40px_rgba(23,45,41,0.25)]"
            }`}
          >
            {/* Account Switcher on mobile */}
            <div className="pb-3 border-b border-gold/20 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-gold">Active Profile</span>
              <AccountSwitcherPill />
            </div>

            <div className="flex flex-col space-y-3 pt-1">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isNight
                    ? "text-[#F7F1E7]/90 hover:bg-white/10 hover:text-[#FDE08B]"
                    : "text-[#60463E] hover:bg-[#B88B4A]/10 hover:text-[#172D29]"
                }`}
              >
                Home Garden
              </Link>
              <Link
                href="/birthday"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all flex items-center justify-between bg-gradient-to-r from-[#FDE08B] to-[#F3C978] text-[#172D29] shadow-md border border-[#B88B4A]/50"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#B83232] fill-[#B83232] animate-pulse" />
                  <span>Anavi&apos;s Birthday Experience</span>
                </div>
                <Sparkles className="w-4 h-4 text-[#B88B4A]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
