"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Shield, ChevronDown, Check, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { AccountRole } from "@/types/content";

export const AccountSwitcherPill: React.FC = () => {
  const { currentUser, role, loginAs, isSupabaseConnected } = useAuth();
  const { isNight } = useGardenAtmosphere();
  const [isOpen, setIsOpen] = useState(false);

  const accounts: { role: AccountRole; label: string; badge: string }[] = [
    { role: "anavi", label: "Anavi", badge: "Sanctuary Curator" },
    { role: "me", label: "Rohan (Me)", badge: "Archivist & Co-Curator" },
    { role: "guest", label: "Storybook Visitor", badge: "Read-Only Sanctuary" },
  ];

  return (
    <div className="relative inline-block text-left" onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
          isNight
            ? "bg-[#18312B]/90 border-[#B88B4A]/50 text-[#FAF5ED] hover:border-[#FDE08B]"
            : "bg-[#F7F2EA]/90 border-gold/40 text-cocoa hover:border-gold"
        }`}
        title="Sanctuary Account & Permissions"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentUser.signatureColor || "#C89B3C" }}
        />
        <span className="font-serif font-bold">{currentUser.name}</span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-2xl p-2 z-50 border shadow-2xl animate-in fade-in duration-150 ${
            isNight
              ? "bg-[#132521] border-[#B88B4A]/50 text-[#FAF5ED]"
              : "bg-[#FCFAF6] border-gold/30 text-cocoa"
          }`}
        >
          <div className="px-3 py-2 border-b border-gold/20 mb-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                Active Account
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSupabaseConnected ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-500"
                }`}
              >
                {isSupabaseConnected ? "Supabase Live" : "Local Vault"}
              </span>
            </div>
            <p className="font-serif text-sm font-semibold mt-0.5">{currentUser.name}</p>
            <p className="text-[11px] text-cocoa/70 italic mt-0.5">{currentUser.bio}</p>
          </div>

          <div className="space-y-1">
            <span className="block px-3 pt-1 text-[10px] uppercase tracking-wider text-gold/70 font-semibold">
              Switch Sanctuary Profile:
            </span>
            {accounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => {
                  loginAs(acc.role);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  role === acc.role
                    ? isNight
                      ? "bg-[#1E3B36] text-[#FDE08B] font-semibold"
                      : "bg-gold/15 text-cocoa-deep font-semibold"
                    : isNight
                    ? "hover:bg-white/10 text-white/80"
                    : "hover:bg-gold/10 text-cocoa"
                }`}
              >
                <div className="text-left">
                  <span>{acc.label}</span>
                  <span className="block text-[9px] text-gold/80 italic">{acc.badge}</span>
                </div>
                {role === acc.role && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gold/20 flex flex-col gap-1">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isNight
                  ? "hover:bg-white/10 text-[#FDE08B]"
                  : "hover:bg-gold/10 text-gold-deep"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Sanctuary Content Manager</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
