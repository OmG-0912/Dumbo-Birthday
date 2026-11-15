import React from "react";
import { CURRENT_DAILY_NOTE } from "@/data/memoriesData";
import { WaxSealBadge } from "../ui/WaxSealBadge";
import { Feather, BookOpen, Sparkles } from "lucide-react";

export const DailyNoteCard: React.FC = () => {
  return (
    <section id="note" className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Journal Leaf Container */}
        <div className="relative bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 md:p-14 border border-[#C5A16B]/40 shadow-storybook-lg overflow-hidden">
          {/* Subtle Deckle Edge & Antique Paper Grain */}
          <div className="absolute inset-0 bg-deckle-edge opacity-50 pointer-events-none" />

          {/* Faint Ruled Lines across the journal page */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, rgba(197, 161, 107, 0.35) 31px, rgba(197, 161, 107, 0.35) 32px)",
              backgroundPosition: "0 90px",
            }}
          />

          {/* Ribbon Bookmark Drape extending from top */}
          <div className="absolute -top-3 right-12 w-8 h-16 bg-gradient-to-b from-[#C48F91] via-[#DDA0A4] to-[#C48F91] shadow-md rounded-b-sm transform -rotate-3 pointer-events-none flex items-end justify-center pb-1">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[10px] border-b-[#FFFDF9]" />
          </div>

          {/* Pressed Wildflower Silhouette tucked on side */}
          <svg
            className="absolute bottom-4 right-4 w-28 h-36 text-sage/20 pointer-events-none"
            viewBox="0 0 100 130"
            fill="none"
          >
            <path d="M50 120 Q55 70 50 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="20" r="10" fill="#E8C9CA" opacity="0.4" />
            <circle cx="50" cy="20" r="4" fill="#C5A16B" opacity="0.5" />
            <path d="M52 60 Q65 50 68 62 Q55 70 52 60 Z" fill="currentColor" opacity="0.5" />
            <path d="M48 85 Q35 75 32 87 Q45 95 48 85 Z" fill="currentColor" opacity="0.5" />
          </svg>

          {/* Top Journal Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold/20 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-4">
              <WaxSealBadge label="A" size="md" variant="blush" />
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-deep font-semibold block">
                  Personal Chronicle Entry
                </span>
                <span className="font-serif italic text-sm text-cocoa-light">
                  {CURRENT_DAILY_NOTE.dateDisplay}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-serif italic text-cocoa-muted">
              <Feather className="w-3.5 h-3.5 text-gold-deep" />
              <span>Inscribed on deckle parchment</span>
            </div>
          </div>

          {/* Primary Inscribed Journal Prose */}
          <div className="relative z-10 my-4 pl-4 sm:pl-8 border-l-2 border-gold/40">
            <span className="font-serif text-5xl sm:text-6xl text-gold/30 -ml-6 -mt-2 block select-none">
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-cocoa leading-[1.35] tracking-tight -mt-6">
              {CURRENT_DAILY_NOTE.quote}
            </blockquote>
          </div>

          {/* Journal Reflection */}
          <div className="relative z-10 mt-8 pt-6">
            <p className="font-sans text-sm sm:text-base text-cocoa-light leading-relaxed pl-4 sm:pl-8">
              {CURRENT_DAILY_NOTE.reflection}
            </p>
          </div>

          {/* Journal Footer Details */}
          <div className="relative z-10 mt-10 pt-4 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-cocoa-muted gap-2">
            <span className="font-serif italic flex items-center gap-2 text-gold-deep">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sanctuary Journal • Page No. 01</span>
            </span>

            <span className="text-[11px] font-sans text-cocoa-muted/80">
              Living Storybook sample entry • Preserving quiet reflections
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
