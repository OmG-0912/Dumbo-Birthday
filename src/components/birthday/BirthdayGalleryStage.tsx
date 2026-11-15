"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  Upload,
  Maximize2,
  Sparkles,
  ArrowRight,
  Heart,
  Plus,
  Trash2,
  Edit2,
  Check,
} from "lucide-react";
import { BirthdayPhoto } from "@/types/birthday";
import { MediaLightbox } from "@/components/media/MediaLightbox";

interface BirthdayGalleryStageProps {
  photos: BirthdayPhoto[];
  onUpdatePhoto: (id: string, updates: Partial<BirthdayPhoto>) => void;
  onAddPhoto: (photo: BirthdayPhoto) => void;
  onDeletePhoto: (id: string) => void;
  onContinue: () => void;
}

export const BirthdayGalleryStage: React.FC<BirthdayGalleryStageProps> = ({
  photos,
  onUpdatePhoto,
  onAddPhoto,
  onDeletePhoto,
  onContinue,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Quick edit modal or photo upload ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetPhotoId, setTargetPhotoId] = useState<string | null>(null);

  // Direct editing of title/caption
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleTriggerUpload = (photoId: string) => {
    setTargetPhotoId(photoId);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetPhotoId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        onUpdatePhoto(targetPhotoId, {
          url: base64Url,
          isPlaceholder: false,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const startEditCaption = (photo: BirthdayPhoto) => {
    setEditingId(photo.id);
    setEditTitle(photo.title);
    setEditCaption(photo.caption);
  };

  const saveEditCaption = (photoId: string) => {
    onUpdatePhoto(photoId, {
      title: editTitle,
      caption: editCaption,
    });
    setEditingId(null);
  };

  const handleAddNewPhoto = () => {
    const newId = `bday-photo-${Date.now()}`;
    const newPhoto: BirthdayPhoto = {
      id: newId,
      title: "New Cherished Moment",
      caption: "Add your caption and memories here.",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      date: "16 November",
      isPolaroid: true,
      rotation: "rotate-1",
      aspectRatio: "portrait",
      isPlaceholder: true,
    };
    onAddPhoto(newPhoto);
    handleTriggerUpload(newId);
  };

  const lightboxImages = photos.map((p) => p.url);

  return (
    <section className="py-12 sm:py-16">
      {/* Hidden File Input for Instant Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Stage Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/30 text-[#B88B4A] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
          <span>Stage III • Her Gallery</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172D29] tracking-tight mb-3">
          Moments in Full Bloom
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#60463E] leading-relaxed">
          Every memory is a blossom preserved in time. Click any image to view in full resolution, or use &ldquo;Replace&rdquo; to upload your own photographs.
        </p>

        {/* Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddNewPhoto}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5ED] border border-[#B88B4A]/40 text-[#60463E] hover:text-[#172D29] hover:border-[#B88B4A] hover:bg-white text-xs sm:text-sm font-medium transition-all shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#B88B4A]" />
            <span>Add Another Photograph</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          THE PHOTOGRAPH GALLERY GRID
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 max-w-7xl mx-auto">
        {photos.map((photo, index) => {
          const isPolaroid = photo.isPolaroid ?? (index % 2 === 0);
          const rotationClass = photo.rotation || (index % 2 === 0 ? "-rotate-1" : "rotate-1");

          return (
            <div
              key={photo.id}
              className={`group relative flex flex-col transition-all duration-300 hover:scale-[1.02] hover:z-20 ${
                isPolaroid ? rotationClass : ""
              }`}
            >
              {/* Polaroid-Inspired or Editorial Frame */}
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  isPolaroid
                    ? "bg-[#FCFAF7] p-3 sm:p-4 pb-6 shadow-storybook hover:shadow-2xl border border-[#B88B4A]/25"
                    : "bg-[#FAF5ED] p-2.5 sm:p-3 pb-4 shadow-storybook hover:shadow-2xl border border-[#B88B4A]/30"
                }`}
              >
                {/* Visual Tape or Pin on top of polaroid */}
                {isPolaroid && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/70 border border-amber-300/40 rounded-xs shadow-xs rotate-[-2deg] z-20 pointer-events-none" />
                )}

                {/* Main Photograph Container */}
                <div
                  onClick={() => handleOpenLightbox(index)}
                  className="relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-[#EAE0D1]"
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FDE08B]" />
                      <span>View Fullscreen</span>
                    </span>
                  </div>

                  {/* Placeholder Banner if not replaced yet */}
                  {photo.isPlaceholder && (
                    <div className="absolute top-2.5 left-2.5 right-2.5 bg-black/65 backdrop-blur-md text-[#FDE08B] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md text-center border border-[#FDE08B]/30 shadow-md">
                      Placeholder • Click Replace to Upload Anavi&apos;s Photo
                    </div>
                  )}

                  {/* Floating Date Stamp */}
                  {photo.date && (
                    <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#3D2A24] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      {photo.date}
                    </div>
                  )}
                </div>

                {/* Caption & Controls Area */}
                <div className="pt-3 px-1">
                  {editingId === photo.id ? (
                    <div className="space-y-2 mt-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Photo Title"
                        className="w-full text-sm font-serif font-semibold text-[#172D29] bg-white border border-[#B88B4A]/40 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                      />
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Memory caption..."
                        rows={2}
                        className="w-full text-xs font-sans text-[#60463E] bg-white border border-[#B88B4A]/40 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#B88B4A]"
                      />
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-xs text-[#60463E] hover:underline"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEditCaption(photo.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#172D29] text-[#FDE08B] text-xs font-medium"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#172D29] leading-snug">
                          {photo.title}
                        </h4>
                        <button
                          onClick={() => startEditCaption(photo)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#60463E] hover:text-[#B88B4A] transition-opacity"
                          title="Edit Title & Caption"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-[#60463E] mt-1 line-clamp-3">
                        {photo.caption}
                      </p>
                    </div>
                  )}

                  {/* Quick Photo Actions Pill Bar */}
                  <div className="mt-3 pt-3 border-t border-[#B88B4A]/15 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleTriggerUpload(photo.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172D29]/5 hover:bg-[#172D29] text-[#60463E] hover:text-[#FDE08B] font-medium transition-colors border border-[#B88B4A]/25"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{photo.isPlaceholder ? "Upload Photo" : "Replace Photo"}</span>
                    </button>

                    {photos.length > 1 && (
                      <button
                        onClick={() => onDeletePhoto(photo.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500/70 hover:text-red-700 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation to Next Stage */}
      <div className="mt-14 text-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#172D29] hover:bg-[#1E3B36] text-[#FDE08B] font-semibold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-celestial-glow transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <span>Read Her Birthday Letter</span>
          <ArrowRight className="w-4 h-4 text-[#FDE08B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Lightbox Modal */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        title={photos[lightboxIndex]?.title}
        caption={photos[lightboxIndex]?.caption}
        date={photos[lightboxIndex]?.date}
      />
    </section>
  );
};
