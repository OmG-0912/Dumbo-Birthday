"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Calendar, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { useStorybookData } from "@/lib/contentStore";

export const RecentMemories: React.FC = () => {
  const { data } = useStorybookData();
  const recentMemories = data.memories.slice(0, 4);

  return (
    <section id="memories" className="py-16 sm:py-24 bg-cream/40 border-t border-gold/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-alabaster border border-gold/30 text-xs font-semibold text-gold uppercase tracking-[0.2em] mb-3">
              <Camera className="w-3.5 h-3.5 text-gold" />
              <span>Living Scrapbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-cocoa tracking-tight">
              Glimpses of Cherished Days
            </h2>
            <p className="text-cocoa-light text-sm mt-2 max-w-lg">
              Moments frozen in soft warmth—a collection of spontaneous light, quiet afternoons, and preserved thoughts.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/spaces/memories"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gold-deep hover:text-cocoa transition-colors"
            >
              <span>View Full Scrapbook Archive</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMemories.map((memory, index) => (
            <Link
              key={memory.id}
              href={`/memories/${memory.id}`}
              className="group bg-alabaster p-4 rounded-2xl border border-gold/30 shadow-storybook hover:shadow-storybook-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              style={{
                // Alternating organic angle for scrapbook feel
                transform: `rotate(${index % 2 === 0 ? "-0.75deg" : "0.75deg"})`,
              }}
            >
              <div>
                {/* Photo Container */}
                <div className="w-full aspect-4/3 rounded-xl relative overflow-hidden mb-4 border border-gold/20 bg-[#EADFD8]">
                  <Image
                    src={memory.coverImage}
                    alt={memory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  {/* Corner brass photo corners */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-gold/60 rounded-tl" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-gold/60 rounded-tr" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-gold/60 rounded-bl" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-gold/60 rounded-br" />
                </div>

                {/* Metadata Tags */}
                <div className="flex items-center justify-between text-[11px] text-cocoa-muted mt-2">
                  <span className="flex items-center gap-1 font-serif italic">
                    <Calendar className="w-3 h-3 text-gold" />
                    <span>{memory.date}</span>
                  </span>
                  {memory.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sage" />
                      <span className="truncate max-w-[100px]">{memory.location}</span>
                    </span>
                  )}
                </div>

                {/* Memory Title & Caption */}
                <h3 className="font-serif font-bold text-lg text-cocoa mt-2 group-hover:text-gold-deep transition-colors leading-snug line-clamp-2">
                  {memory.title}
                </h3>
                <p className="text-xs text-cocoa-light mt-1.5 leading-relaxed line-clamp-2">
                  {memory.caption}
                </p>
              </div>

              {/* Bottom Scrapbook Tag */}
              <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-[10px] text-cocoa-muted">
                <span className="font-serif italic text-gold">Open Story</span>
                <ExternalLink className="w-3 h-3 text-gold group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
