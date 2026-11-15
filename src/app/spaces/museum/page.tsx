"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Palette,
  Maximize2,
  Calendar,
  Layers,
  PlusCircle,
  Eye,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { MediaLightbox } from "@/components/media/MediaLightbox";
import { ArtworkItem } from "@/types/content";

export default function MuseumOfHerPage() {
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);

  const artworks = data.artworks;

  const filteredArtworks = artworks.filter((art) => {
    if (activeCategory === "all") return true;
    return art.galleryCategory === activeCategory;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <RoomHeader
        roomNumber="Room IV"
        title="Museum of Her"
        subtitle="An intimate private gallery of original artistic expressions and color studies"
        description="Every canvas wash, graphite pencil study, and textured impasto stroke. Explore her evolving collection of botanical studies, quiet landscape vistas, and personal color harmonies."
        badgeCategory="Art & Creative Expressions"
        stats={[
          { label: "Archived Pieces", count: artworks.length },
          { label: "Mediums Studied", count: "4" },
        ]}
      >
        <Link
          href="/admin?tab=artworks"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Exhibit New Artwork</span>
        </Link>
      </RoomHeader>

      {/* 2. Gallery Category Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gold/20">
        {[
          { id: "all", label: "Full Exhibition" },
          { id: "watercolors", label: "Watercolors & Gouache" },
          { id: "paintings", label: "Impasto & Oils" },
          { id: "sketches", label: "Graphite Sketches" },
          { id: "digital", label: "Digital Studies" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              activeCategory === tab.id
                ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
                : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Exhibition Artwork Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArtworks.map((art) => (
          <div
            key={art.id}
            className={`rounded-3xl overflow-hidden border transition-all duration-500 group flex flex-col justify-between hover:shadow-storybook ${
              isNight
                ? "bg-[#18312B]/90 border-[#B88B4A]/30 hover:border-[#FDE08B] text-[#FAF5ED]"
                : "bg-[#FCFAF6] border-gold/30 hover:border-gold text-cocoa"
            }`}
          >
            {/* Museum Frame & Canvas Preview */}
            <div className="p-4 sm:p-5 pb-0">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-gold/25 bg-[#EADFD8] shadow-inner">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <button
                  onClick={() => setSelectedArtwork(art)}
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white text-xs font-semibold tracking-wider uppercase transition-opacity backdrop-blur-xs"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Inspect Canvas</span>
                </button>
              </div>
            </div>

            {/* Museum Gallery Plaque */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-gold mb-1">
                <span className="uppercase tracking-wider">{art.mediumLabel}</span>
                <span>{art.year}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-gold transition-colors">
                {art.title}
              </h3>

              {art.dimensions && (
                <div className="text-[11px] text-cocoa/50 font-mono mb-3">
                  Dimensions: {art.dimensions}
                </div>
              )}

              <p className="text-xs text-cocoa/80 leading-relaxed line-clamp-3 mb-4">
                {art.description}
              </p>

              {/* Palette Color Swatches */}
              {art.paletteColors && art.paletteColors.length > 0 && (
                <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cocoa/50">
                    Palette Swatches
                  </span>
                  <div className="flex items-center gap-1.5">
                    {art.paletteColors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Canvas Lightbox Inspection */}
      {selectedArtwork && (
        <MediaLightbox
          isOpen={Boolean(selectedArtwork)}
          onClose={() => setSelectedArtwork(null)}
          images={[selectedArtwork.image]}
          currentIndex={0}
          onIndexChange={() => {}}
          title={selectedArtwork.title}
          caption={`${selectedArtwork.mediumLabel} • ${selectedArtwork.dimensions || ""}`}
          date={selectedArtwork.year}
          location="Anavi's Studio"
        />
      )}
    </div>
  );
}
