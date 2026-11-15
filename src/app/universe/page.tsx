"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  MapPin,
  Calendar,
  Compass,
  Mail,
  Volume2,
  Clock,
  PlusCircle,
  X,
} from "lucide-react";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { useStorybookData } from "@/lib/contentStore";
import { ConstellationStar, UniverseMilestone, ImportantPlace } from "@/types/content";
import { StorybookAudioPlayer } from "@/components/media/StorybookAudioPlayer";

export default function UniversePage() {
  const { data } = useStorybookData();
  const [activeStar, setActiveStar] = useState<ConstellationStar | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ImportantPlace | null>(null);

  const timeline = data.universeTimeline;
  const places = data.importantPlaces;
  const stars = data.constellationStars;

  // Calculate Memory of the Day deterministically
  const todayMemory = timeline[0] || null;

  return (
    <div className="pt-28 sm:pt-36 pb-32 bg-[#0B1513] text-[#FAF5ED] min-h-screen relative overflow-hidden">
      {/* Background starlight particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A332C]/60 via-[#0B1513] to-[#050B0A] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FDE08B] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Garden</span>
        </Link>

        {/* 1. Celestial Header Banner */}
        <div className="rounded-3xl p-8 sm:p-14 border border-[#B88B4A]/50 bg-[#132521]/90 backdrop-blur-xl shadow-celestial-glow mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FDE08B]/5 blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FDE08B] tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4 text-[#FDE08B] animate-shimmer" />
              <span>Dedicated Shared Relationship Sanctuary</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF5ED] font-medium tracking-tight">
              Our Little Universe
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[#FDE08B] mt-2">
              &ldquo;Where every shared memory, bridge, laughter, and vow is written in the stars.&rdquo;
            </p>

            <BotanicalDivider variant="celestial" className="my-6" />

            <p className="text-sm sm:text-base text-parchment-200/80 leading-relaxed">
              A private cosmic sanctuary co-curated by Anavi and Rohan. Here live our chronological relationship milestones, the sacred places that hold our stories (Namo Garden, Freesia Meadow, Melody Cottage), our starlit constellation, and letters destined to outlast the years.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/admin?tab=universe"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FDE08B] text-[#132521] hover:bg-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Inscribe Shared Milestone</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Memory of the Day Feature Banner */}
        {todayMemory && (
          <div className="rounded-2xl p-6 sm:p-8 border border-[#B88B4A]/40 bg-[#172D29]/70 backdrop-blur-md mb-14">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FDE08B] font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>Memory of the Day • Celestial Inscription</span>
              </span>
              <span className="text-xs font-mono text-white/50">{todayMemory.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {todayMemory.image && (
                <div className="relative h-44 rounded-xl overflow-hidden border border-[#B88B4A]/30">
                  <Image src={todayMemory.image} alt={todayMemory.title} fill className="object-cover" />
                </div>
              )}
              <div className={todayMemory.image ? "md:col-span-2" : "md:col-span-3"}>
                <h3 className="font-serif text-2xl font-bold text-[#FAF5ED] mb-2">
                  {todayMemory.title}
                </h3>
                <p className="font-serif italic text-sm text-[#FDE08B] mb-2">
                  {todayMemory.location}
                </p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {todayMemory.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. OUR LITTLE CONSTELLATION (Interactive Celestial Sky) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDE08B] font-bold">
              THE CELESTIAL VAULT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF5ED] font-bold mt-1">
              Our Little Constellation
            </h2>
            <p className="font-serif italic text-sm text-[#DDA0A4] mt-1">
              Tap any star to illuminate a hidden verse, vow, or memory
            </p>
          </div>

          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-3xl border border-[#B88B4A]/40 bg-[#0E1D19] overflow-hidden p-6 sm:p-10 shadow-2xl">
            {/* Subtle Star Grid & Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#B88B4A]/25 stroke-dasharray-4">
              <line x1="25%" y1="30%" x2="48%" y2="22%" strokeWidth="1" />
              <line x1="48%" y1="22%" x2="72%" y2="38%" strokeWidth="1" />
              <line x1="48%" y1="22%" x2="38%" y2="65%" strokeWidth="1" />
              <line x1="38%" y1="65%" x2="62%" y2="75%" strokeWidth="1" />
            </svg>

            {/* Stars */}
            {stars.map((star) => {
              const isSelected = activeStar?.id === star.id;
              return (
                <button
                  key={star.id}
                  onClick={() => setActiveStar(star)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-hidden"
                  style={{ left: `${star.coordinates.x}%`, top: `${star.coordinates.y}%` }}
                >
                  <div
                    className={`relative rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "w-8 h-8 bg-[#FDE08B] shadow-[0_0_25px_#FDE08B]"
                        : "w-5 h-5 bg-[#FAF5ED]/80 hover:bg-[#FDE08B] hover:scale-125 shadow-[0_0_12px_rgba(253,224,139,0.5)]"
                    }`}
                  >
                    <Star
                      className={`w-3 h-3 ${isSelected ? "text-[#132521] fill-current" : "text-[#132521]"}`}
                    />
                  </div>
                  <span className="block mt-1 text-[10px] font-mono text-[#FDE08B] whitespace-nowrap opacity-80 group-hover:opacity-100">
                    {star.starName}
                  </span>
                </button>
              );
            })}

            {/* Selected Star Details Popup */}
            {activeStar && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md rounded-2xl p-5 bg-[#132521]/95 border border-[#FDE08B]/60 shadow-2xl backdrop-blur-md animate-in fade-in duration-150">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FDE08B] font-bold">
                      {activeStar.starName} • {activeStar.dateHint}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#FAF5ED] mt-0.5">
                      {activeStar.memoryTitle}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveStar(null)}
                    className="p-1 rounded-full text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-serif italic text-sm text-[#FDE08B] mt-2 leading-relaxed">
                  &ldquo;{activeStar.quote}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. IMPORTANT PLACES THAT HOLD OUR STORIES */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDE08B] font-bold">
              SANCTUARY GEOGRAPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF5ED] font-bold mt-1">
              Places That Hold Our Stories
            </h2>
            <p className="font-serif italic text-sm text-[#DDA0A4] mt-1">
              Namo Garden, Freesia Meadow, Melody Cottage, and the paths where our world began
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className="rounded-3xl overflow-hidden border border-[#B88B4A]/30 bg-[#132521]/80 hover:border-[#FDE08B] hover:shadow-celestial-glow transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-xs font-mono text-[#FDE08B]">
                    {place.visitCount} visits
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FDE08B] font-bold">
                      {place.nickname}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#FAF5ED] mt-1 mb-2">
                      {place.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#DDA0A4] mb-3">
                      {place.significance}
                    </p>
                    <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                      {place.story}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#B88B4A]/20 flex items-center justify-between text-xs text-[#FDE08B]">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-white/50">
                      <MapPin className="w-3 h-3 text-[#FDE08B]" />
                      <span>{place.locationNote}</span>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. RELATIONSHIP CHRONOLOGICAL TIMELINE */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDE08B] font-bold">
              THE CHRONICLE OF US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF5ED] font-bold mt-1">
              Our Relationship Timeline
            </h2>
            <p className="font-serif italic text-sm text-[#DDA0A4] mt-1">
              Every turning point, bridge, midnight conversation, and sacred milestone
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-2.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B88B4A]/30">
            {timeline.map((item) => (
              <div key={item.id} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-6 sm:-left-10 mt-1.5 w-5 h-5 rounded-full border-2 border-[#FDE08B] bg-[#132521] flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[#FDE08B]" />
                </div>

                <div className="rounded-2xl p-6 sm:p-8 border border-[#B88B4A]/30 bg-[#132521]/80 hover:border-[#FDE08B] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[#FDE08B] font-bold uppercase tracking-wider">
                      {item.date} • {item.location}
                    </span>
                    {item.coordinatesLabel && (
                      <span className="text-[11px] font-mono text-white/50">
                        {item.coordinatesLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#FAF5ED] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80 mb-4">
                    {item.description}
                  </p>

                  {item.detailedStory && (
                    <div className="p-4 rounded-xl bg-[#172D29] border-l-2 border-[#FDE08B] text-xs font-serif italic text-[#FAF5ED] leading-relaxed">
                      {item.detailedStory}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Place Detail Modal */}
        {selectedPlace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border border-[#FDE08B]/40 bg-[#132521] text-[#FAF5ED] relative shadow-2xl">
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FDE08B]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden mb-6 border border-[#B88B4A]/30">
                <Image src={selectedPlace.image} alt={selectedPlace.name} fill className="object-cover" />
              </div>

              <span className="text-xs font-mono uppercase text-[#FDE08B] font-bold">
                {selectedPlace.nickname}
              </span>
              <h3 className="font-serif text-3xl font-bold mt-1 mb-2">
                {selectedPlace.name}
              </h3>
              <p className="font-serif italic text-sm text-[#DDA0A4] mb-4">
                {selectedPlace.significance}
              </p>
              <div className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                {selectedPlace.story}
              </div>

              <div className="pt-4 border-t border-[#B88B4A]/30 flex items-center justify-between text-xs font-mono text-white/60">
                <span>Location: {selectedPlace.locationNote}</span>
                <span>Visits: {selectedPlace.visitCount} times</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
