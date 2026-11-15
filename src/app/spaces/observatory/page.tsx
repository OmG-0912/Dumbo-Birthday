"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  MapPin,
  Star,
  CheckCircle,
  PlusCircle,
  Calendar,
  Globe2,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { DreamItem, DreamCategory, DreamStatus } from "@/types/content";

export default function ObservatoryOfDreamsPage() {
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const dreams = data.dreams;

  const filteredDreams = dreams.filter((d) => {
    if (selectedCategory !== "all" && d.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && d.status !== selectedStatus) return false;
    return true;
  });

  const statusBadges: Record<DreamStatus, { label: string; icon: string; style: string }> = {
    dreaming: { label: "Starlit Dream", icon: "✨", style: "bg-purple-500/10 text-purple-700 border-purple-300" },
    planning: { label: "In Active Planning", icon: "🧭", style: "bg-amber-500/10 text-amber-700 border-amber-300" },
    fulfilled: { label: "Fulfilled Adventure", icon: "🌸", style: "bg-emerald-500/10 text-emerald-700 border-emerald-300" },
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <RoomHeader
        roomNumber="Room VI"
        title="Observatory of Dreams"
        subtitle="A brass telescope trained upon future horizons, wanderlust voyages, and starlit vows"
        description="Every destination waiting for her footsteps, from misty Scottish highland lochs to high-altitude celestial stargazing in the Atacama desert. Track departures, planned itineraries, and dreams written across tomorrow's sky."
        badgeCategory="Wanderlust & Celestial Ambitions"
        stats={[
          { label: "Wanderlust Horizons", count: dreams.length },
          { label: "Planned Departures", count: dreams.filter((d) => d.status === "planning").length },
        ]}
      >
        <Link
          href="/admin?tab=dreams"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Inscribe Horizon</span>
        </Link>
      </RoomHeader>

      {/* 2. Interactive Horizon Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gold/20">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {[
            { id: "all", label: "All Horizons" },
            { id: "wanderlust_travel", label: "Wanderlust Travel" },
            { id: "cosmic_ambition", label: "Cosmic Expeditions" },
            { id: "creative_dream", label: "Creative Milestones" },
            { id: "bucket_list", label: "Bucket List" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedCategory === tab.id
                  ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
                  : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-cocoa/50 font-serif italic">Status:</span>
          {(["all", "dreaming", "planning", "fulfilled"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono capitalize transition-colors ${
                selectedStatus === st
                  ? "bg-gold text-[#172D29] font-bold"
                  : "bg-gold/10 text-cocoa/70 hover:bg-gold/20"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Horizon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDreams.map((dream) => {
          const badge = statusBadges[dream.status];

          return (
            <div
              key={dream.id}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group hover:shadow-storybook ${
                isNight
                  ? "bg-[#18312B]/90 border-[#B88B4A]/30 hover:border-[#FDE08B] text-[#FAF5ED]"
                  : "bg-[#FCFAF6] border-gold/30 hover:border-gold text-cocoa"
              }`}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/10">
                <Image
                  src={dream.coverImage}
                  alt={dream.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider backdrop-blur-md border ${badge.style}`}
                >
                  <span className="mr-1">{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
                {dream.targetYear && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-mono text-[10px]">
                    Year {dream.targetYear}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {dream.locationName && (
                    <div className="flex items-center gap-1.5 text-xs text-gold font-mono uppercase mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dream.locationName}</span>
                      {dream.country && <span>, {dream.country}</span>}
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-bold group-hover:text-gold transition-colors mb-2">
                    {dream.title}
                  </h3>

                  <p className="text-xs text-cocoa/80 leading-relaxed mb-4">
                    {dream.description}
                  </p>

                  {/* Itinerary Notes */}
                  {dream.itineraryNotes && dream.itineraryNotes.length > 0 && (
                    <div className="pt-3 border-t border-gold/15 space-y-1.5">
                      <span className="block text-[10px] uppercase tracking-wider font-semibold text-cocoa/50 mb-1">
                        Anticipated Itinerary:
                      </span>
                      {dream.itineraryNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-cocoa/75">
                          <span className="text-gold font-mono">•</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-gold font-mono">
                  <span className="capitalize">{dream.category.replace("_", " ")}</span>
                  <span>Constellation Target</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
