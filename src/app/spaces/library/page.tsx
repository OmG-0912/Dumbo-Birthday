"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  BookOpen,
  Feather,
  Mail,
  Lock,
  Quote,
  Bookmark,
  PlusCircle,
  Eye,
  Star,
  CheckCircle,
  X,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useAuth } from "@/context/AuthContext";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { LibraryItem, LibraryItemType } from "@/types/content";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { WaxSealBadge } from "@/components/ui/WaxSealBadge";

export default function LibraryOfWordsPage() {
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const { role, canViewItem, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<LibraryItemType | "all">("all");
  const [selectedReadingItem, setSelectedReadingItem] = useState<LibraryItem | null>(null);

  const libraryItems = data.library;

  // Filter based on tab and strict privacy rules
  const visibleItems = libraryItems.filter((item) => {
    // Check privacy: If private, only owner can view!
    if (item.isPrivate && !canViewItem(item.owner, true)) {
      return false;
    }
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  const shayariCount = libraryItems.filter((i) => i.type === "shayari").length;
  const poetryCount = libraryItems.filter((i) => i.type === "poetry").length;
  const bookCount = libraryItems.filter((i) => i.type === "book").length;

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Room Header */}
      <RoomHeader
        roomNumber="Room III"
        title="Library of Words"
        subtitle="A refuge of bound thoughts, quiet letters, and lingering verses"
        description="A sanctuary of literature, handwritten correspondence, bilingual Hindi & Urdu shayari, private personal journals, and passages underlined in pencil. Explore the shelves or open an individual reading experience."
        badgeCategory="Literature & Bound Thoughts"
        stats={[
          { label: "Verses & Shayari", count: shayariCount + poetryCount },
          { label: "Bound Volumes", count: bookCount },
        ]}
      >
        <Link
          href="/admin?tab=library"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Inscribe New Entry</span>
        </Link>
      </RoomHeader>

      {/* 2. Privacy Notice Pill for Active Profile */}
      <div className="mb-6 p-3.5 rounded-2xl bg-gold/10 border border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-gold shrink-0" />
          <span className="font-serif italic text-cocoa">
            {role === "guest"
              ? "Browsing as Visitor: Personal private journals are protected and hidden."
              : `Logged in as ${role === "anavi" ? "Anavi" : "Rohan"}: Your private personal journal entries are unlocked and visible exclusively to you.`}
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-wider text-gold font-bold">
          Row-Level Privacy Active
        </span>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gold/20">
        {[
          { id: "all", label: "All Shelves", icon: BookOpen },
          { id: "shayari", label: "Shayari & Gazals", icon: Feather },
          { id: "poetry", label: "English Poetry", icon: Sparkles },
          { id: "letter", label: "Love Letters", icon: Mail },
          { id: "journal", label: "Personal Journals", icon: Lock },
          { id: "book", label: "Reading Shelf", icon: Bookmark },
          { id: "quote", label: "Favorite Quotes", icon: Quote },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LibraryItemType | "all")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                isActive
                  ? isNight
                    ? "bg-[#FDE08B] text-[#132521] font-semibold shadow-xs"
                    : "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
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

      {/* 4. Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item) => {
          const isShayari = item.type === "shayari";
          const isLetter = item.type === "letter";
          const isJournal = item.type === "journal";
          const isBook = item.type === "book";
          const isQuote = item.type === "quote";

          return (
            <div
              key={item.id}
              onClick={() => setSelectedReadingItem(item)}
              className={`rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-300 flex flex-col justify-between hover:scale-101 hover:shadow-storybook group relative overflow-hidden ${
                isNight
                  ? "bg-[#18312B]/90 border-[#B88B4A]/30 hover:border-[#FDE08B] text-[#FAF5ED]"
                  : "bg-[#FCFAF6] border-gold/30 hover:border-gold text-cocoa"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-gold font-bold">
                    {isJournal ? (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Private Journal</span>
                      </>
                    ) : isLetter ? (
                      <>
                        <Mail className="w-3 h-3" />
                        <span>Letter</span>
                      </>
                    ) : isShayari ? (
                      <>
                        <Feather className="w-3 h-3" />
                        <span>Shayari</span>
                      </>
                    ) : isBook ? (
                      <>
                        <Bookmark className="w-3 h-3" />
                        <span>Book Volume</span>
                      </>
                    ) : (
                      <>
                        <Quote className="w-3 h-3" />
                        <span>Quote</span>
                      </>
                    )}
                  </span>

                  <span className="text-[11px] font-mono text-cocoa/50">{item.date}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-gold transition-colors mb-2">
                  {item.title}
                </h3>

                {isBook && item.bookAuthor && (
                  <p className="font-serif italic text-xs text-gold-deep mb-3">
                    by {item.bookAuthor}
                  </p>
                )}

                {isLetter && item.recipient && (
                  <p className="font-serif italic text-xs text-gold-deep mb-3">
                    {item.recipient}
                  </p>
                )}

                {/* Excerpt */}
                <div className="text-xs sm:text-sm text-cocoa/80 line-clamp-4 leading-relaxed font-serif whitespace-pre-line italic">
                  {item.content}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-gold font-medium">
                <span className="text-[11px] text-cocoa/50 font-mono">
                  {item.author || `Inscribed by ${item.owner}`}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Reading</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. IMMERSIVE READING MODAL */}
      {selectedReadingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div
            className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-8 sm:p-12 border relative shadow-2xl ${
              isNight
                ? "bg-[#132521] border-[#B88B4A]/50 text-[#FAF5ED]"
                : "bg-[#FBF9F5] border-gold/40 text-cocoa"
            }`}
          >
            <button
              onClick={() => setSelectedReadingItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
              aria-label="Close reading view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <WaxSealBadge label="A" size="sm" variant="gold" className="mb-3" />
              <span className="block text-[11px] font-mono uppercase tracking-widest text-gold font-bold">
                {selectedReadingItem.type.toUpperCase()} • CHRONICLE READING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
                {selectedReadingItem.title}
              </h2>
              {selectedReadingItem.author && (
                <p className="font-serif italic text-gold-deep text-sm mt-1">
                  — {selectedReadingItem.author}
                </p>
              )}
              {selectedReadingItem.recipient && (
                <p className="font-serif italic text-gold text-sm mt-1">
                  {selectedReadingItem.recipient}
                </p>
              )}
              <div className="text-xs font-mono text-cocoa/50 mt-2">
                Date: {selectedReadingItem.date}
              </div>
            </div>

            <BotanicalDivider variant="floral" className="my-6" />

            <div className="font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line text-cocoa/90 max-w-xl mx-auto italic px-2">
              {selectedReadingItem.content}
            </div>

            <div className="mt-10 pt-6 border-t border-gold/20 text-center">
              <button
                onClick={() => setSelectedReadingItem(null)}
                className="px-6 py-2 rounded-full bg-gold/15 hover:bg-gold/25 text-gold-deep text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close Reading Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
