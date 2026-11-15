import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { DESTINATION_ROOMS } from "@/data/roomsData";
import { RoomIllustration } from "../ui/RoomIllustration";
import { BotanicalDivider } from "../ui/BotanicalDivider";

export const DestinationRooms: React.FC = () => {
  return (
    <section id="spaces" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-gold/30 text-xs font-semibold text-gold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Her Sanctuary</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-cocoa tracking-tight">
            Six Enchanted Destinations
          </h2>

          <BotanicalDivider variant="floral" className="my-3 max-w-xs mx-auto" />

          <p className="font-sans text-sm sm:text-base text-cocoa-light leading-relaxed">
            Every room is dedicated to a corner of her heart—crafted with quiet elegance, holding dreams, art, treasured pages, and laughter.
          </p>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATION_ROOMS.map((room) => (
            <article
              key={room.id}
              className="group relative bg-alabaster rounded-3xl border border-gold/30 shadow-storybook hover:shadow-storybook-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5"
            >
              {/* Handcrafted Storybook Illustration Container */}
              <div className="relative p-3 pb-0 bg-parchment-50/50">
                <div className="rounded-2xl overflow-hidden border border-gold/20 shadow-inner group-hover:border-gold/40 transition-colors">
                  <RoomIllustration
                    type={room.illustrationType}
                    className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Badge Tag Floating on Card */}
                <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-alabaster/95 backdrop-blur-md border border-gold/40 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: room.accentColor }} />
                  <span className="text-[11px] font-serif font-bold text-cocoa tracking-wider">
                    {room.badgeText}
                  </span>
                  <span className="text-[10px] text-cocoa-muted uppercase tracking-wider font-medium">
                    • {room.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cocoa group-hover:text-gold-deep transition-colors">
                    {room.name}
                  </h3>
                  <p className="font-serif italic text-xs text-gold-deep mt-1">
                    {room.subtitle}
                  </p>
                  <p className="text-cocoa-light text-xs sm:text-sm mt-3 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-5 pt-4 border-t border-gold/15">
                    <span className="text-[10px] uppercase tracking-wider text-cocoa-muted font-semibold block mb-2">
                      Keepsakes &amp; Chapters
                    </span>
                    <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-cocoa-light">
                      {room.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-gold/60" />
                          <span className="truncate">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-xs font-serif italic text-cocoa-muted">
                    Open room doors
                  </span>
                  <Link
                    href={room.route}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-cocoa bg-cream hover:bg-parchment-200 border border-gold/30 hover:border-gold transition-all duration-200 group-hover:shadow-sm"
                  >
                    <span>Enter Sanctuary</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
