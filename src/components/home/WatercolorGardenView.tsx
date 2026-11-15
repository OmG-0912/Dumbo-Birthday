import React from "react";
import { BotanicalDivider } from "../ui/BotanicalDivider";

export const WatercolorGardenView: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] bg-[#FAF5ED] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
      {/* Textured Watercolor Paper Overlay with Deckle Vignette */}
      <div className="absolute inset-0 bg-deckle-edge opacity-60 pointer-events-none" />

      {/* Layered Illustrated Watercolor Landscape SVG */}
      <svg
        viewBox="0 0 900 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[440px] rounded-2xl shadow-inner border border-gold/30 bg-gradient-to-b from-[#FBF6EE] via-[#F4EFE6] to-[#E9E1D2]"
      >
        <defs>
          {/* Paper texture and wet-on-wet gradients */}
          <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FBF7EE" />
            <stop offset="0.4" stopColor="#F5ECE2" />
            <stop offset="0.75" stopColor="#EBF0E1" />
            <stop offset="1" stopColor="#DEE8D3" />
          </linearGradient>

          <linearGradient id="sunbeamsWash" x1="200" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF2D6" stopOpacity="0.45" />
            <stop offset="0.7" stopColor="#FFF8E8" stopOpacity="0.15" />
            <stop offset="1" stopColor="#FFF8E8" stopOpacity="0" />
          </linearGradient>

          <filter id="watercolorBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Sky wash */}
        <rect width="900" height="520" fill="url(#skyWash)" />

        {/* Diagonal Soft Sunlight Beams */}
        <polygon points="180,0 380,0 620,520 320,520" fill="url(#sunbeamsWash)" />
        <polygon points="340,0 520,0 780,520 540,520" fill="url(#sunbeamsWash)" opacity="0.6" />

        {/* Distant misty background trees with watercolor bleed */}
        <g opacity="0.45" filter="url(#watercolorBleed)">
          <path
            d="M0 240 Q120 180 250 210 Q380 170 510 200 Q650 165 780 210 Q850 185 900 220 L900 400 L0 400 Z"
            fill="#B9C7AC"
          />
          <path
            d="M0 280 Q150 230 320 250 Q480 220 620 260 Q760 210 900 255 L900 450 L0 450 Z"
            fill="#9FB291"
            opacity="0.75"
          />
        </g>

        {/* Middle-ground Lawn & Meadow Terraces */}
        <path
          d="M0 320 Q220 280 450 300 Q680 270 900 310 L900 520 L0 520 Z"
          fill="#8BA177"
          opacity="0.85"
        />

        {/* Naturally Winding Flagstone Pathway (Reference Photo 1) */}
        <g>
          {/* Pathway Bed */}
          <path
            d="M450 305 Q465 350 420 395 Q370 445 320 520 L580 520 Q540 450 495 400 Q465 355 450 305 Z"
            fill="#DCD0C0"
          />
          {/* Individual Hand-Painted Flagstones */}
          <ellipse cx="452" cy="318" rx="22" ry="7" fill="#E8DBCB" stroke="#B8A794" strokeWidth="0.8" />
          <ellipse cx="440" cy="336" rx="32" ry="9" fill="#DDD0BF" stroke="#B8A794" strokeWidth="0.9" />
          <ellipse cx="455" cy="358" rx="42" ry="12" fill="#EADECF" stroke="#B8A794" strokeWidth="1" />
          <ellipse cx="430" cy="385" rx="55" ry="15" fill="#DDD0BF" stroke="#B8A794" strokeWidth="1" />
          <ellipse cx="420" cy="418" rx="70" ry="18" fill="#E8DBCB" stroke="#B8A794" strokeWidth="1.2" />
          <ellipse cx="435" cy="458" rx="90" ry="22" fill="#D6C7B5" stroke="#B8A794" strokeWidth="1.2" />
          <ellipse cx="445" cy="502" rx="115" ry="26" fill="#EADECF" stroke="#B8A794" strokeWidth="1.4" />
        </g>

        {/* Mossy Stone Boulders (Reference Photo 1) */}
        <g>
          {/* Left Boulder */}
          <path
            d="M230 430 C200 410 170 425 150 455 C135 480 150 515 185 520 C220 525 255 510 260 480 C265 450 250 440 230 430 Z"
            fill="#8E8578"
            stroke="#655C52"
            strokeWidth="1.2"
          />
          <path d="M165 445 Q195 435 225 440" stroke="#7A896D" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

          {/* Right Boulder */}
          <path
            d="M670 440 C640 425 615 440 600 470 C590 495 605 520 635 525 C665 530 700 515 710 490 C715 460 695 450 670 440 Z"
            fill="#968D80"
            stroke="#655C52"
            strokeWidth="1.2"
          />
          <path d="M620 455 Q650 445 680 450" stroke="#7A896D" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Wooden Garden Pergola & Climbing Rose Trellis (Reference Photos 2 & 5) */}
        <g id="pergolaArbor">
          {/* Left Wooden Posts */}
          <rect x="290" y="160" width="18" height="230" rx="3" fill="#554238" stroke="#3D2E26" strokeWidth="1.2" />
          <rect x="305" y="170" width="14" height="220" rx="2" fill="#6B5548" opacity="0.9" />
          {/* Left Lattice bars */}
          <line x1="290" y1="210" x2="320" y2="210" stroke="#554238" strokeWidth="2" />
          <line x1="290" y1="260" x2="320" y2="260" stroke="#554238" strokeWidth="2" />
          <line x1="290" y1="310" x2="320" y2="310" stroke="#554238" strokeWidth="2" />
          <line x1="290" y1="350" x2="320" y2="350" stroke="#554238" strokeWidth="2" />

          {/* Right Wooden Posts */}
          <rect x="580" y="160" width="18" height="230" rx="3" fill="#554238" stroke="#3D2E26" strokeWidth="1.2" />
          <rect x="595" y="170" width="14" height="220" rx="2" fill="#6B5548" opacity="0.9" />
          {/* Right Lattice bars */}
          <line x1="580" y1="210" x2="610" y2="210" stroke="#554238" strokeWidth="2" />
          <line x1="580" y1="260" x2="610" y2="260" stroke="#554238" strokeWidth="2" />
          <line x1="580" y1="310" x2="610" y2="310" stroke="#554238" strokeWidth="2" />
          <line x1="580" y1="350" x2="610" y2="350" stroke="#554238" strokeWidth="2" />

          {/* Overhead Pergola Archway & Cross-Beams */}
          <path
            d="M260 160 C330 110 560 110 630 160 L620 178 C550 135 340 135 270 178 Z"
            fill="#554238"
            stroke="#3D2E26"
            strokeWidth="1.5"
          />
          {/* Cross rafters */}
          <rect x="330" y="125" width="12" height="35" rx="2" fill="#6B5548" transform="rotate(-8 330 125)" />
          <rect x="440" y="112" width="14" height="36" rx="2" fill="#6B5548" />
          <rect x="545" y="125" width="12" height="35" rx="2" fill="#6B5548" transform="rotate(8 545 125)" />

          {/* Slatted Garden Bench nestled inside (Reference Photo 5) */}
          <g transform="translate(375, 300)">
            {/* Backrest slats */}
            <rect x="0" y="0" width="140" height="8" rx="2" fill="#E8DBC9" stroke="#9E8D7B" strokeWidth="0.8" />
            <rect x="0" y="14" width="140" height="8" rx="2" fill="#E8DBC9" stroke="#9E8D7B" strokeWidth="0.8" />
            {/* Seat slab */}
            <polygon points="-5,32 145,32 138,44 -2,44" fill="#DDD0BF" stroke="#8E7D6B" strokeWidth="1" />
            {/* Bench legs */}
            <line x1="5" y1="44" x2="5" y2="68" stroke="#554238" strokeWidth="4" />
            <line x1="135" y1="44" x2="135" y2="68" stroke="#554238" strokeWidth="4" />
          </g>
        </g>

        {/* Hand-painted Cascading Climbing Roses & Foliage (Reference Photos 2 & 5) */}
        <g id="climbingFlora">
          {/* Left cascading rose garland */}
          <circle cx="285" cy="220" r="14" fill="#E8C9CA" stroke="#DDA0A4" strokeWidth="1" />
          <circle cx="284" cy="219" r="8" fill="#F7E1E3" />
          <circle cx="295" cy="180" r="18" fill="#DDA0A4" stroke="#BF7D82" strokeWidth="1" />
          <circle cx="293" cy="178" r="10" fill="#F7E1E3" />
          <circle cx="315" cy="150" r="16" fill="#E8C9CA" stroke="#DDA0A4" strokeWidth="1" />
          <circle cx="350" cy="130" r="20" fill="#FDFDF8" stroke="#DFCA9E" strokeWidth="1" />
          <circle cx="395" cy="120" r="18" fill="#E8C9CA" stroke="#DDA0A4" strokeWidth="1" />
          <circle cx="445" cy="115" r="22" fill="#DDA0A4" stroke="#BF7D82" strokeWidth="1.2" />
          <circle cx="443" cy="113" r="12" fill="#F7E1E3" />
          <circle cx="495" cy="120" r="19" fill="#E8C9CA" stroke="#DDA0A4" strokeWidth="1" />
          <circle cx="545" cy="135" r="20" fill="#FDFDF8" stroke="#DFCA9E" strokeWidth="1" />
          <circle cx="585" cy="160" r="17" fill="#DDA0A4" stroke="#BF7D82" strokeWidth="1" />
          <circle cx="605" cy="205" r="15" fill="#E8C9CA" stroke="#DDA0A4" strokeWidth="1" />
          <circle cx="590" cy="250" r="13" fill="#F7E1E3" stroke="#DDA0A4" strokeWidth="1" />
        </g>

        {/* Lavender Beds & Wildflower Tufts (Reference Photos 1 & 3) */}
        <g id="wildflowers">
          {/* Left lavender & rhododendron blooms */}
          <ellipse cx="260" cy="380" rx="35" ry="24" fill="#7E946A" opacity="0.9" />
          <path d="M235 365 Q237 340 238 320" stroke="#8B7AA8" strokeWidth="3" strokeLinecap="round" />
          <path d="M250 360 Q253 335 255 315" stroke="#A89AC8" strokeWidth="3" strokeLinecap="round" />
          <path d="M265 365 Q268 340 270 322" stroke="#8B7AA8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="280" cy="380" r="12" fill="#E89AA8" />

          {/* Right golden marigolds & hydrangeas */}
          <ellipse cx="640" cy="385" rx="40" ry="26" fill="#7E946A" opacity="0.9" />
          <circle cx="620" cy="375" r="7" fill="#E5BB58" />
          <circle cx="635" cy="368" r="8" fill="#E5BB58" />
          <circle cx="650" cy="372" r="7.5" fill="#E5BB58" />
          <circle cx="640" cy="388" r="14" fill="#8CA2D6" />
        </g>

        {/* Delicate Fluttering Watercolor Butterflies */}
        <g id="watercolorButterflies">
          {/* Butterfly 1 near left roses */}
          <g transform="translate(320, 200) rotate(-15)">
            <ellipse cx="6" cy="5" rx="6" ry="8" fill="#FFF4C2" stroke="#DDA463" strokeWidth="0.8" />
            <ellipse cx="14" cy="5" rx="6" ry="8" fill="#FFF4C2" stroke="#DDA463" strokeWidth="0.8" />
            <line x1="10" y1="2" x2="10" y2="13" stroke="#4A3931" strokeWidth="1.2" />
          </g>

          {/* Butterfly 2 near stone path */}
          <g transform="translate(470, 370) rotate(25)">
            <ellipse cx="5" cy="4" rx="5" ry="7" fill="#F6D2D4" stroke="#C48F91" strokeWidth="0.8" />
            <ellipse cx="12" cy="4" rx="5" ry="7" fill="#F6D2D4" stroke="#C48F91" strokeWidth="0.8" />
            <line x1="8.5" y1="1" x2="8.5" y2="10" stroke="#4A3931" strokeWidth="1" />
          </g>
        </g>
      </svg>

      {/* Hand-Inscribed Storybook Plate */}
      <div className="mt-4 flex items-center justify-between w-full max-w-2xl px-2 text-xs text-cocoa-muted">
        <span className="font-serif italic text-gold-deep">
          &ldquo;Plate I • Hand-Painted Storybook Rose Trellis &amp; Lavender Garden&rdquo;
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-cocoa-muted/70">
          Watercolour on Deckle Paper
        </span>
      </div>
    </div>
  );
};
