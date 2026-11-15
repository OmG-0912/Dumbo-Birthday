"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Sparkles,
  Heart,
  Volume2,
  Upload,
  RotateCcw,
  Home,
  Check,
  Edit2,
  X,
  Mic,
  Maximize2,
  Camera,
  Flame,
  Star,
} from "lucide-react";
import { StorybookAudioPlayer } from "@/components/media/StorybookAudioPlayer";
import { WaxSealBadge } from "@/components/ui/WaxSealBadge";
import { BirthdayPhoto } from "@/types/birthday";
import { OUR_REAL_PHOTOS } from "@/data/birthdayData";
import { MediaLightbox } from "@/components/media/MediaLightbox";

interface BirthdaySurpriseStageProps {
  prompt: string;
  message: string;
  quote: string;
  voiceNoteUrl?: string;
  voiceNoteTitle?: string;
  voiceNoteSubtitle?: string;
  voiceNote2Url?: string;
  voiceNote2Title?: string;
  voiceNote2Subtitle?: string;
  surprisePhotos?: BirthdayPhoto[];
  onUpdateSurprise: (updates: {
    prompt?: string;
    message?: string;
    quote?: string;
    voiceNoteUrl?: string;
    voiceNoteTitle?: string;
    voiceNoteSubtitle?: string;
    voiceNote2Url?: string;
    voiceNote2Title?: string;
    voiceNote2Subtitle?: string;
  }) => void;
  onReplay: () => void;
}

