"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flower2,
  CheckCircle2,
  Circle,
  Clock,
  PlusCircle,
  Calendar,
  Filter,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { useAuth } from "@/context/AuthContext";
import { GoalItem, FlowerStage, GoalCategory } from "@/types/content";

export default function GardenOfBecomingPage() {
  const { data, saveGoal } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");

  const goals = data.goals;

  const filteredGoals = goals.filter((g) => {
    if (selectedCategory !== "all" && g.category !== selectedCategory) return false;
    if (selectedStage !== "all" && g.flowerStage !== selectedStage) return false;
    return true;
  });

  const bloomedCount = goals.filter((g) => g.flowerStage === "bloomed").length;
  const inProgressCount = goals.filter((g) => g.flowerStage !== "bloomed").length;

  const stageIcons: Record<FlowerStage, { label: string; symbol: string; color: string; desc: string }> = {
    seed: { label: "Seedling Intention", symbol: "🌱", color: "#8E8578", desc: "Planted in fertile hope" },
    sprout: { label: "Sprouting Canes", symbol: "🌿", color: "#6A8058", desc: "Taking steady root" },
    bud: { label: "Tender Bud", symbol: "🌷", color: "#DDA0A4", desc: "Poised to unfold" },
    bloomed: { label: "Full Blossom Triumph", symbol: "🌸", color: "#C89B3C", desc: "Achieved and celebrated" },
  };

  const toggleStep = (goal: GoalItem, stepId: string) => {
    const updatedSteps = goal.milestoneSteps.map((step) => {
      if (step.id === stepId) return { ...step, done: !step.done };
      return step;
    });
    const doneCount = updatedSteps.filter((s) => s.done).length;
    const progressPercent = updatedSteps.length > 0 ? Math.round((doneCount / updatedSteps.length) * 100) : goal.progressPercent;
    const flowerStage: FlowerStage =
      progressPercent >= 100 ? "bloomed" : progressPercent >= 65 ? "bud" : progressPercent >= 25 ? "sprout" : "seed";

    saveGoal({
      ...goal,
      milestoneSteps: updatedSteps,
      progressPercent,
      flowerStage,
      completedDate: progressPercent >= 100 ? new Date().toISOString().split("T")[0] : undefined,
    });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <RoomHeader
        roomNumber="Room II"
        title="Garden of Becoming"
        subtitle="Where intentions take root and dreams blossom into milestones"
        description="Every ambition she holds dear, tended like rare botanical specimens. Track upcoming intentions from seeds to full blossoms, check off stepping stones, and celebrate every quiet triumph along her path."
        badgeCategory="Milestones & Aspirations"
        stats={[
          { label: "Active Cultivations", count: inProgressCount },
          { label: "Full Blooms", count: bloomedCount },
        ]}
      >
        <Link
          href="/admin?tab=goals"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Plant New Intention</span>
        </Link>
      </RoomHeader>

      {/* 2. Visual Flower Stage Legend */}
      <div
        className={`rounded-2xl p-5 mb-8 border grid grid-cols-2 sm:grid-cols-4 gap-4 ${
          isNight
            ? "bg-[#18312B]/70 border-[#B88B4A]/30 text-[#FAF5ED]"
            : "bg-[#F7F2EA] border-gold/30 text-cocoa"
        }`}
      >
        {(Object.keys(stageIcons) as FlowerStage[]).map((st) => {
          const info = stageIcons[st];
          const isSelected = selectedStage === st;
          return (
            <button
              key={st}
              onClick={() => setSelectedStage(isSelected ? "all" : st)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-gold bg-gold/15 shadow-sm scale-102"
                  : "border-transparent hover:bg-gold/10"
              }`}
            >
              <div className="text-2xl mb-1">{info.symbol}</div>
              <div className="font-serif font-bold text-sm">{info.label}</div>
              <div className="text-[11px] text-cocoa/60 italic">{info.desc}</div>
            </button>
          );
        })}
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-3 border-b border-gold/20">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {["all", "personal", "creative", "career", "wellness", "together"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
                  : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
              }`}
            >
              {cat === "all" ? "All Cultivations" : cat}
            </button>
          ))}
        </div>

        {selectedStage !== "all" && (
          <button
            onClick={() => setSelectedStage("all")}
            className="text-xs text-gold hover:underline font-serif italic"
          >
            Clear stage filter ({selectedStage})
          </button>
        )}
      </div>

      {/* 4. Goals & Milestone Cultivation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredGoals.map((goal) => {
          const stageInfo = stageIcons[goal.flowerStage];
          const isBloomed = goal.flowerStage === "bloomed";

          return (
            <div
              key={goal.id}
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                isBloomed
                  ? isNight
                    ? "bg-[#18312B]/95 border-[#FDE08B]/50 shadow-celestial-glow"
                    : "bg-[#FCFAF6] border-gold shadow-storybook"
                  : isNight
                  ? "bg-[#18312B]/80 border-[#B88B4A]/30"
                  : "bg-[#FCFAF6] border-gold/30 hover:border-gold/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-xs font-serif font-bold text-gold">
                    <span>{stageInfo.symbol}</span>
                    <span>{stageInfo.label}</span>
                  </span>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-cocoa/50">
                    Target: {goal.targetDate}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-cocoa mt-2 mb-1">
                  {goal.title}
                </h3>

                <p className="text-xs text-cocoa/70 leading-relaxed mb-5">
                  {goal.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-cocoa/60 font-serif italic">Cultivation Progress</span>
                    <span className="text-gold font-bold">{goal.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gold/15 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-sage via-gold to-[#DDA0A4]"
                      style={{ width: `${goal.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Milestone Stepping Stones */}
                {goal.milestoneSteps && goal.milestoneSteps.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-gold/15">
                    <span className="block text-[11px] uppercase tracking-wider font-semibold text-cocoa/50 mb-2">
                      Stepping Stones (Interactive Checklist):
                    </span>
                    {goal.milestoneSteps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => toggleStep(goal, step.id)}
                        className="w-full flex items-start gap-3 p-2 rounded-xl text-left hover:bg-gold/10 transition-colors group"
                      >
                        {step.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-gold/60 group-hover:text-gold shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-xs ${
                            step.done ? "line-through text-cocoa/50" : "text-cocoa"
                          }`}
                        >
                          {step.text}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Reflection Notes */}
                {goal.reflectionNotes && (
                  <div className="mt-5 p-4 rounded-xl bg-gold/10 border-l-2 border-gold text-xs font-serif italic text-cocoa">
                    {goal.reflectionNotes}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between text-[11px] text-cocoa/50">
                <span className="capitalize font-mono">Category: {goal.category}</span>
                {goal.completedDate && (
                  <span className="text-emerald-700 font-serif italic">
                    🌸 Bloomed on {goal.completedDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
