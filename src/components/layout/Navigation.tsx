"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ChevronDown, Eye, Settings, Heart } from "lucide-react";
import { WaxSealBadge } from "../ui/WaxSealBadge";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { AccountSwitcherPill } from "@/components/ui/AccountSwitcherPill";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSpacesOpen, setIsSpacesOpen] = useState(false);

  const { isNight } = useGardenAtmosphere();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const roomSubLinks = [
    { name: "House of Memories", href: "/spaces/memories", room: "Room I" },
    { name: "Garden of Becoming", href: "/spaces/garden", room: "Room II" },
    { name: "Library of Words", href: "/spaces/library", room: "Room III" },
    { name: "Museum of Her", href: "/spaces/museum", room: "Room IV" },
    { name: "Kitchen of Little Joys", href: "/spaces/kitchen", room: "Room V" },
    { name: "Observatory of Dreams", href: "/spaces/observatory", room: "Room VI" },
  ];

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
            className={`pointer-events-auto hidden md:flex items-center gap-1 lg:gap-1.5 px-4 py-1.5 rounded-full border transition-all duration-300 ${pillGlassClasses}`}
          >
            <Link
              href="/"
              className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                isNight
                  ? "text-[#F7F1E7]/90 hover:text-[#FDE08B] hover:bg-white/10"
                  : "text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10"
              }`}
            >
              Home
            </Link>

            {/* My Spaces Dropdown */}
            <div className="relative" onMouseLeave={() => setIsSpacesOpen(false)}>
              <button
                type="button"
                onClick={() => setIsSpacesOpen(!isSpacesOpen)}
                onMouseEnter={() => setIsSpacesOpen(true)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isNight
                    ? "text-[#F7F1E7]/90 hover:text-[#FDE08B] hover:bg-white/10"
                    : "text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10"
                }`}
              >
                <span>Six Rooms</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
                  }`}
                />
              </button>

              {isSpacesOpen && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl p-2 z-50 border ${
                    isNight
                      ? "bg-[#132521]/98 backdrop-blur-xl border-[#B88B4A]/50 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
                      : "bg-[#F7F1E7]/96 backdrop-blur-md border-[#B88B4A]/40 shadow-[0_12px_36px_rgba(23,45,41,0.18)]"
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border-b mb-1 ${
                      isNight
                        ? "text-[#FDE08B] border-[#B88B4A]/30"
                        : "text-[#B88B4A] border-[#B88B4A]/20"
                    }`}
                  >
                    Six Enchanted Rooms
                  </div>
                  {roomSubLinks.map((room) => (
                    <Link
                      key={room.name}
                      href={room.href}
                      onClick={() => setIsSpacesOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        isNight
                          ? "text-[#F7F1E7]/90 hover:bg-white/10 hover:text-[#FDE08B]"
                          : "text-[#60463E] hover:bg-[#B88B4A]/10 hover:text-[#172D29]"
                      }`}
                    >
                      <span>{room.name}</span>
                      <span
                        className={`text-[10px] font-serif italic ${
                          isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
                        }`}
                      >
                        {room.room}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Birthday Experience Highlight Pill */}
            <Link
              href="/birthday"
              className="relative group ml-1 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold text-[#D6A0A0] bg-[#FAF5ED]/90 hover:bg-[#D6A0A0]/20 border border-[#D6A0A0]/50 shadow-xs transition-all duration-300 flex items-center gap-1.5"
              title="Anavi's Birthday Experience (16 November)"
            >
              <Heart className="w-3 h-3 text-[#D6A0A0] fill-[#D6A0A0] animate-pulse" />
              <span>16 Nov ✨</span>
            </Link>

            {/* Our Little Universe Highlight Pill */}
            <Link
              href="/universe"
              className="relative group ml-1 px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-semibold text-[#FDE08B] bg-[#172D29] hover:bg-[#1E3B36] border border-[#FDE08B]/40 shadow-xs transition-all duration-300 flex items-center gap-1.5 hover:shadow-celestial-glow"
            >
              <Sparkles className="w-3 h-3 text-[#FDE08B] animate-shimmer" />
              <span>Universe</span>
            </Link>

            {/* Admin Management Link */}
            <Link
              href="/admin"
              className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all flex items-center gap-1.5 ${
                isNight
                  ? "text-[#F7F1E7]/90 hover:text-[#FDE08B] hover:bg-white/10"
                  : "text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10"
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-gold" />
              <span>Manage</span>
            </Link>

            {/* 3D Showcase Link */}
            <Link
              href="/showcase"
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 opacity-75 hover:opacity-100 ${
                isNight
                  ? "text-[#F7F1E7]/80 hover:text-[#FDE08B]"
                  : "text-[#60463E]/80 hover:text-[#172D29]"
              }`}
              title="View Botanical 3D Asset Showcase"
            >
              <Eye className="w-3 h-3 text-gold" />
              <span>3D</span>
            </Link>
          </nav>

          {/* 3. Upper-Right Floating Account Switcher Pill */}
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="hidden sm:block">
              <AccountSwitcherPill />
            </div>

            {/* Mobile Floating Pill with Hamburger button */}
            <div className={`md:hidden flex items-center gap-1.5 p-1 rounded-full border ${pillGlassClasses}`}>
              <Link
                href="/universe"
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#FDE08B] bg-[#172D29] border border-[#FDE08B]/40 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#FDE08B]" />
                <span>Universe</span>
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

            <div
              className={`flex flex-col space-y-2 pb-3 border-b ${
                isNight ? "border-[#B88B4A]/30" : "border-[#B88B4A]/25"
              }`}
            >
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between bg-[#D6A0A0]/15 text-[#3D2A24] border border-[#D6A0A0]/40"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D6A0A0] fill-[#D6A0A0]" />
                  <span>Anavi&apos;s Birthday (16 Nov)</span>
                </div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#B88B4A] font-semibold">Special</span>
              </Link>
              <Link
                href="/universe"
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  isNight
                    ? "text-[#FDE08B] hover:bg-white/10"
                    : "text-gold-deep hover:bg-[#B88B4A]/10"
                }`}
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Our Little Universe</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  isNight
                    ? "text-[#F7F1E7]/90 hover:bg-white/10 hover:text-[#FDE08B]"
                    : "text-[#60463E] hover:bg-[#B88B4A]/10 hover:text-[#172D29]"
                }`}
              >
                <Settings className="w-4 h-4 text-gold" />
                <span>Sanctuary Content Manager</span>
              </Link>
            </div>

            <div className="space-y-1">
              <div
                className={`px-4 text-[10px] uppercase tracking-wider font-semibold ${
                  isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
                }`}
              >
                Explore The Six Rooms
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {roomSubLinks.map((room) => (
                  <Link
                    key={room.name}
                    href={room.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                      isNight
                        ? "text-[#F7F1E7]/90 hover:bg-white/10 hover:text-[#FDE08B]"
                        : "text-[#60463E] hover:bg-[#B88B4A]/10 hover:text-[#172D29]"
                    }`}
                  >
                    <div>{room.name}</div>
                    <div
                      className={`text-[10px] font-serif italic ${
                        isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
                      }`}
                    >
                      {room.room}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
