import React from "react";
import Link from "next/link";
import { BotanicalDivider } from "../ui/BotanicalDivider";
import { WaxSealBadge } from "../ui/WaxSealBadge";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-parchment-200/80 border-t border-gold/30 pt-16 pb-12 overflow-hidden">
      {/* Subtle top edge deckle overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Bookplate Wax Seal Emblem */}
          <WaxSealBadge label="A" size="lg" variant="gold" className="mb-4" />

          {/* Book Title */}
          <h2 className="font-serif text-3xl sm:text-4xl text-cocoa tracking-wide font-medium">
            Anavi&apos;s World
          </h2>
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mt-1">
            The Enchanted Living Storybook
          </span>

          <BotanicalDivider variant="floral" className="my-6 max-w-md w-full" />

          {/* Editorial colophon quote */}
          <blockquote className="font-serif italic text-base sm:text-lg text-cocoa-light max-w-xl leading-relaxed mb-6">
            &ldquo;Some stories are written once in ink; the sweetest are lived day by day, softly gathered between pages that never fade.&rdquo;
          </blockquote>

          {/* Navigation chapters */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-cocoa mb-8">
            <Link href="/" className="hover:text-gold transition-colors font-medium">
              Home
            </Link>
            <Link href="/spaces/memories" className="hover:text-gold transition-colors font-medium">
              House of Memories
            </Link>
            <Link href="/spaces/garden" className="hover:text-gold transition-colors font-medium">
              Garden of Becoming
            </Link>
            <Link href="/spaces/library" className="hover:text-gold transition-colors font-medium">
              Library of Words
            </Link>
            <Link href="/spaces/museum" className="hover:text-gold transition-colors font-medium">
              Museum of Her
            </Link>
            <Link href="/spaces/kitchen" className="hover:text-gold transition-colors font-medium">
              Kitchen of Little Joys
            </Link>
            <Link href="/spaces/observatory" className="hover:text-gold transition-colors font-medium">
              Observatory of Dreams
            </Link>
            <Link href="/universe" className="hover:text-gold transition-colors font-medium text-celestial-gold bg-celestial/90 px-3 py-1 rounded-full text-xs">
              Our Little Universe
            </Link>
            <Link href="/admin" className="hover:text-gold transition-colors font-medium text-xs border border-gold/40 px-3 py-1 rounded-full">
              Sanctuary Manager
            </Link>
          </div>

          {/* Volume stamp & privacy safeguard notice */}
          <div className="pt-6 border-t border-gold/20 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-cocoa-muted gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-sage" />
              <span>Volume I • Bound with devotion &amp; care</span>
            </div>

            <div className="text-center sm:text-right">
              <span>A private sanctuary for her memories, dreams &amp; quiet joys</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
