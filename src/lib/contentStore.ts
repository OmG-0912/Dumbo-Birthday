"use client";

import { useState, useEffect } from "react";
import {
  StorybookDatabase,
  MemoryItem,
  GoalItem,
  LibraryItem,
  ArtworkItem,
  RecipeItem,
  DreamItem,
  UniverseMilestone,
  ImportantPlace,
  ConstellationStar,
} from "@/types/content";
import { INITIAL_STORYBOOK_DATA } from "@/data/initialStorybookData";

const STORAGE_KEY = "anavis_world_storybook_data_v1";

// Helper to get raw data from storage or default
export function getStoredStorybookData(): StorybookDatabase {
  if (typeof window === "undefined") {
    return INITIAL_STORYBOOK_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORYBOOK_DATA));
      return INITIAL_STORYBOOK_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      profiles: parsed.profiles || INITIAL_STORYBOOK_DATA.profiles,
      memories: parsed.memories || INITIAL_STORYBOOK_DATA.memories,
      goals: parsed.goals || INITIAL_STORYBOOK_DATA.goals,
      library: parsed.library || INITIAL_STORYBOOK_DATA.library,
      artworks: parsed.artworks || INITIAL_STORYBOOK_DATA.artworks,
      recipes: parsed.recipes || INITIAL_STORYBOOK_DATA.recipes,
      dreams: parsed.dreams || INITIAL_STORYBOOK_DATA.dreams,
      universeTimeline: parsed.universeTimeline || INITIAL_STORYBOOK_DATA.universeTimeline,
      importantPlaces: parsed.importantPlaces || INITIAL_STORYBOOK_DATA.importantPlaces,
      constellationStars: parsed.constellationStars || INITIAL_STORYBOOK_DATA.constellationStars,
    };
  } catch (err) {
    console.error("Failed to parse storybook data from localStorage:", err);
    return INITIAL_STORYBOOK_DATA;
  }
}

export function saveStoredStorybookData(data: StorybookDatabase): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("storybook_data_updated"));
  } catch (err) {
    console.error("Failed to save storybook data to localStorage:", err);
  }
}

// React Hook to subscribe to storybook data changes across components
export function useStorybookData() {
  const [data, setData] = useState<StorybookDatabase>(() => getStoredStorybookData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredStorybookData());
    };
    window.addEventListener("storybook_data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("storybook_data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // CRUD helpers
  const saveMemory = (item: MemoryItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.memories.findIndex((m) => m.id === item.id);
    let updatedMemories: MemoryItem[];
    if (existingIndex >= 0) {
      updatedMemories = [...current.memories];
      updatedMemories[existingIndex] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      updatedMemories = [item, ...current.memories];
    }
    saveStoredStorybookData({ ...current, memories: updatedMemories });
  };

  const deleteMemory = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      memories: current.memories.filter((m) => m.id !== id),
    });
  };

  const saveGoal = (item: GoalItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.goals.findIndex((g) => g.id === item.id);
    let updated: GoalItem[];
    if (existingIndex >= 0) {
      updated = [...current.goals];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.goals];
    }
    saveStoredStorybookData({ ...current, goals: updated });
  };

  const deleteGoal = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      goals: current.goals.filter((g) => g.id !== id),
    });
  };

  const saveLibraryItem = (item: LibraryItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.library.findIndex((l) => l.id === item.id);
    let updated: LibraryItem[];
    if (existingIndex >= 0) {
      updated = [...current.library];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.library];
    }
    saveStoredStorybookData({ ...current, library: updated });
  };

  const deleteLibraryItem = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      library: current.library.filter((l) => l.id !== id),
    });
  };

  const saveArtwork = (item: ArtworkItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.artworks.findIndex((a) => a.id === item.id);
    let updated: ArtworkItem[];
    if (existingIndex >= 0) {
      updated = [...current.artworks];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.artworks];
    }
    saveStoredStorybookData({ ...current, artworks: updated });
  };

  const deleteArtwork = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      artworks: current.artworks.filter((a) => a.id !== id),
    });
  };

  const saveRecipe = (item: RecipeItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.recipes.findIndex((r) => r.id === item.id);
    let updated: RecipeItem[];
    if (existingIndex >= 0) {
      updated = [...current.recipes];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.recipes];
    }
    saveStoredStorybookData({ ...current, recipes: updated });
  };

  const deleteRecipe = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      recipes: current.recipes.filter((r) => r.id !== id),
    });
  };

  const saveDream = (item: DreamItem) => {
    const current = getStoredStorybookData();
    const existingIndex = current.dreams.findIndex((d) => d.id === item.id);
    let updated: DreamItem[];
    if (existingIndex >= 0) {
      updated = [...current.dreams];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.dreams];
    }
    saveStoredStorybookData({ ...current, dreams: updated });
  };

  const deleteDream = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      dreams: current.dreams.filter((d) => d.id !== id),
    });
  };

  const saveUniverseTimeline = (item: UniverseMilestone) => {
    const current = getStoredStorybookData();
    const existingIndex = current.universeTimeline.findIndex((t) => t.id === item.id);
    let updated: UniverseMilestone[];
    if (existingIndex >= 0) {
      updated = [...current.universeTimeline];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current.universeTimeline];
    }
    saveStoredStorybookData({ ...current, universeTimeline: updated });
  };

  const deleteUniverseTimeline = (id: string) => {
    const current = getStoredStorybookData();
    saveStoredStorybookData({
      ...current,
      universeTimeline: current.universeTimeline.filter((t) => t.id !== id),
    });
  };

  const resetToDemonstrationData = () => {
    saveStoredStorybookData(INITIAL_STORYBOOK_DATA);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anavis-world-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as StorybookDatabase;
      if (!parsed.memories || !parsed.library) {
        throw new Error("Invalid structure");
      }
      saveStoredStorybookData(parsed);
      return true;
    } catch (err) {
      console.error("Failed to import JSON:", err);
      return false;
    }
  };

  return {
    data,
    saveMemory,
    deleteMemory,
    saveGoal,
    deleteGoal,
    saveLibraryItem,
    deleteLibraryItem,
    saveArtwork,
    deleteArtwork,
    saveRecipe,
    deleteRecipe,
    saveDream,
    deleteDream,
    saveUniverseTimeline,
    deleteUniverseTimeline,
    resetToDemonstrationData,
    exportJSON,
    importJSON,
  };
}
