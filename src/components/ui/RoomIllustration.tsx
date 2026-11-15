import React from "react";

interface RoomIllustrationProps {
  type: 'memories' | 'garden' | 'library' | 'museum' | 'kitchen' | 'observatory';
  className?: string;
}

export const RoomIllustration: React.FC<RoomIllustrationProps> = ({ type, className = "" }) => {
  switch (type) {
    case 'memories':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="memoriesBg" x1="0" y1="0" x2="280" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBF6EE" />
              <stop offset="1" stopColor="#F3E5D4" />
            </linearGradient>
            <linearGradient id="goldAcc" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#DFCA9E" />
              <stop offset="1" stopColor="#B89257" />
            </linearGradient>
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#memoriesBg)" />
          
          {/* Subtle hanging garland / lights */}
          <path d="M20 30 Q140 70 260 25" stroke="#C5A16B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="70" cy="45" r="3.5" fill="#FDE08B" opacity="0.8" />
          <circle cx="130" cy="52" r="4.5" fill="#FDE08B" opacity="0.9" />
          <circle cx="195" cy="47" r="3.5" fill="#FDE08B" opacity="0.8" />
          <circle cx="240" cy="35" r="3" fill="#FDE08B" opacity="0.7" />

          {/* Angled Polaroid frame */}
          <g transform="translate(145, 60) rotate(8)">
            <rect x="0" y="0" width="85" height="105" rx="4" fill="#FFFDF9" stroke="#E8DBC9" strokeWidth="1.5" />
            <rect x="7" y="7" width="71" height="68" rx="2" fill="#E8C9CA" opacity="0.5" />
            {/* Mountain & sun inside photo */}
            <circle cx="58" cy="24" r="7" fill="#FDF4DC" />
            <path d="M12 60 L38 35 L60 55 L72 45 L78 68 L7 68 Z" fill="#9BAFA0" opacity="0.85" />
            <line x1="18" y1="87" x2="68" y2="87" stroke="#A8948D" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Vintage Camera */}
          <g transform="translate(45, 80)">
            {/* Camera Body */}
            <rect x="0" y="20" width="105" height="72" rx="10" fill="#604A42" />
            <rect x="6" y="26" width="93" height="42" rx="4" fill="#3D2E28" opacity="0.4" />
            {/* Top plate & brass dials */}
            <rect x="15" y="10" width="75" height="12" rx="3" fill="url(#goldAcc)" />
            <rect x="25" y="4" width="14" height="7" rx="2" fill="#B89257" />
            <circle cx="75" cy="11" r="5" fill="#B89257" />
            {/* Lens barrel & rings */}
            <circle cx="52" cy="56" r="26" fill="url(#goldAcc)" />
            <circle cx="52" cy="56" r="21" fill="#2E2420" />
            <circle cx="52" cy="56" r="15" fill="#1C1715" />
            <circle cx="48" cy="51" r="6" fill="#FFFDF9" opacity="0.6" filter="url(#softGlow)" />
            {/* Viewfinder window */}
            <rect x="78" y="28" width="12" height="9" rx="2" fill="#E3CE9F" opacity="0.8" />
          </g>

          {/* Pressed Rose Keepsake */}
          <g transform="translate(130, 142) rotate(-15)">
            <path d="M10 25 Q15 15 25 2" stroke="#6E7C61" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 17 Q8 14 11 9 Q17 11 15 17 Z" fill="#A7B49B" />
            <circle cx="26" cy="4" r="6" fill="#C48F91" />
            <circle cx="28" cy="3" r="4" fill="#E8C9CA" />
          </g>

          {/* Sparkles */}
          <path d="M35 50 L37 42 L45 40 L37 38 L35 30 L33 38 L25 40 L33 42 Z" fill="#C5A16B" opacity="0.7" />
          <path d="M235 155 L236 150 L241 148 L236 146 L235 141 L234 146 L229 148 L234 150 Z" fill="#C5A16B" opacity="0.6" />
        </svg>
      );

    case 'garden':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="gardenSky" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#F9F6EE" />
              <stop offset="0.5" stopColor="#E9F0E3" />
              <stop offset="1" stopColor="#DDE7D4" />
            </linearGradient>
            <linearGradient id="sunbeam" x1="140" y1="0" x2="140" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF4D0" stopOpacity="0.8" />
              <stop offset="1" stopColor="#FFF4D0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#gardenSky)" />
          
          {/* Distant gentle rolling hills */}
          <path d="M0 120 Q70 95 140 110 T280 100 L280 200 L0 200 Z" fill="#CAD4C2" opacity="0.6" />
          <path d="M0 135 Q90 120 180 130 T280 125 L280 200 L0 200 Z" fill="#A7B49B" opacity="0.8" />

          {/* Winding Cobblestone Pathway */}
          <path d="M140 105 Q145 130 115 155 Q80 185 60 200 L210 200 Q180 170 155 145 Q145 125 140 105 Z" fill="#E8DDD0" />
          {/* Stepping stones */}
          <ellipse cx="140" cy="115" rx="8" ry="3" fill="#D6C6B4" />
          <ellipse cx="132" cy="132" rx="14" ry="5" fill="#D6C6B4" />
          <ellipse cx="120" cy="154" rx="20" ry="7" fill="#D6C6B4" />
          <ellipse cx="135" cy="178" rx="28" ry="9" fill="#D6C6B4" />

          {/* Flowering Rose Trellis / Archway */}
          <path d="M75 145 C75 55 205 55 205 145" stroke="#7A896D" strokeWidth="3" fill="none" />
          <path d="M83 145 C83 67 197 67 197 145" stroke="#96A489" strokeWidth="2" fill="none" />
          {/* Crossbars */}
          <line x1="83" y1="95" x2="95" y2="92" stroke="#7A896D" strokeWidth="2" />
          <line x1="185" y1="92" x2="197" y2="95" stroke="#7A896D" strokeWidth="2" />
          <line x1="120" y1="62" x2="124" y2="72" stroke="#7A896D" strokeWidth="2" />
          <line x1="156" y1="62" x2="160" y2="72" stroke="#7A896D" strokeWidth="2" />

          {/* Trellis climbing roses & leaves */}
          <g>
            <circle cx="88" cy="85" r="7" fill="#E8C9CA" />
            <circle cx="89" cy="84" r="4" fill="#C48F91" />
            <circle cx="105" cy="65" r="8" fill="#F7EAEA" />
            <circle cx="106" cy="64" r="5" fill="#E8C9CA" />
            <circle cx="140" cy="55" r="9" fill="#E8C9CA" />
            <circle cx="140" cy="54" r="5.5" fill="#C48F91" />
            <circle cx="175" cy="68" r="8" fill="#F7EAEA" />
            <circle cx="176" cy="67" r="5" fill="#E8C9CA" />
            <circle cx="193" cy="95" r="7" fill="#E8C9CA" />
            <circle cx="194" cy="94" r="4" fill="#C48F91" />
          </g>

          {/* Fluttering Golden Butterfly */}
          <g transform="translate(195, 45) rotate(15)">
            <ellipse cx="6" cy="5" rx="5" ry="7" fill="#DFCA9E" />
            <ellipse cx="14" cy="5" rx="5" ry="7" fill="#DFCA9E" />
            <line x1="10" y1="2" x2="10" y2="12" stroke="#9E7B44" strokeWidth="1" />
          </g>

          {/* Morning sunburst beam */}
          <polygon points="140,20 170,120 110,120" fill="url(#sunbeam)" />
        </svg>
      );

    case 'library':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="libraryBg" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FAF4EB" />
              <stop offset="1" stopColor="#EFE3D3" />
            </linearGradient>
            <linearGradient id="leatherSpine" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#604A42" />
              <stop offset="0.5" stopColor="#7E655C" />
              <stop offset="1" stopColor="#4A3731" />
            </linearGradient>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#libraryBg)" />

          {/* Polished wooden desk surface */}
          <rect x="20" y="160" width="240" height="14" rx="3" fill="#846D65" opacity="0.7" />

          {/* Horizontal stacked antique books */}
          <g transform="translate(50, 100)">
            {/* Bottom Book */}
            <rect x="0" y="38" width="135" height="22" rx="3" fill="url(#leatherSpine)" />
            <rect x="8" y="42" width="124" height="3" fill="#C5A16B" opacity="0.7" />
            <line x1="20" y1="49" x2="60" y2="49" stroke="#E3CE9F" strokeWidth="1.5" />
            <rect x="130" y="40" width="8" height="18" fill="#FFFDF9" rx="1" />

            {/* Middle Book - Sage cover */}
            <rect x="12" y="18" width="115" height="20" rx="3" fill="#6E7C61" />
            <rect x="20" y="21" width="100" height="2" fill="#CAD4C2" opacity="0.6" />
            <line x1="30" y1="28" x2="75" y2="28" stroke="#CAD4C2" strokeWidth="1.5" />

            {/* Top Open Book */}
            <g transform="translate(15, -45)">
              {/* Left page */}
              <path d="M50 45 C30 40 10 44 2 48 L2 20 C10 16 30 14 50 18 Z" fill="#FFFDF9" stroke="#DFCA9E" strokeWidth="1" />
              {/* Left page text lines */}
              <line x1="8" y1="25" x2="42" y2="23" stroke="#A8948D" strokeWidth="1" />
              <line x1="8" y1="30" x2="40" y2="28" stroke="#A8948D" strokeWidth="1" />
              <line x1="8" y1="35" x2="35" y2="33" stroke="#A8948D" strokeWidth="1" />

              {/* Right page */}
              <path d="M50 18 C70 14 90 16 98 20 L98 48 C90 44 70 40 50 45 Z" fill="#FFFDF9" stroke="#DFCA9E" strokeWidth="1" />
              {/* Right page text lines */}
              <line x1="58" y1="23" x2="92" y2="25" stroke="#A8948D" strokeWidth="1" />
              <line x1="58" y1="28" x2="90" y2="30" stroke="#A8948D" strokeWidth="1" />
              <line x1="58" y1="33" x2="82" y2="35" stroke="#A8948D" strokeWidth="1" />
              
              {/* Spine ribbon bookmark */}
              <path d="M50 18 Q52 35 48 55 L52 53 L56 55 Q52 35 50 18" fill="#C48F91" />
            </g>
          </g>

          {/* Glass Inkwell & Quill */}
          <g transform="translate(195, 95)">
            {/* Inkpot */}
            <rect x="8" y="45" width="28" height="22" rx="4" fill="#2F3B66" opacity="0.85" />
            <rect x="14" y="40" width="16" height="5" rx="2" fill="#C5A16B" />
            <ellipse cx="22" cy="42" rx="5" ry="1.5" fill="#171F38" />

            {/* Goose feather quill resting inside */}
            <g transform="translate(20, 42) rotate(-35)">
              <path d="M0 0 Q-8 -40 -12 -70 Q3 -45 0 0" fill="#FDF8F0" stroke="#C5A16B" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="-12" y2="-70" stroke="#9E7B44" strokeWidth="1.2" />
            </g>
          </g>

          {/* Floating illuminated verse / leaf */}
          <g transform="translate(205, 45) rotate(12)">
            <rect x="0" y="0" width="26" height="32" rx="2" fill="#FFFDF9" stroke="#E8DBC9" strokeWidth="0.8" />
            <line x1="4" y1="8" x2="22" y2="8" stroke="#C5A16B" strokeWidth="1" />
            <line x1="4" y1="14" x2="18" y2="14" stroke="#A8948D" strokeWidth="0.8" />
            <line x1="4" y1="20" x2="20" y2="20" stroke="#A8948D" strokeWidth="0.8" />
          </g>
        </svg>
      );

    case 'museum':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="museumBg" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FCF7F6" />
              <stop offset="1" stopColor="#F5E8E5" />
            </linearGradient>
            <linearGradient id="artWash" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#E8C9CA" />
              <stop offset="0.5" stopColor="#CAD4C2" />
              <stop offset="1" stopColor="#DFCA9E" />
            </linearGradient>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#museumBg)" />

          {/* Wooden Artist Easel */}
          <g transform="translate(85, 30)">
            {/* Easel rear leg */}
            <line x1="55" y1="10" x2="55" y2="150" stroke="#846D65" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            {/* Front A-frame legs */}
            <line x1="55" y1="10" x2="15" y2="155" stroke="#604A42" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="55" y1="10" x2="95" y2="155" stroke="#604A42" strokeWidth="4.5" strokeLinecap="round" />
            {/* Shelf crossbar */}
            <rect x="0" y="105" width="110" height="7" rx="2" fill="#4A3731" />

            {/* Canvas resting on easel */}
            <g transform="translate(10, 25)">
              <rect x="0" y="0" width="90" height="78" rx="4" fill="#FFFDF9" stroke="#C5A16B" strokeWidth="1.5" />
              {/* Watercolor painting on canvas: landscape */}
              <rect x="6" y="6" width="78" height="66" rx="2" fill="url(#artWash)" opacity="0.75" />
              {/* Soft clouds & botanical silhouette */}
              <circle cx="65" cy="22" r="8" fill="#FFFDF9" opacity="0.7" />
              <path d="M10 65 Q35 40 50 55 T78 50 L78 72 L10 72 Z" fill="#6E7C61" opacity="0.8" />
            </g>
          </g>

          {/* Artist's Palette & Brushes on right */}
          <g transform="translate(190, 110)">
            {/* Kidney wooden palette */}
            <path
              d="M35 15 C55 10 65 30 60 50 C55 68 35 68 18 58 C2 48 5 25 22 18 C26 16 30 18 35 15 Z"
              fill="#EAD7C0"
              stroke="#B89257"
              strokeWidth="1.2"
            />
            {/* Thumb hole */}
            <ellipse cx="48" cy="48" rx="5" ry="3.5" fill="#F5E8E5" />
            {/* Paint dabs */}
            <circle cx="18" cy="28" r="4.5" fill="#C48F91" />
            <circle cx="28" cy="22" r="4" fill="#A7B49B" />
            <circle cx="40" cy="23" r="4.5" fill="#DFCA9E" />
            <circle cx="48" cy="32" r="3.5" fill="#7A896D" />
            <circle cx="25" cy="42" r="4" fill="#604A42" />

            {/* Paintbrush through thumb hole */}
            <line x1="8" y1="75" x2="58" y2="35" stroke="#604A42" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="56,36 65,28 62,34" fill="#DFCA9E" />
          </g>

          {/* Swirling color ribbons */}
          <path d="M30 60 C50 40 45 90 25 110" stroke="#E8C9CA" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'kitchen':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="kitchenBg" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FAF5EE" />
              <stop offset="1" stopColor="#F2E6D7" />
            </linearGradient>
            <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#DF9B72" />
              <stop offset="0.5" stopColor="#C47345" />
              <stop offset="1" stopColor="#8A441F" />
            </linearGradient>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#kitchenBg)" />

          {/* Wooden Countertop */}
          <rect x="20" y="155" width="240" height="18" rx="3" fill="#A8948D" opacity="0.4" />

          {/* Vintage Ceramic Mixing Bowl */}
          <g transform="translate(60, 95)">
            <path d="M10 20 C10 55 75 55 75 20 Z" fill="#FDFBF7" stroke="#A7B49B" strokeWidth="2" />
            {/* Decorative sage rim stripe */}
            <path d="M12 25 Q42 30 73 25" stroke="#A7B49B" strokeWidth="1.5" fill="none" />
            {/* Whisk resting in bowl */}
            <line x1="42" y1="38" x2="15" y2="-5" stroke="#9E7B44" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="14" cy="-5" rx="5" ry="9" stroke="#9E7B44" strokeWidth="1.2" fill="none" transform="rotate(-30 14 -5)" />
          </g>

          {/* Vintage Copper Kettle / Saucepan with rising steam */}
          <g transform="translate(150, 85)">
            {/* Kettle body */}
            <path d="M15 45 C15 25 65 25 65 45 L62 65 L18 65 Z" fill="url(#copperGrad)" />
            {/* Kettle lid & knob */}
            <ellipse cx="40" cy="27" rx="18" ry="5" fill="#DF9B72" stroke="#8A441F" strokeWidth="1" />
            <circle cx="40" cy="22" r="3.5" fill="#FDE08B" />
            {/* Spout */}
            <path d="M17 38 Q5 35 3 26 Q12 26 18 32" fill="url(#copperGrad)" />
            {/* Brass overhead handle */}
            <path d="M22 28 C22 10 58 10 58 28" stroke="#B89257" strokeWidth="2.5" fill="none" />

            {/* Rising fragrant steam curls */}
            <path d="M6 18 Q2 10 8 4" stroke="#C5A16B" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <path d="M12 16 Q8 7 14 0" stroke="#C5A16B" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Wheat sprigs & herbs in foreground */}
          <g transform="translate(35, 125)">
            <path d="M5 30 Q15 15 25 0" stroke="#7A896D" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="23" cy="2" rx="4" ry="2" fill="#DFCA9E" transform="rotate(35 23 2)" />
            <ellipse cx="17" cy="8" rx="4" ry="2" fill="#DFCA9E" transform="rotate(-25 17 8)" />
            <ellipse cx="13" cy="16" rx="4" ry="2" fill="#DFCA9E" transform="rotate(30 13 16)" />
          </g>

          {/* Cinnamon stick & Star Anise */}
          <g transform="translate(215, 140)">
            <rect x="0" y="8" width="28" height="6" rx="2" fill="#604A42" transform="rotate(-15)" />
            <circle cx="28" cy="12" r="5" fill="#8A441F" opacity="0.9" />
          </g>
        </svg>
      );

    case 'observatory':
      return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#0B0F1C" />
              <stop offset="0.6" stopColor="#171F38" />
              <stop offset="1" stopColor="#252F52" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FDE08B" />
              <stop offset="0.5" stopColor="#C5A16B" />
              <stop offset="1" stopColor="#916F34" />
            </linearGradient>
          </defs>
          <rect width="280" height="200" rx="16" fill="url(#nightSky)" />

          {/* Celestial Grid & Starry Constellations */}
          <circle cx="140" cy="90" r="75" stroke="#2F3B66" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
          <circle cx="140" cy="90" r="50" stroke="#2F3B66" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />

          {/* Stars & Ursa Major shape */}
          <g opacity="0.85">
            <circle cx="50" cy="40" r="1.5" fill="#FDE08B" />
            <circle cx="75" cy="35" r="2" fill="#FFFFFF" />
            <circle cx="105" cy="45" r="1.5" fill="#FDE08B" />
            <circle cx="130" cy="55" r="2.5" fill="#FDE08B" />
            <circle cx="150" cy="40" r="2" fill="#FFFFFF" />
            <circle cx="180" cy="32" r="1.5" fill="#FDE08B" />
            <circle cx="210" cy="48" r="2.5" fill="#FDE08B" />
            {/* Constellation line */}
            <path d="M50 40 L75 35 L105 45 L130 55 L150 40 L180 32 L210 48" stroke="#FDE08B" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
          </g>

          {/* Crescent Moon in top right corner */}
          <g transform="translate(215, 20)">
            <path
              d="M20 5 C10 12 10 28 20 35 C8 32 3 18 10 8 C13 5 16 4 20 5 Z"
              fill="#FDE08B"
              opacity="0.9"
            />
          </g>

          {/* Brass Astronomical Telescope */}
          <g transform="translate(80, 75)">
            {/* Wooden Tripod Legs */}
            <line x1="60" y1="45" x2="25" y2="105" stroke="#846D65" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="45" x2="60" y2="108" stroke="#604A42" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="45" x2="95" y2="105" stroke="#846D65" strokeWidth="3" strokeLinecap="round" />
            {/* Mounting pivot */}
            <circle cx="60" cy="45" r="5" fill="url(#brassGrad)" />

            {/* Telescope Barrel pointing up-right */}
            <g transform="translate(60, 45) rotate(-32)">
              {/* Main brass tube */}
              <rect x="-40" y="-8" width="80" height="16" rx="3" fill="url(#brassGrad)" />
              {/* Wide objective lens end */}
              <rect x="35" y="-11" width="12" height="22" rx="3" fill="#FDE08B" />
              {/* Eyepiece mount */}
              <rect x="-48" y="-5" width="10" height="10" rx="2" fill="#916F34" />
              <rect x="-56" y="-7" width="8" height="14" rx="2" fill="url(#brassGrad)" />
              {/* Finder scope attached */}
              <rect x="-15" y="-16" width="35" height="5" rx="1.5" fill="#DFCA9E" />
            </g>
          </g>

          {/* Shooting star light streak */}
          <path d="M40 85 L90 100" stroke="url(#brassGrad)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    default:
      return null;
  }
};
