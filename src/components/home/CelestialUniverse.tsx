import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  MapPin,
  Heart,
  Key,
  Star,
  Feather,
  ArrowUpRight,
  Orbit,
} from "lucide-react";
import { BotanicalDivider } from "../ui/BotanicalDivider";

export const CelestialUniverse: React.FC = () => {
  return (
    <section
      id="universe"
      className="relative py-24 sm:py-36 bg-[#0B1020] text-alabaster overflow-hidden"
    >
      {/* 1. Deep Midnight Celestial Cosmos Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#1C264A]/70 via-[#131A36]/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#221B38]/40 blur-3xl rounded-full" />
        <div className="absolute top-48 right-10 w-[500px] h-[500px] bg-[#162744]/40 blur-3xl rounded-full" />
      </div>

      {/* 2. Interactive SVG Astrolabe Constellation Map Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric Celestial Astrolabe Rings */}
          <circle cx="50%" cy="38%" r="180" stroke="#C5A16B" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.35" />
          <circle cx="50%" cy="38%" r="300" stroke="#C5A16B" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.25" />
          <circle cx="50%" cy="38%" r="420" stroke="#C5A16B" strokeWidth="0.5" strokeDasharray="6 8" opacity="0.18" />

          {/* Starlight Constellation Nodes */}
          <circle cx="18%" cy="22%" r="2" fill="#FDE08B" />
          <circle cx="32%" cy="18%" r="2.5" fill="#FFFFFF" />
          <circle cx="48%" cy="28%" r="1.5" fill="#FDE08B" />
          <circle cx="68%" cy="16%" r="3" fill="#FDE08B" />
          <circle cx="82%" cy="24%" r="2" fill="#FFFFFF" />
          <circle cx="22%" cy="72%" r="2.5" fill="#FFFFFF" />
          <circle cx="78%" cy="78%" r="2" fill="#FDE08B" />

          {/* Constellation Connecting Line */}
          <path
            d="M 32% 18% L 48% 28% L 68% 16%"
            stroke="#FDE08B"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182038]/90 border border-[#FDE08B]/40 text-xs font-semibold text-[#FDE08B] uppercase tracking-[0.25em] mb-4 shadow-celestial-glow">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE08B] animate-shimmer" />
            <span>Shared Cosmic World</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FAF5ED]">
            Our Little Universe
          </h2>

          <BotanicalDivider variant="celestial" className="my-4 max-w-xs mx-auto" />

          <p className="font-sans text-sm sm:text-base text-parchment-200/80 leading-relaxed max-w-2xl mx-auto">
            A private cosmos woven exclusively for two accounts. Where sacred dates, bridges, quiet glances, handwritten letters, and shared dreams are mapped into an enduring celestial sky.
          </p>
        </div>

        {/* Bespoke Asymmetrical Celestial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Card 1 (Span 7): Relationship Timeline & Sacred Coordinates */}
          <Link
            href="/universe"
            className="lg:col-span-7 bg-[#151C35]/80 hover:bg-[#1A2342]/90 border border-[#2F3B66] hover:border-[#FDE08B]/60 rounded-3xl p-8 sm:p-10 transition-all duration-300 shadow-storybook flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          >
            {/* Ambient starlight glow in corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FDE08B]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1020] border border-[#FDE08B]/40 flex items-center justify-center text-[#FDE08B]">
                    <Compass className="w-5 h-5 text-[#FDE08B]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE08B]/80 block">
                      Chronicle of Two
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5ED] group-hover:text-[#FDE08B] transition-colors">
                      Relationship Timeline
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-serif italic text-parchment-200/70 border border-[#2F3B66] px-3 py-1 rounded-full">
                  Sanctuary Star Chart
                </span>
              </div>

              <p className="text-sm text-parchment-200/80 leading-relaxed mb-6">
                From that unforgettable <strong>18 August 2024</strong> first meeting, to <strong>4 March 2026</strong> and beyond—every sacred chapter is preserved with its exact coordinates and atmosphere.
              </p>

              {/* Sacred Coordinates Sub-Pill Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#2F3B66]/60">
                <div className="bg-[#0B1020]/70 p-3 rounded-2xl border border-[#2F3B66]/60">
                  <span className="text-[10px] text-[#FDE08B] uppercase tracking-wider block font-mono">
                    Sacred Place I
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#FAF5ED] block mt-0.5">
                    Namo Garden, Thane
                  </span>
                  <span className="text-[11px] text-parchment-200/60 font-serif italic">
                    The bridge &amp; the pond
                  </span>
                </div>

                <div className="bg-[#0B1020]/70 p-3 rounded-2xl border border-[#2F3B66]/60">
                  <span className="text-[10px] text-[#FDE08B] uppercase tracking-wider block font-mono">
                    Sacred Place II
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#FAF5ED] block mt-0.5">
                    Freesia by Express Inn
                  </span>
                  <span className="text-[11px] text-parchment-200/60 font-serif italic">
                    Our first stay together
                  </span>
                </div>

                <div className="bg-[#0B1020]/70 p-3 rounded-2xl border border-[#2F3B66]/60">
                  <span className="text-[10px] text-[#FDE08B] uppercase tracking-wider block font-mono">
                    Sacred Place III
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#FAF5ED] block mt-0.5">
                    Melody Hotel
                  </span>
                  <span className="text-[11px] text-parchment-200/60 font-serif italic">
                    Pre-birthday celebration
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2F3B66]/50 flex items-center justify-between text-xs text-[#FDE08B]/80 group-hover:text-[#FDE08B]">
              <span className="font-serif italic">Explore timeline &amp; 3D memory maps</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2 (Span 5): Memory Chest & Inside Jokes */}
          <Link
            href="/universe"
            className="lg:col-span-5 bg-[#151C35]/80 hover:bg-[#1A2342]/90 border border-[#2F3B66] hover:border-[#FDE08B]/60 rounded-3xl p-8 sm:p-10 transition-all duration-300 shadow-storybook flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#0B1020] border border-[#FDE08B]/40 flex items-center justify-center text-[#FDE08B] mb-5">
                <Key className="w-5 h-5 text-[#FDE08B]" />
              </div>

              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE08B]/80 block mb-1">
                Private Vault
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF5ED] group-hover:text-[#FDE08B] transition-colors">
                The Memory Chest
              </h3>

              <p className="text-sm text-parchment-200/80 leading-relaxed mt-3">
                A brass-bound vault for spontaneous laughter, private inside jokes, shared voice notes, and keepsakes that make sense only to us.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#0B1020]/60 border border-[#2F3B66]/60">
                <span className="text-xs font-serif italic text-parchment-200/80 leading-relaxed block">
                  &ldquo;A secret language composed of late-night conversations and treasured laughter.&rdquo;
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2F3B66]/50 flex items-center justify-between text-xs text-[#FDE08B]/80 group-hover:text-[#FDE08B]">
              <span className="font-serif italic">Open mutual keepsakes</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3 (Span 5): Shared Letters & Voice Notes */}
          <Link
            href="/universe"
            className="lg:col-span-5 bg-[#151C35]/80 hover:bg-[#1A2342]/90 border border-[#2F3B66] hover:border-[#FDE08B]/60 rounded-3xl p-8 sm:p-10 transition-all duration-300 shadow-storybook flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#0B1020] border border-[#FDE08B]/40 flex items-center justify-center text-[#FDE08B] mb-5">
                <Feather className="w-5 h-5 text-[#FDE08B]" />
              </div>

              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE08B]/80 block mb-1">
                Correspondence
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF5ED] group-hover:text-[#FDE08B] transition-colors">
                Shared Letters &amp; Notes
              </h3>

              <p className="text-sm text-parchment-200/80 leading-relaxed mt-3">
                Intimate letters written across late nights, voice recordings carrying gentle cadence, and words sealed with love.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2F3B66]/50 flex items-center justify-between text-xs text-[#FDE08B]/80 group-hover:text-[#FDE08B]">
              <span className="font-serif italic">Read shared correspondence</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4 (Span 7): Our Constellation & Future Adventures */}
          <Link
            href="/universe"
            className="lg:col-span-7 bg-[#151C35]/80 hover:bg-[#1A2342]/90 border border-[#2F3B66] hover:border-[#FDE08B]/60 rounded-3xl p-8 sm:p-10 transition-all duration-300 shadow-storybook flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-[#0B1020] border border-[#FDE08B]/40 flex items-center justify-center text-[#FDE08B]">
                  <Orbit className="w-5 h-5 text-[#FDE08B]" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE08B] border border-[#FDE08B]/30 px-3 py-1 rounded-full">
                  Constellation Mapping
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5ED] group-hover:text-[#FDE08B] transition-colors">
                Our Little Constellation
              </h3>

              <p className="text-sm text-parchment-200/80 leading-relaxed mt-3">
                Every shared dream forms a luminous star node in the sky—linking our future expeditions, bucket lists, and journeys waiting for footprints.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2F3B66]/50 flex items-center justify-between text-xs text-[#FDE08B]/80 group-hover:text-[#FDE08B]">
              <span className="font-serif italic">Chart tomorrow&apos;s adventures</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Central Illuminated Gateway Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#171F38] via-[#1D274A] to-[#171F38] border border-[#FDE08B]/50 p-8 sm:p-12 text-center shadow-celestial-glow relative overflow-hidden">
          <span className="font-serif italic text-sm text-[#FDE08B] block mb-2">
            Sanctuary of Two
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF5ED] font-medium leading-snug">
            &ldquo;You are my favorite corner in every universe.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-parchment-200/80 max-w-lg mx-auto mt-3 leading-relaxed">
            Two accounts, protected server-side and prepared for mutual encryption. Our stories belong only to us.
          </p>

          <div className="mt-8">
            <Link
              href="/universe"
              className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-[#FDE08B] text-[#0B1020] font-semibold text-xs uppercase tracking-wider hover:bg-[#FFE8A3] shadow-md transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-current text-[#0B1020]" />
              <span>Step Into Our Universe</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
