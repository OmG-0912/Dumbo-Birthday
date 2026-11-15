"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Heart,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Image as ImageIcon,
  Mail,
  Gift,
  Camera,
} from "lucide-react";
import { useBirthdayData } from "@/lib/birthdayStore";
import { BirthdayEnvelopeStage } from "@/components/birthday/BirthdayEnvelopeStage";
import { BirthdayRevealStage } from "@/components/birthday/BirthdayRevealStage";
import { BirthdayGalleryStage } from "@/components/birthday/BirthdayGalleryStage";
import { BirthdayLetterStage } from "@/components/birthday/BirthdayLetterStage";
import { BirthdaySurpriseStage } from "@/components/birthday/BirthdaySurpriseStage";

export default function BirthdayExperiencePage() {
  const {
    data,
    updatePhoto,
    addPhoto,
    deletePhoto,
    updateLetter,
    updateSurprise,
    resetToDefault,
  } = useBirthdayData();

  // Stages: 1 = Envelope, 2 = Reveal, 3 = Gallery, 4 = Letter, 5 = Surprise
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [hasVisitedStage2, setHasVisitedStage2] = useState<boolean>(false);

  // Scroll to top smoothly when stage changes
  const changeStage = (stage: number) => {
    setCurrentStage(stage);
    if (stage >= 2) setHasVisitedStage2(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEnvelopeOpen = () => {
    changeStage(2);
  };

  const handleSkipIntro = () => {
    changeStage(3);
  };

  const handleReplay = () => {
    changeStage(1);
  };

  const stageTabs = [
    { num: 1, label: "The Envelope", icon: Mail },
    { num: 2, label: "The Reveal", icon: Sparkles },
    { num: 3, label: "Her Moments", icon: Camera },
    { num: 4, label: "The Letter", icon: Heart },
    { num: 5, label: "The Surprise", icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#3D2A24] selection:bg-[#B88B4A]/20 selection:text-[#172D29]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(247,241,231,0.8)_0%,_rgba(251,248,242,1)_100%)] pointer-events-none z-0" />

      {/* =========================================================================
          TOP MINIMAL NAVIGATION BAR FOR BIRTHDAY EXPERIENCE
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FBF8F2]/90 backdrop-blur-md border-b border-[#B88B4A]/25 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back to main website */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-[#60463E] hover:text-[#172D29] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B88B4A] group-hover:-translate-x-1 transition-transform" />
            <span>Anavi&apos;s World</span>
          </Link>

          {/* Stage Stepper Tabs (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#FAF5ED] p-1 rounded-full border border-[#B88B4A]/30 shadow-xs">
            {stageTabs.map((tab) => {
              const isActive = currentStage === tab.num;
              const isPast = currentStage > tab.num;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.num}
                  onClick={() => changeStage(tab.num)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#172D29] text-[#FDE08B] shadow-xs"
                      : isPast
                      ? "text-[#172D29] hover:bg-[#B88B4A]/10"
                      : "text-[#60463E]/70 hover:text-[#172D29] hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Replay / Stage jump) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              className="p-2 rounded-full text-[#60463E] hover:text-[#172D29] hover:bg-[#B88B4A]/10 transition-colors"
              title="Replay from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D6A0A0]/20 text-[#3D2A24] border border-[#D6A0A0]/40 text-[11px] font-semibold">
              <Heart className="w-3 h-3 fill-[#D6A0A0] text-[#D6A0A0]" />
              <span>16 Nov</span>
            </div>
          </div>
        </div>

        {/* Mobile Stage Pill Bar */}
        <div className="flex md:hidden items-center justify-center gap-1 mt-2.5 pt-2 border-t border-[#B88B4A]/15 overflow-x-auto no-scrollbar">
          {stageTabs.map((tab) => {
            const isActive = currentStage === tab.num;
            return (
              <button
                key={tab.num}
                onClick={() => changeStage(tab.num)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#172D29] text-[#FDE08B]"
                    : "text-[#60463E] hover:bg-[#B88B4A]/10"
                }`}
              >
                {tab.num}. {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* =========================================================================
          STAGE VIEWS
         ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* STAGE 1: THE ENVELOPE */}
        {currentStage === 1 && (
          <BirthdayEnvelopeStage
            tagline={data.envelopeTagline}
            recipient={data.envelopeRecipient}
            onOpenComplete={handleEnvelopeOpen}
            onSkipIntro={handleSkipIntro}
          />
        )}

        {/* STAGE 2: THE BIRTHDAY REVEAL */}
        {currentStage === 2 && (
          <BirthdayRevealStage
            title={data.title}
            subtitle={data.subtitle}
            date={data.date}
            onContinue={() => changeStage(3)}
          />
        )}

        {/* STAGE 3: HER PHOTOGRAPH GALLERY */}
        {currentStage === 3 && (
          <BirthdayGalleryStage
            photos={data.photos}
            onUpdatePhoto={updatePhoto}
            onAddPhoto={addPhoto}
            onDeletePhoto={deletePhoto}
            onContinue={() => changeStage(4)}
          />
        )}

        {/* STAGE 4: THE PERSONAL BIRTHDAY LETTER */}
        {currentStage === 4 && (
          <BirthdayLetterStage
            title={data.letterTitle}
            date={data.letterDate}
            salutation={data.letterSalutation}
            body={data.letterBody}
            closing={data.letterClosing}
            signature={data.letterSignature}
            onUpdateLetter={updateLetter}
            onContinue={() => changeStage(5)}
          />
        )}

        {/* STAGE 5: THE HIDDEN SURPRISE */}
        {currentStage === 5 && (
          <BirthdaySurpriseStage
            prompt={data.giftBoxPrompt}
            message={data.giftBoxMessage}
            quote={data.giftBoxQuote}
            voiceNoteUrl={data.voiceNoteUrl}
            voiceNoteTitle={data.voiceNoteTitle}
            voiceNoteSubtitle={data.voiceNoteSubtitle}
            voiceNote2Url={data.voiceNote2Url}
            voiceNote2Title={data.voiceNote2Title}
            voiceNote2Subtitle={data.voiceNote2Subtitle}
            surprisePhotos={data.surprisePhotos || data.photos}
            onUpdateSurprise={updateSurprise}
            onReplay={handleReplay}
          />
        )}
      </main>

      {/* =========================================================================
          EXPERIENCE FOOTER NOTE
         ========================================================================= */}
      <footer className="relative z-10 py-12 text-center text-xs text-[#60463E]/80 border-t border-[#B88B4A]/20 mt-16">
        <p className="font-serif italic text-sm">
          Created with endless love for Anavi • 16 November
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <Link href="/" className="hover:underline hover:text-[#172D29]">
            Return to Sanctuary
          </Link>
          <span>•</span>
          <button
            onClick={() => {
              if (confirm("Reset birthday experience to default text and photos?")) {
                resetToDefault();
              }
            }}
            className="hover:underline hover:text-[#172D29]"
          >
            Reset Defaults
          </button>
        </div>
      </footer>
    </div>
  );
}
