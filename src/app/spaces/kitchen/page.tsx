"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Utensils,
  Clock,
  Users,
  ChefHat,
  PlusCircle,
  Heart,
  CheckCircle2,
  Circle,
  X,
  Flame,
} from "lucide-react";
import { RoomHeader } from "@/components/rooms/RoomHeader";
import { useStorybookData } from "@/lib/contentStore";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { RecipeItem, RecipeCategory } from "@/types/content";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";

export default function KitchenOfLittleJoysPage() {
  const { data } = useStorybookData();
  const { isNight } = useGardenAtmosphere();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const recipes = data.recipes;

  const filteredRecipes = recipes.filter((r) => {
    if (activeCategory === "all") return true;
    return r.category === activeCategory;
  });

  const toggleIngredient = (ingText: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingText]: !prev[ingText],
    }));
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <RoomHeader
        roomNumber="Room V"
        title="Kitchen of Little Joys"
        subtitle="Flavors, caramelized warmth, and weekend culinary alchemy"
        description="A treasury of braided cardamom brioche, slow-stirred autumn risottos, spontaneous baking experiments, and inherited spice secrets. Click any recipe to open the full kitchen preparation notes and interactive ingredients checklist."
        badgeCategory="Culinary & Comfort"
        stats={[
          { label: "Treasured Recipes", count: recipes.length },
          { label: "Bake Experiments", count: recipes.filter((r) => r.category === "weekend_bake").length },
        ]}
      >
        <Link
          href="/admin?tab=recipes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] hover:bg-[#FDE08B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Recipe</span>
        </Link>
      </RoomHeader>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gold/20">
        {[
          { id: "all", label: "All Kitchen Treasures" },
          { id: "weekend_bake", label: "Weekend Bakes" },
          { id: "comfort_dinner", label: "Comfort Dinners" },
          { id: "sweet_indulgence", label: "Sweet Indulgences" },
          { id: "beverage_alchemy", label: "Beverage Alchemy" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              activeCategory === tab.id
                ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-xs"
                : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((rec) => (
          <div
            key={rec.id}
            onClick={() => setSelectedRecipe(rec)}
            className={`rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-between hover:scale-101 hover:shadow-storybook group ${
              isNight
                ? "bg-[#18312B]/90 border-[#B88B4A]/30 hover:border-[#FDE08B] text-[#FAF5ED]"
                : "bg-[#FCFAF6] border-gold/30 hover:border-gold text-cocoa"
            }`}
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-black/10">
              <Image
                src={rec.coverImage}
                alt={rec.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase font-mono tracking-wider text-white">
                {rec.difficulty}
              </div>
              {rec.isFavorite && (
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-gold/90 text-[#172D29]">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold group-hover:text-gold transition-colors mb-1">
                  {rec.title}
                </h3>
                <p className="font-serif italic text-xs text-gold-deep mb-4 line-clamp-2">
                  {rec.subtitle}
                </p>

                {/* Timing & Servings info */}
                <div className="flex items-center gap-4 text-xs font-mono text-cocoa/70 mb-4 pt-3 border-t border-gold/15">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{rec.prepTimeMinutes + rec.cookTimeMinutes} mins</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>{rec.servings}</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-gold">
                <span>View Full Preparation</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. RECIPE PREPARATION DETAIL MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div
            className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border relative shadow-2xl ${
              isNight
                ? "bg-[#132521] border-[#B88B4A]/50 text-[#FAF5ED]"
                : "bg-[#FBF9F5] border-gold/40 text-cocoa"
            }`}
          >
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
              aria-label="Close recipe details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold font-bold">
                KITCHEN ALCHEMY • VOLUME V
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
                {selectedRecipe.title}
              </h2>
              <p className="font-serif italic text-gold-deep text-sm mt-1">
                {selectedRecipe.subtitle}
              </p>

              <div className="flex items-center justify-center gap-6 text-xs font-mono text-cocoa/60 mt-4">
                <span>Prep: {selectedRecipe.prepTimeMinutes}m</span>
                <span>•</span>
                <span>Bake/Cook: {selectedRecipe.cookTimeMinutes}m</span>
                <span>•</span>
                <span>Yield: {selectedRecipe.servings}</span>
              </div>
            </div>

            <BotanicalDivider variant="floral" className="my-6" />

            {/* Ingredients Checklist */}
            <div className="my-6">
              <h4 className="font-serif text-lg font-bold text-gold mb-3 flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                <span>Ingredients (Tap to Check Off):</span>
              </h4>
              <div className="space-y-4">
                {selectedRecipe.ingredients.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-gold/5 p-4 rounded-2xl border border-gold/15">
                    {sec.section && (
                      <span className="block font-serif font-bold text-xs uppercase tracking-wider text-gold-deep mb-2">
                        {sec.section}
                      </span>
                    )}
                    <div className="space-y-1.5">
                      {sec.items.map((item, iIdx) => {
                        const isDone = checkedIngredients[item];
                        return (
                          <button
                            key={iIdx}
                            onClick={() => toggleIngredient(item)}
                            className="w-full flex items-center gap-2.5 text-left text-xs text-cocoa/85 hover:text-cocoa transition-colors"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-gold/60 shrink-0" />
                            )}
                            <span className={isDone ? "line-through opacity-50" : ""}>
                              {item}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="my-6">
              <h4 className="font-serif text-lg font-bold text-gold mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>Step-by-Step Method:</span>
              </h4>
              <div className="space-y-4">
                {selectedRecipe.instructions.map((inst) => (
                  <div
                    key={inst.stepNumber}
                    className="p-4 rounded-2xl bg-gold/5 border border-gold/15 flex items-start gap-4"
                  >
                    <span className="w-7 h-7 rounded-full bg-gold/20 text-gold-deep font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {inst.stepNumber}
                    </span>
                    <div>
                      {inst.title && (
                        <h5 className="font-serif font-bold text-sm text-cocoa mb-1">
                          {inst.title}
                        </h5>
                      )}
                      <p className="text-xs leading-relaxed text-cocoa/80">{inst.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anavi's Secret Tip */}
            {selectedRecipe.anaviSecretTip && (
              <div className="my-6 p-5 rounded-2xl bg-[#F7F2EA] border-l-4 border-gold text-xs">
                <span className="block font-serif font-bold uppercase tracking-wider text-gold mb-1">
                  ✨ Anavi&apos;s Secret Touch
                </span>
                <p className="font-serif italic text-sm text-cocoa leading-relaxed">
                  {selectedRecipe.anaviSecretTip}
                </p>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gold/20 text-center">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="px-6 py-2 rounded-full bg-gold/15 hover:bg-gold/25 text-gold-deep text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close Recipe View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
