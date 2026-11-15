import React from "react";

interface BotanicalDividerProps {
  className?: string;
  variant?: "floral" | "laurel" | "celestial" | "simple";
}

export const BotanicalDivider: React.FC<BotanicalDividerProps> = ({
  className = "",
  variant = "floral",
}) => {
  if (variant === "celestial") {
    return (
      <div className={`flex items-center justify-center gap-3 py-4 text-celestial-gold/60 ${className}`}>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-celestial-gold/40 to-celestial-gold/80" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-celestial-gold animate-shimmer">
          <path
            d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
            fill="currentColor"
            opacity="0.9"
          />
          <circle cx="12" cy="10" r="1.5" fill="#FFFDF9" />
        </svg>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-celestial-gold/40 to-celestial-gold/80" />
      </div>
    );
  }

  if (variant === "laurel") {
    return (
      <div className={`flex items-center justify-center gap-2 py-3 text-sage ${className}`}>
        <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-sage/50" />
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-sage">
          <path
            d="M20 15C16 11 12 10 5 11C10 7 15 8 19 13M20 15C24 11 28 10 35 11C30 7 25 8 21 13"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="8" r="2" fill="currentColor" opacity="0.8" />
        </svg>
        <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-sage/50" />
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={`flex items-center justify-center gap-2 py-2 text-gold/60 ${className}`}>
        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-xs font-serif tracking-widest text-gold">❧</span>
        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 py-4 text-gold/70 ${className}`}>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold/30 to-gold/70" />
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="text-gold">
        <path
          d="M18 10C15 5 11 5 6 7C10 3 15 4 17 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M18 10C21 5 25 5 30 7C26 3 21 4 19 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="10" r="2" fill="currentColor" />
        <circle cx="9" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
        <circle cx="27" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-gold/30 to-gold/70" />
    </div>
  );
};
