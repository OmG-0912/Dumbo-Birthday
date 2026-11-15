"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  title?: string;
  caption?: string;
  date?: string;
  location?: string;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  title,
  caption,
  date,
  location,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight" && images.length > 1) {
        onIndexChange((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl transition-opacity animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation arrows if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onIndexChange((currentIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] w-full mx-4 flex flex-col items-center">
        <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={currentImage}
            alt={title || "Enchanted Storybook Photograph"}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Caption & Metadata Footer */}
        <div className="w-full mt-4 text-center text-white/90">
          {title && <h3 className="font-serif text-xl sm:text-2xl text-[#FAF5ED]">{title}</h3>}
          {caption && <p className="font-serif italic text-sm text-[#FDE08B] mt-1">{caption}</p>}
          <div className="flex items-center justify-center gap-4 text-xs text-white/60 mt-2">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>{location}</span>
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{date}</span>
              </span>
            )}
            {images.length > 1 && (
              <span className="text-white/40">
                {currentIndex + 1} of {images.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