export const BirthdaySurpriseStage: React.FC<BirthdaySurpriseStageProps> = ({
  prompt,
  message,
  quote,
  voiceNoteUrl = "/audio/birthday/voice_note_1.m4a",
  voiceNoteTitle = "Part I: How Our Story Began",
  voiceNoteSubtitle = "18 August 2024 to 4 March at Namo Garden • Recorded with love by your Monkey (12:42)",
  voiceNote2Url,
  voiceNote2Title = "Part II: A Second Surprise Keepsake",
  voiceNote2Subtitle = "A second personal message recorded just for you • Ready for upload",
  surprisePhotos = OUR_REAL_PHOTOS,
  onUpdateSurprise,
  onReplay,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Edit fields
  const [editMessage, setEditMessage] = useState(message);
  const [editQuote, setEditQuote] = useState(quote);

  // Audio Upload Refs
  const audioInput1Ref = useRef<HTMLInputElement | null>(null);
  const audioInput2Ref = useRef<HTMLInputElement | null>(null);

  const photosList = surprisePhotos && surprisePhotos.length > 0 ? surprisePhotos : OUR_REAL_PHOTOS;

  const filteredPhotos = activeCategory === "all"
    ? photosList
    : photosList.filter((p) => p.category === activeCategory);

  const handleOpenGift = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 700);
  };

  const handleAudio1Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        onUpdateSurprise({
          voiceNoteUrl: base64Url,
          voiceNoteTitle: file.name.replace(/\.[^/.]+$/, "") || "Part I: Personal Voice Keepsake",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAudio2Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        onUpdateSurprise({
          voiceNote2Url: base64Url,
          voiceNote2Title: file.name.replace(/\.[^/.]+$/, "") || "Part II: Personal Voice Keepsake",
          voiceNote2Subtitle: "Recorded with love • Ready to listen",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = () => {
    onUpdateSurprise({
      message: editMessage,
      quote: editQuote,
    });
    setIsEditing(false);
  };

  const openLightboxForPhoto = (photo: BirthdayPhoto) => {
    const idx = photosList.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  const lightboxImages = photosList.map((p) => p.url);

  return (
    <section className="py-12 sm:py-16 relative">
      {/* Hidden Audio File Inputs for Part 1 and Part 2 */}
      <input
        type="file"
        ref={audioInput1Ref}
        onChange={handleAudio1Upload}
        accept="audio/*"
        className="hidden"
      />
      <input
        type="file"
        ref={audioInput2Ref}
        onChange={handleAudio2Upload}
        accept="audio/*"
        className="hidden"
      />

      {/* Stage Header */}
      <div className="text-center max-w-xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/30 text-[#B88B4A] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
          <span>Stage V • The Grand Birthday Surprise</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172D29] tracking-tight mb-2">
          {isOpen ? "Our Secret Sanctuary" : "A Gift for the Journey Ahead"}
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#60463E]">
          {isOpen
            ? "Every smile, every laugh, and every quiet heartbeat we have shared."
            : prompt}
        </p>
      </div>

      {/* =========================================================================
          THE UNOPENED GIFT BOX OR THE UNWRAPPED BEAUTIFUL SCENE
         ========================================================================= */}
      {!isOpen ? (
        /* UNOPENED LUXURY GIFT BOX */
        <div className="max-w-2xl mx-auto px-4">
          <div
            onClick={handleOpenGift}
            className={`relative rounded-3xl bg-gradient-to-b from-[#1E3B36] to-[#122421] border-2 border-[#B88B4A]/60 shadow-[0_25px_60px_rgba(23,45,41,0.4)] p-10 sm:p-16 text-center cursor-pointer transition-all duration-500 group ${
              isOpening ? "scale-105 opacity-90" : "hover:scale-[1.02] hover:border-[#FDE08B]"
            }`}
          >
            {/* Satin Ribbon Crossing */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 sm:h-12 bg-gradient-to-r from-[#B88B4A]/60 via-[#FDE08B]/80 to-[#B88B4A]/60 pointer-events-none shadow-md" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 bg-gradient-to-b from-[#B88B4A]/60 via-[#FDE08B]/80 to-[#B88B4A]/60 pointer-events-none shadow-md" />

            {/* Central Rosette Wax Seal Bow */}
            <div className="relative z-10 flex flex-col items-center justify-center py-6 sm:py-8">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#172D29] border-2 border-[#FDE08B] flex items-center justify-center shadow-celestial-glow transition-transform duration-300 ${
                  isOpening ? "rotate-45 scale-125" : "group-hover:scale-110"
                }`}
              >
                <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-[#FDE08B] animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F1E7] mt-6 tracking-wide drop-shadow-sm">
                For Anavi
              </h3>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FDE08B] mt-1 block">
                16 November • Private Memory Keepsake
              </span>

              <div className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FDE08B] text-[#172D29] font-semibold text-xs sm:text-sm shadow-lg group-hover:bg-[#FFF2B2] transition-colors">
                <Sparkles className="w-4 h-4 text-[#172D29]" />
                <span>{isOpening ? "Unwrapping The Surprise..." : "Click to Unwrap Gift"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =======================================================================
            UNWRAPPED MAGICAL CELEBRATION SCENE (With All 15 Real Photos!)
           ======================================================================= */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 animate-in fade-in duration-1000">
          
          {/* 1. FAIRY LIGHTS DECORATIVE HEADER */}
          <div className="relative w-full py-4 text-center overflow-hidden">
            {/* Hanging String of Fairy Lights */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-px h-3 bg-amber-400/50" />
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#FDE08B] animate-pulse"
                    style={{ animationDuration: `${2 + (i % 3) * 0.5}s`, animationDelay: `${i * 0.2}s` }}
                  />
                </div>
              ))}
            </div>
            <div className="h-px w-2/3 mx-auto bg-gradient-to-r from-transparent via-[#B88B4A]/40 to-transparent mt-1" />
          </div>

          {/* 2. HERO CENTERPIECE: INTIMATE EMBRACE PORTRAIT */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#172D29] via-[#1A332E] to-[#122421] border-2 border-[#B88B4A]/50 p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(23,45,41,0.5)] overflow-hidden">
            {/* Ambient golden glow behind centerpiece */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#FDE08B]/12 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              {/* Left / Center Portrait in Ornate Gilded Arch */}
              <div
                onClick={() => openLightboxForPhoto(photosList[0])}
                className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden p-2 bg-gradient-to-b from-[#FDE08B]/40 to-[#B88B4A]/40 shadow-2xl cursor-pointer group hover:scale-[1.02] transition-transform duration-500 shrink-0"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1412]">
                  <Image
                    src={photosList[0]?.url || "/images/birthday/ours_peaceful_embrace.png"}
                    alt={photosList[0]?.title || "Quiet Peace in Your Arms"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Scrim & View Prompt */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FDE08B]" />
                      <span>View Full Resolution</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Heartfelt Centerpiece Inscription */}
              <div className="flex-1 text-center md:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132521] border border-[#FDE08B]/30 text-[#FDE08B] text-xs font-semibold uppercase tracking-[0.25em]">
                  <Heart className="w-3.5 h-3.5 fill-[#FDE08B]" />
                  <span>Our Centerpiece Keepsake</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F7F1E7] leading-tight">
                  Quiet Peace in Your Arms
                </h3>

                <p className="font-serif text-lg sm:text-xl text-[#FDE08B] italic leading-relaxed">
                  &ldquo;Resting my chin against your cheek, eyes closed, feeling like all the rush of the world has finally paused. You are my safe place, my quiet joy, and my home.&rdquo;
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#F7F1E7]/80 leading-relaxed max-w-xl">
                  Through every season, every silly laugh over face masks, every walk under city lights, and every quiet morning, having you by my side has made this life infinitely more beautiful.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#FDE08B] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#FDE08B]" />
                    <span>15 Cherished Moments</span>
                  </span>
                  <span>•</span>
                  <span>16 November Celebration</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CATEGORY FILTER TABS FOR THE MOMENTS WALL */}
          <div className="text-center pt-4">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#172D29] mb-3">
              The Constellation of Us
            </h4>
            <p className="font-serif italic text-sm sm:text-base text-[#60463E] mb-6">
              Click any photograph to open the full-screen storybook viewer.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/30 shadow-xs">
              {[
                { id: "all", label: `All Memories (${photosList.length})` },
                { id: "cherished", label: "Cherished & Sacred" },
                { id: "cozy", label: "Cozy Together" },
                { id: "playful", label: "Playful & Goofy" },
                { id: "night", label: "Night Lights" },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
                        : "text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. THE 15-PHOTO POLAROID SCRAPBOOK WALL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
            {filteredPhotos.map((photo, index) => {
              const rotationClass = photo.rotation || (index % 2 === 0 ? "-rotate-1" : "rotate-1");

              return (
                <div
                  key={photo.id}
                  onClick={() => openLightboxForPhoto(photo)}
                  className={`group relative flex flex-col transition-all duration-300 hover:scale-[1.03] hover:z-20 cursor-pointer ${rotationClass}`}
                >
                  {/* Polaroid Frame Container */}
                  <div className="relative rounded-2xl bg-[#FCFAF7] p-3 sm:p-4 pb-6 shadow-storybook hover:shadow-2xl border border-[#B88B4A]/25 overflow-hidden transition-all duration-500">
                    {/* Clothespin / Washi Tape Accent at Top */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-100/80 border border-amber-300/40 rounded-xs shadow-xs rotate-[-2deg] z-20 pointer-events-none" />

                    {/* Photograph Container */}
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#EAE0D1]">
                      <Image
                        src={photo.url}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Scrim Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                        <span className="text-white text-xs font-medium flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#FDE08B]" />
                          <span>View Fullscreen</span>
                        </span>
                      </div>

                      {/* Date Badge */}
                      {photo.date && (
                        <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#3D2A24] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                          {photo.date}
                        </div>
                      )}
                    </div>

                    {/* Captions */}
                    <div className="pt-3 px-1 text-center">
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-[#172D29] leading-snug">
                        {photo.title}
                      </h4>
                      <p className="font-serif italic text-xs sm:text-sm text-[#60463E] mt-1 line-clamp-3">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5. INTIMATE LOVE VOW & MESSAGE CARD */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#FAF6EE] border border-[#B88B4A]/40 shadow-storybook-lg p-6 sm:p-10 md:p-12 relative overflow-hidden mt-12">
            <div className="absolute inset-0 bg-deckle-edge opacity-30 pointer-events-none" />

            {/* Quick Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#60463E] hover:text-[#172D29] border border-[#B88B4A]/30 text-xs shadow-xs"
                title="Edit message"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}

            {isEditing ? (
              <div className="relative z-10 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#172D29]">
                  Edit Hidden Personal Vow
                </h4>
                <div>
                  <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                    Personal Message
                  </label>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows={4}
                    className="w-full font-serif text-base text-[#3D2A24] bg-white border border-[#B88B4A]/40 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-semibold text-[#172D29] mb-1">
                    Special Quote / Verse
                  </label>
                  <input
                    type="text"
                    value={editQuote}
                    onChange={(e) => setEditQuote(e.target.value)}
                    className="w-full font-serif text-sm text-[#3D2A24] bg-white border border-[#B88B4A]/40 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs text-[#60463E]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#172D29] text-[#FDE08B] text-xs font-medium"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#172D29] text-[#FDE08B] mx-auto shadow-md">
                  <Heart className="w-6 h-6 fill-[#FDE08B]" />
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B88B4A] block">
                    A Personal Vow & Birthday Wish
                  </span>
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#172D29] font-medium leading-relaxed italic max-w-xl mx-auto">
                    &ldquo;{message}&rdquo;
                  </p>
                </div>

                {quote && (
                  <div className="pt-4 border-t border-[#B88B4A]/25 max-w-md mx-auto">
                    <p className="font-serif italic text-xs sm:text-sm text-[#60463E]">
                      {quote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Wax Seal Stamp */}
            <div className="mt-8 flex justify-center relative z-10">
              <WaxSealBadge label="A" size="md" variant="gold" />
            </div>
          </div>

          {/* 6. TWO DEDICATED VOICE NOTE KEEPSAKE SECTIONS */}
          <div className="max-w-3xl mx-auto pt-6 space-y-6">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B88B4A] block mb-1">
                From The Heart
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#172D29]">
                Spoken Whispers & Voice Keepsakes
              </h4>
              <p className="font-serif italic text-xs sm:text-sm text-[#60463E] mt-1">
                Two personal voice recordings kept inside her birthday sanctuary.
              </p>
            </div>

            {/* VOICE NOTE PART 1 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EE] border border-[#B88B4A]/40 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#172D29] text-[#FDE08B] flex items-center justify-center shrink-0 shadow-xs">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-[#172D29]">
                        {voiceNoteTitle}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-semibold">
                        Ready • 12:42
                      </span>
                    </div>
                    <p className="font-serif italic text-xs text-[#60463E]">
                      {voiceNoteSubtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => audioInput1Ref.current?.click()}
                  className="self-end sm:self-auto inline-flex items-center gap-1 text-[11px] text-[#B88B4A] hover:text-[#172D29] hover:underline"
                  title="Replace or update Part 1 audio"
                >
                  <Upload className="w-3 h-3" />
                  <span>Replace Audio</span>
                </button>
              </div>

              <StorybookAudioPlayer
                src={voiceNoteUrl}
                title={voiceNoteTitle}
                subtitle={voiceNoteSubtitle}
                className="bg-white/90"
              />
            </div>

            {/* VOICE NOTE PART 2 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF6EE] border border-[#B88B4A]/40 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#B88B4A]/20 text-[#B88B4A] flex items-center justify-center shrink-0 shadow-xs">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-[#172D29]">
                        {voiceNote2Title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          voiceNote2Url
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {voiceNote2Url ? "Ready to Play" : "Part II • Ready for Upload"}
                      </span>
                    </div>
                    <p className="font-serif italic text-xs text-[#60463E]">
                      {voiceNote2Subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => audioInput2Ref.current?.click()}
                  className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172D29] text-[#FDE08B] text-xs font-medium hover:bg-[#1E3B36] transition-colors shadow-xs"
                >
                  <Upload className="w-3 h-3" />
                  <span>{voiceNote2Url ? "Change Part 2 Audio" : "Upload Voice Note 2"}</span>
                </button>
              </div>

              {voiceNote2Url ? (
                <StorybookAudioPlayer
                  src={voiceNote2Url}
                  title={voiceNote2Title}
                  subtitle={voiceNote2Subtitle}
                  className="bg-white/90"
                />
              ) : (
                <div
                  onClick={() => audioInput2Ref.current?.click()}
                  className="rounded-2xl border-2 border-dashed border-[#B88B4A]/30 p-6 text-center cursor-pointer hover:bg-white/50 transition-colors group"
                >
                  <Volume2 className="w-8 h-8 text-[#B88B4A]/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-serif text-sm font-semibold text-[#172D29]">
                    Voice Keepsake Part II
                  </p>
                  <p className="font-serif italic text-xs text-[#60463E] mt-0.5">
                    Click here to attach Part 2 when you&apos;re ready (MP3, M4A, or WAV).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Experience Navigation & Replay Buttons */}
      <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <button
          onClick={onReplay}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/40 text-[#60463E] hover:text-[#172D29] hover:bg-white text-xs sm:text-sm font-medium transition-all shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-[#B88B4A]" />
          <span>Replay Birthday Experience</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#172D29] text-[#FDE08B] hover:bg-[#1E3B36] text-xs sm:text-sm font-medium transition-all shadow-md"
        >
          <Home className="w-4 h-4 text-[#FDE08B]" />
          <span>Explore Anavi&apos;s World</span>
        </Link>
      </div>

      {/* Full-Screen Lightbox for the Surprise Memories */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        title={photosList[lightboxIndex]?.title}
        caption={photosList[lightboxIndex]?.caption}
        date={photosList[lightboxIndex]?.date}
      />
    </section>
  );
};
