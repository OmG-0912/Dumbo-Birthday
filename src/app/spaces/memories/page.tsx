"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  Film,
  Calendar,
  Clock,
  MapPin,
  Heart,
  PlusCircle,
  ExternalLink,
  Play,
  Volume2,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { MediaLightbox } from "@/components/media/MediaLightbox";
import { MemoryItem } from "@/types/content";

type MemoryFilter = "all" | "polaroid" | "film" | "editorial" | "timeline";

export default function HouseOfMemoriesPage() {
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const [activeFilter, setActiveFilter] = useState<MemoryFilter>("all");
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
    caption: string;
    date: string;
    location: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: "",
    caption: "",
    date: "",
    location: "",
  });

  const memories = data.memories;

  const filteredMemories = useMemo(() => {
    if (activeFilter === "all" || activeFilter === "timeline") return memories;
    return memories.filter((m) => m.format === activeFilter);
  }, [memories, activeFilter]);

  const openLightbox = (m: MemoryItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxData({
      isOpen: true,
      images: m.images && m.images.length > 0 ? m.images : [m.coverImage],
      index: 0,
      title: m.title,
      caption: m.caption,
      date: m.date,
      location: m.location,
    });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Storybook Room Header */}
      <RoomHeader
        roomNumber="Room I"
        title="House of Memories"
        subtitle="A sanctuary for moments preserved in amber"
        description="Every photograph, tender caption, candid laughter, and quiet afternoon, gently preserved in a timeless living scrapbook. Browse by format, view chronologically along the timeline, or open individual memories for their full story."
        badgeCategory="Chronicle & Keepsakes"
        stats={[
          { label: "Treasured Moments", count: memories.length },
          { label: "Photo Captures", count: memories.reduce((acc, m) => acc + (m.images?.length || 1), 0) },
        ]}
      >
        <Link
          href="/admin?tab=memories"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Memory</span>
        </Link>
      </RoomHeader>

      {/* 2. Format & View Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gold/20">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
          {[
            { id: "all", label: "All Keepsakes", icon: Camera },
            { id: "polaroid", label: "Polaroids", icon: Sparkles },
            { id: "film", label: "Film Strip", icon: Film },
            { id: "editorial", label: "Editorial Stories", icon: Heart },
            { id: "timeline", label: "Timeline View", icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as MemoryFilter)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? isNight
                      ? "bg-[#FDE08B] text-[#132521] shadow-md font-semibold"
                      : "bg-[#172D29] text-[#FDE08B] shadow-md font-semibold"
                    : isNight
                    ? "bg-[#18312B]/70 text-[#FAF5ED]/80 hover:bg-[#1E3B36]"
                    : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-cocoa/60 font-serif italic">
          Showing {filteredMemories.length} preserved memory{" "}
          {filteredMemories.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* 3. TIMELINE VIEW */}
      {activeFilter === "timeline" ? (
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold/30">
          {memories.map((m) => (
            <div key={m.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-6 sm:-left-10 mt-1.5 w-5 h-5 rounded-full border-2 border-gold bg-[#FAF7F2] flex items-center justify-center group-hover:scale-125 transition-transform shadow-xs">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>

              <div
                className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                  isNight
                    ? "bg-[#18312B]/80 border-[#B88B4A]/30 hover:border-[#FDE08B]"
                    : "bg-[#FCFAF6] border-gold/30 hover:border-gold hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                      {m.date}
                    </span>
                    <span className="text-xs text-cocoa/50">•</span>
                    <span className="flex items-center gap-1 text-xs text-cocoa/70">
                      <MapPin className="w-3 h-3 text-gold" />
                      {m.location}
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest font-serif text-gold-deep bg-gold/10 px-2.5 py-0.5 rounded-full self-start">
                    {m.format}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-cocoa font-semibold mb-2">
                  {m.title}
                </h3>
                <p className="font-serif italic text-gold-deep text-sm mb-4">
                  {m.caption}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="relative h-48 md:col-span-1 rounded-xl overflow-hidden border border-gold/20 group/img">
                    <Image
                      src={m.coverImage}
                      alt={m.title}
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => openLightbox(m, e)}
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white text-xs font-medium transition-opacity"
                    >
                      Enlarge Photograph
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <p className="text-sm leading-relaxed text-cocoa/80 line-clamp-3">
                      {m.story}
                    </p>
                    {m.personalNote && (
                      <div className="p-3 rounded-xl bg-gold/10 border-l-2 border-gold text-xs font-serif italic text-cocoa">
                        {m.personalNote}
                      </div>
                    )}
                    <div className="pt-2">
                      <Link
                        href={`/memories/${m.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-cocoa transition-colors"
                      >
                        <span>Read Full Chronicle Entry</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 4. GRID / POLAROID / FILM VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMemories.map((m) => {
            const isPolaroid = m.format === "polaroid";

            if (isPolaroid) {
              return (
                <div
                  key={m.id}
                  className="group relative bg-[#FBF9F5] p-4 sm:p-5 pb-8 rounded-sm shadow-storybook border border-gold/20 hover:-rotate-1 hover:scale-102 transition-all duration-300 flex flex-col justify-between"
                  style={{
                    boxShadow: "0 10px 25px -5px rgba(61,46,40,0.12), 0 8px 10px -6px rgba(61,46,40,0.08)",
                  }}
                >
                  <div>
                    <div className="relative aspect-4/5 w-full bg-[#EADFD8] overflow-hidden rounded-xs border border-cocoa/10 mb-4">
                      <Image
                        src={m.coverImage}
                        alt={m.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <button
                        onClick={(e) => openLightbox(m, e)}
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-medium transition-opacity"
                        aria-label="Enlarge polaroid photo"
                      >
                        Inspect Photograph
                      </button>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-cocoa group-hover:text-gold transition-colors">
                      {m.title}
                    </h3>
                    <p className="font-serif italic text-xs text-gold-deep mt-1 line-clamp-2">
                      {m.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-[11px] text-cocoa/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" />
                      {m.date}
                    </span>
                    <Link
                      href={`/memories/${m.id}`}
                      className="font-serif italic text-gold font-bold hover:underline"
                    >
                      Open Story &rarr;
                    </Link>
                  </div>
                </div>
              );
            }

            // Editorial / Film Card
            return (
              <div
                key={m.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  isNight
                    ? "bg-[#18312B]/90 border-[#B88B4A]/30 hover:border-[#FDE08B] text-[#FAF5ED]"
                    : "bg-[#FCFAF6] border-gold/30 hover:border-gold hover:shadow-storybook text-cocoa"
                }`}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black/10">
                  <Image
                    src={m.coverImage}
                    alt={m.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white font-medium">
                    {m.format}
                  </div>
                  {m.audioRecordingUrl && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#172D29]/90 text-[#FDE08B] border border-[#FDE08B]/40">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <button
                    onClick={(e) => openLightbox(m, e)}
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-medium transition-opacity"
                  >
                    Quick View
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gold font-mono uppercase mb-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{m.location}</span>
                      <span>•</span>
                      <span>{m.date}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-gold transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-cocoa/70 mt-1 line-clamp-2 leading-relaxed">
                      {m.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-cocoa/50">
                      {m.images?.length || 1} photographs
                    </span>
                    <Link
                      href={`/memories/${m.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-cocoa transition-colors"
                    >
                      <span>Read Story</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Lightbox Modal */}
      <MediaLightbox
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
        images={lightboxData.images}
        currentIndex={lightboxData.index}
        onIndexChange={(idx) => setLightboxData((prev) => ({ ...prev, index: idx }))}
        title={lightboxData.title}
        caption={lightboxData.caption}
        date={lightboxData.date}
        location={lightboxData.location}
      />
    </div>
  );
}
