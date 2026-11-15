import React from "react";
import { HeroStorybook } from "@/components/home/HeroStorybook";
import { DailyNoteCard } from "@/components/home/DailyNoteCard";
import { BirthdayInvitationCard } from "@/components/home/BirthdayInvitationCard";
import { CompanionAvatars } from "@/components/characters/CompanionAvatars";
import { AtmosphereURLSync } from "@/components/home/AtmosphereURLSync";
import { AtmosphereMode } from "@/hooks/useGardenTimeOfDay";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ time?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const timeParam = resolvedParams?.time;
  const initialAtmosphere =
    timeParam && ["morning", "afternoon", "golden_hour", "night", "auto"].includes(timeParam)
      ? (timeParam as AtmosphereMode)
      : undefined;

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic URL Atmosphere Sync */}
      <AtmosphereURLSync initialTime={initialAtmosphere} />

      {/* 1. Cinematic Enchanted Garden Hero */}
      <HeroStorybook />

      {/* 2. Daily Note with Wax Seal */}
      <DailyNoteCard />

      {/* 3. Dedicated Birthday Invitation & Experience Showcase */}
      <BirthdayInvitationCard />

      {/* 4. Four Original Recurring Storybook Companions */}
      <CompanionAvatars />
    </div>
  );
}
