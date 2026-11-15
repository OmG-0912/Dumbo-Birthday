import React from "react";
import { COMPANION_CHARACTERS } from "@/data/companionsData";

export const CompanionAvatars: React.FC = () => {
  return (
    <section className="py-12 border-y border-gold/20 bg-cream/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Cherished Storybook Companions
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-cocoa mt-1 italic">
            Keepers of The Four Corners
          </h3>
          <p className="text-cocoa-light text-sm max-w-lg mx-auto mt-2">
            Gentle guardians of laughter, soft memories, peaceful hearts, and sweet little joys who wander along every chapter.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {COMPANION_CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="group relative bg-alabaster/90 border border-gold/25 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-storybook-lg hover:-translate-y-1 hover:border-gold/50"
            >
              {/* Character Storybook Portrait Emblems */}
              <div className="w-20 h-20 mx-auto rounded-full bg-parchment-200 border-2 border-gold/40 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                {char.id === "monkey" && (
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    {/* Soft Brown Playful Monkey */}
                    <circle cx="40" cy="42" r="22" fill="#9B6745" />
                    {/* Ears */}
                    <circle cx="18" cy="38" r="8" fill="#9B6745" />
                    <circle cx="18" cy="38" r="5" fill="#E8C9CA" />
                    <circle cx="62" cy="38" r="8" fill="#9B6745" />
                    <circle cx="62" cy="38" r="5" fill="#E8C9CA" />
                    {/* Face plate */}
                    <ellipse cx="40" cy="46" rx="16" ry="13" fill="#EEDAC5" />
                    {/* Eyes */}
                    <circle cx="33" cy="42" r="2.5" fill="#3D2E28" />
                    <circle cx="47" cy="42" r="2.5" fill="#3D2E28" />
                    <circle cx="34" cy="41" r="0.8" fill="#FFFDF9" />
                    <circle cx="48" cy="41" r="0.8" fill="#FFFDF9" />
                    {/* Sweet playful smile */}
                    <path d="M36 50 Q40 54 44 50" stroke="#604A42" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    {/* Little sprout / branch on head */}
                    <path d="M40 20 Q44 14 42 10" stroke="#7A896D" strokeWidth="1.5" strokeLinecap="round" />
                    <ellipse cx="44" cy="11" rx="3" ry="1.5" fill="#A7B49B" transform="rotate(30 44 11)" />
                  </svg>
                )}

                {char.id === "dodo" && (
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    {/* Soft-coloured Dodo Bird */}
                    <circle cx="40" cy="44" r="22" fill="#B3A2B3" />
                    {/* Curved Dodo Beak */}
                    <path d="M38 38 C48 36 58 40 56 50 C54 54 46 52 40 48 Z" fill="#DFCA9E" stroke="#B89257" strokeWidth="0.8" />
                    <circle cx="50" cy="46" r="3" fill="#604A42" />
                    {/* Eye with gentle expression */}
                    <circle cx="33" cy="38" r="3" fill="#3D2E28" />
                    <circle cx="34" cy="37" r="1" fill="#FFFDF9" />
                    {/* Feather crest on head */}
                    <path d="M28 24 Q32 16 38 22 Q42 14 46 24" fill="#9B8B9B" stroke="#846D65" strokeWidth="0.8" />
                    {/* Soft blush cheek */}
                    <ellipse cx="28" cy="45" rx="4" ry="2.5" fill="#E8C9CA" opacity="0.8" />
                  </svg>
                )}

                {char.id === "dumbo" && (
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    {/* Sweet Little Elephant with big ears */}
                    {/* Big listening ears */}
                    <ellipse cx="20" cy="38" rx="13" ry="17" fill="#CAD4D9" stroke="#8D9DA5" strokeWidth="1" />
                    <ellipse cx="20" cy="38" rx="8" ry="11" fill="#E8C9CA" opacity="0.6" />
                    <ellipse cx="60" cy="38" rx="13" ry="17" fill="#CAD4D9" stroke="#8D9DA5" strokeWidth="1" />
                    <ellipse cx="60" cy="38" rx="8" ry="11" fill="#E8C9CA" opacity="0.6" />
                    {/* Head */}
                    <circle cx="40" cy="42" r="18" fill="#B5C3C9" />
                    {/* Sweet eyes */}
                    <ellipse cx="33" cy="39" rx="2" ry="3" fill="#3D2E28" />
                    <ellipse cx="47" cy="39" rx="2" ry="3" fill="#3D2E28" />
                    <circle cx="34" cy="38" r="0.8" fill="#FFFDF9" />
                    <circle cx="48" cy="38" r="0.8" fill="#FFFDF9" />
                    {/* Gentle trunk curling up holding star */}
                    <path d="M40 48 Q40 60 48 58 Q54 55 52 48" stroke="#8D9DA5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    {/* Tiny golden star at trunk */}
                    <circle cx="53" cy="46" r="2.5" fill="#FDE08B" />
                  </svg>
                )}

                {char.id === "piggie" && (
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    {/* Tiny Pink Piggie */}
                    <circle cx="40" cy="43" r="21" fill="#F4CBCD" />
                    {/* Pointed floppy ears */}
                    <polygon points="24,28 30,16 36,26" fill="#E8A9AD" stroke="#C48F91" strokeWidth="0.8" />
                    <polygon points="56,28 50,16 44,26" fill="#E8A9AD" stroke="#C48F91" strokeWidth="0.8" />
                    {/* Snout */}
                    <ellipse cx="40" cy="46" rx="9" ry="6.5" fill="#ECA2A6" stroke="#C48F91" strokeWidth="1" />
                    <circle cx="37" cy="46" r="1.5" fill="#846D65" />
                    <circle cx="43" cy="46" r="1.5" fill="#846D65" />
                    {/* Cheerful eyes */}
                    <circle cx="31" cy="37" r="2.5" fill="#3D2E28" />
                    <circle cx="49" cy="37" r="2.5" fill="#3D2E28" />
                    <circle cx="32" cy="36" r="0.8" fill="#FFFDF9" />
                    <circle cx="50" cy="36" r="0.8" fill="#FFFDF9" />
                    {/* Rosy cheeks */}
                    <circle cx="27" cy="44" r="3" fill="#D67B80" opacity="0.4" />
                    <circle cx="53" cy="44" r="3" fill="#D67B80" opacity="0.4" />
                  </svg>
                )}
              </div>

              {/* Character Details */}
              <h4 className="font-serif font-bold text-lg text-cocoa mt-3">
                {char.name}
              </h4>
              <p className="text-xs text-gold font-medium mt-0.5">
                {char.title}
              </p>
              <p className="text-xs text-cocoa-light mt-2 line-clamp-3 leading-relaxed">
                {char.personality}
              </p>

              {/* Little keepsake pill */}
              <div className="mt-3 pt-3 border-t border-gold/15 text-[11px] text-cocoa-muted italic">
                &ldquo;{char.signatureQuote}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
