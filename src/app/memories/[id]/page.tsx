"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Edit3,
  Bookmark,
  Sparkles,
} from "lucide-react";
import { useStorybookData } from "@/lib/contentStore";
import { useAuth } from "@/context/AuthContext";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { WaxSealBadge } from "@/components/ui/WaxSealBadge";
import { StorybookAudioPlayer } from "@/components/media/StorybookAudioPlayer";
import { MediaLightbox } from "@/components/media/MediaLightbox";

export default function MemoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const { isAuthenticated } = useAuth();

  const memoryId = params?.id as string;
  const memories = data.memories;

  const currentIndex = memories.findIndex((m) => m.id === memoryId);
  const memory = memories[currentIndex] || memories[0];

  const prevMemory = currentIndex > 0 ? memories[currentIndex - 1] : null;
  const nextMemory = currentIndex < memories.length - 1 ? memories[currentIndex + 1] : null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!memory) {
    return (
      <div className="pt-40 pb-20 text-center max-w-xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-cocoa">Memory Not Found</h1>
        <p className="text-cocoa/70 text-sm mt-2">
          This page may have been moved or has not yet been inscribed.
        </p>
        <Link
          href="/spaces/memories"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full bg-gold text-[#172D29] font-semibold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to House of Memories</span>
        </Link>
      </div>
    );
  }

  const galleryImages = memory.images && memory.images.length > 0 ? memory.images : [memory.coverImage];

  return (
    <div className="pt-28 sm:pt-36 pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Return Navigation & Edit Action */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/spaces/memories"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-cocoa transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to House of Memories</span>
        </Link>

        {isAuthenticated && (
          <Link
            href={`/admin?tab=memories&editId=${memory.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold/40 text-xs font-medium text-gold hover:bg-gold/15 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Entry</span>
          </Link>
        )}
      </div>

      {/* 2. Editorial Header */}
      <article
        className={`rounded-3xl p-6 sm:p-12 border transition-all ${
          isNight
            ? "bg-[#132521]/90 backdrop-blur-md border-[#B88B4A]/40 text-[#FAF5ED]"
            : "bg-[#FCFAF6] border-gold/30 shadow-storybook text-cocoa"
        }`}
      >
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-[11px] font-mono uppercase tracking-widest text-gold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Chronicle Vol. I • Keepsake Entry</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mt-2">
            {memory.title}
          </h1>

          <p className="font-serif italic text-base sm:text-xl text-gold-deep mt-3">
            &ldquo;{memory.caption}&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-cocoa/60 font-mono mt-6 pt-4 border-t border-gold/20">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{memory.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>{memory.location}</span>
            </span>
            {memory.locationDetails && (
              <>
                <span>•</span>
                <span className="italic font-serif">{memory.locationDetails}</span>
              </>
            )}
          </div>
        </header>

        {/* 3. Hero Photograph / Gallery Carousel */}
        <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-gold/30 shadow-lg mb-6 group">
          <Image
            src={galleryImages[activePhotoIndex]}
            alt={memory.title}
            fill
            className="object-cover"
            priority
          />
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-transform hover:scale-110"
            title="Inspect Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Multi-Photo Thumbnail Bar */}
        {galleryImages.length > 1 && (
          <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto py-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activePhotoIndex === idx
                    ? "border-gold scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* 4. Voice Keepsake Player (if attached) */}
        {memory.audioRecordingUrl && (
          <div className="max-w-2xl mx-auto my-8">
            <StorybookAudioPlayer
              src={memory.audioRecordingUrl}
              title={memory.audioTitle || "Voice Note & Garden Atmosphere"}
              subtitle={`Recorded at ${memory.location}`}
            />
          </div>
        )}

        <BotanicalDivider variant={isNight ? "celestial" : "floral"} className="my-8" />

        {/* 5. Editorial Story Body */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-stone max-w-none text-base sm:text-lg leading-relaxed font-sans text-cocoa/90">
            <p className="first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {memory.story}
            </p>
          </div>

          {/* 6. Handwritten Personal Note Card */}
          {memory.personalNote && (
            <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#F7F2EA] border border-gold/30 relative shadow-sm">
              <div className="flex items-start gap-4">
                <WaxSealBadge label="A" size="sm" variant="gold" className="shrink-0 mt-1" />
                <div className="flex-1">
                  <span className="block font-serif text-xs font-bold uppercase tracking-wider text-gold mb-1">
                    A Tender Marginal Note
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-cocoa-deep leading-relaxed">
                    &ldquo;{memory.personalNote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gold/20">
              <Bookmark className="w-3.5 h-3.5 text-gold" />
              {memory.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold-deep text-[11px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* 7. Previous and Next Memory Navigation */}
      <nav className="mt-12 flex flex-col sm:flex-row items-stretch justify-between gap-4">
        {prevMemory ? (
          <Link
            href={`/memories/${prevMemory.id}`}
            className="flex-1 p-5 rounded-2xl border border-gold/25 bg-[#FAF7F2] hover:border-gold transition-all group flex items-center gap-3"
          >
            <ChevronLeft className="w-5 h-5 text-gold group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[10px] uppercase tracking-wider text-cocoa/50 font-semibold">
                Previous Keepsake
              </span>
              <span className="font-serif font-bold text-sm text-cocoa group-hover:text-gold transition-colors truncate block">
                {prevMemory.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextMemory ? (
          <Link
            href={`/memories/${nextMemory.id}`}
            className="flex-1 p-5 rounded-2xl border border-gold/25 bg-[#FAF7F2] hover:border-gold transition-all group flex items-center justify-end gap-3 text-right"
          >
            <div className="text-right min-w-0">
              <span className="block text-[10px] uppercase tracking-wider text-cocoa/50 font-semibold">
                Next Keepsake
              </span>
              <span className="font-serif font-bold text-sm text-cocoa group-hover:text-gold transition-colors truncate block">
                {nextMemory.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>

      {/* Lightbox Component */}
      <MediaLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryImages}
        currentIndex={activePhotoIndex}
        onIndexChange={setActivePhotoIndex}
        title={memory.title}
        caption={memory.caption}
        date={memory.date}
        location={memory.location}
      />
    </div>
  );
}
