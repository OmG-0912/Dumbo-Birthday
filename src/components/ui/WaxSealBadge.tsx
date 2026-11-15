import React from "react";

interface WaxSealBadgeProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "blush" | "gold" | "sage";
  className?: string;
}

export const WaxSealBadge: React.FC<WaxSealBadgeProps> = ({
  label = "A",
  size = "md",
  variant = "blush",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const variantColors = {
    blush: {
      outer: "bg-[#D99A9C]",
      border: "border-[#BF7D80]",
      inner: "bg-[#C88487]",
      highlight: "from-[#F3D5D7] via-[#D99A9C] to-[#AB6B6E]",
      text: "text-[#FAF5ED]",
      shadow: "shadow-[0_4px_14px_rgba(196,143,145,0.45),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(80,40,40,0.3)]",
    },
    gold: {
      outer: "bg-[#C5A16B]",
      border: "border-[#9E7B44]",
      inner: "bg-[#B89257]",
      highlight: "from-[#FBE9C4] via-[#C5A16B] to-[#8C682E]",
      text: "text-[#FAF5ED]",
      shadow: "shadow-[0_4px_14px_rgba(197,161,107,0.45),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(70,50,20,0.3)]",
    },
    sage: {
      outer: "bg-[#8E9F82]",
      border: "border-[#6E7E63]",
      inner: "bg-[#7E8F72]",
      highlight: "from-[#DCE6D5] via-[#8E9F82] to-[#55644C]",
      text: "text-[#FAF5ED]",
      shadow: "shadow-[0_4px_14px_rgba(142,159,130,0.45),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(40,55,30,0.3)]",
    },
  };

  const v = variantColors[variant];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full select-none cursor-default transition-transform hover:scale-105 ${sizeClasses[size]} ${v.shadow} ${className}`}
      style={{
        borderRadius: "48% 52% 49% 51% / 51% 47% 53% 49%", // Organic wax seal unevenness
      }}
    >
      {/* Outer wax ring edge with subtle ripple */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${v.highlight} opacity-90`}
        style={{ borderRadius: "47% 53% 50% 50% / 50% 48% 52% 50%" }}
      />
      {/* Inner pressed chamber */}
      <div
        className={`relative z-10 w-[78%] h-[78%] rounded-full border border-white/30 flex items-center justify-center ${v.inner} shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]`}
      >
        <span className={`font-serif italic font-bold tracking-wider ${v.text} drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]`}>
          {label}
        </span>
      </div>
    </div>
  );
};
