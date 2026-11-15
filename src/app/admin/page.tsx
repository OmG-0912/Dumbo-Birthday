"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowLeft,
  Camera,
  Flower2,
  BookOpen,
  Palette,
  Utensils,
  Compass,
  Heart,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Lock,
  Eye,
  Settings,
  Database,
  X,
} from "lucide-react";
import { useStorybookData } from "@/lib/contentStore";
import { useAuth } from "@/context/AuthContext";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import {
  MemoryItem,
  GoalItem,
  LibraryItem,
  ArtworkItem,
  RecipeItem,
  DreamItem,
  UniverseMilestone,
} from "@/types/content";
import { AdminBirthdayManager } from "@/components/admin/AdminBirthdayManager";

type AdminTab = "memories" | "goals" | "library" | "artworks" | "recipes" | "dreams" | "universe" | "birthday" | "vault";

export default function AdminDashboardPage() {
  const {
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
  } = useStorybookData();

  const { currentUser, role, isSupabaseConnected } = useAuth();
  const { isNight } = useGardenAtmosphere();
  const [activeTab, setActiveTab] = useState<AdminTab>("memories");
  const [notification, setNotification] = useState<string | null>(null);

  // Modal Form States
  const [editingMemory, setEditingMemory] = useState<Partial<MemoryItem> | null>(null);
  const [editingGoal, setEditingGoal] = useState<Partial<GoalItem> | null>(null);
  const [editingLibrary, setEditingLibrary] = useState<Partial<LibraryItem> | null>(null);
  const [editingArtwork, setEditingArtwork] = useState<Partial<ArtworkItem> | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Partial<RecipeItem> | null>(null);
  const [editingDream, setEditingDream] = useState<Partial<DreamItem> | null>(null);
  const [editingUniverse, setEditingUniverse] = useState<Partial<UniverseMilestone> | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Memory Save Handler
  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory?.title || !editingMemory?.coverImage) {
      alert("Please provide a title and cover image URL.");
      return;
    }
    const fullItem: MemoryItem = {
      id: editingMemory.id || `mem-${Date.now()}`,
      title: editingMemory.title,
      caption: editingMemory.caption || "",
      story: editingMemory.story || "",
      personalNote: editingMemory.personalNote || "",
      date: editingMemory.date || new Date().toISOString().split("T")[0],
      location: editingMemory.location || "Sanctuary Haven",
      coverImage: editingMemory.coverImage,
      images: editingMemory.images && editingMemory.images.length > 0 ? editingMemory.images : [editingMemory.coverImage],
      videoUrl: editingMemory.videoUrl || "",
      audioRecordingUrl: editingMemory.audioRecordingUrl || "",
      roomTag: editingMemory.roomTag || "memories",
      format: editingMemory.format || "polaroid",
      isShared: editingMemory.isShared ?? true,
      owner: editingMemory.owner || (role === "guest" ? "anavi" : role),
      tags: editingMemory.tags || ["keepsake"],
      createdAt: editingMemory.createdAt || new Date().toISOString(),
    };
    saveMemory(fullItem);
    setEditingMemory(null);
    showToast("Memory successfully inscribed in the Storybook!");
  };

  // Goal Save Handler
  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal?.title) return;
    const fullItem: GoalItem = {
      id: editingGoal.id || `goal-${Date.now()}`,
      title: editingGoal.title,
      description: editingGoal.description || "",
      category: editingGoal.category || "personal",
      flowerStage: editingGoal.flowerStage || "sprout",
      targetDate: editingGoal.targetDate || "2025-12-31",
      progressPercent: editingGoal.progressPercent ?? 20,
      reflectionNotes: editingGoal.reflectionNotes || "",
      milestoneSteps: editingGoal.milestoneSteps || [
        { id: "s1", text: "First intentional step", done: false },
      ],
      isShared: editingGoal.isShared ?? true,
      owner: editingGoal.owner || (role === "guest" ? "anavi" : role),
      createdAt: editingGoal.createdAt || new Date().toISOString(),
    };
    saveGoal(fullItem);
    setEditingGoal(null);
    showToast("Milestone intention successfully planted!");
  };

  // Library Save Handler
  const handleSaveLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLibrary?.title || !editingLibrary?.content) return;
    const fullItem: LibraryItem = {
      id: editingLibrary.id || `lib-${Date.now()}`,
      type: editingLibrary.type || "poetry",
      title: editingLibrary.title,
      content: editingLibrary.content,
      author: editingLibrary.author || "",
      date: editingLibrary.date || new Date().toISOString().split("T")[0],
      isPrivate: editingLibrary.isPrivate ?? false,
      owner: editingLibrary.owner || (role === "guest" ? "anavi" : role),
      tags: editingLibrary.tags || ["literature"],
      createdAt: editingLibrary.createdAt || new Date().toISOString(),
    };
    saveLibraryItem(fullItem);
    setEditingLibrary(null);
    showToast("Literary entry successfully bound into Library of Words!");
  };

  // Recipe Save Handler
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe?.title || !editingRecipe?.coverImage) return;
    const fullItem: RecipeItem = {
      id: editingRecipe.id || `rec-${Date.now()}`,
      title: editingRecipe.title,
      subtitle: editingRecipe.subtitle || "",
      category: editingRecipe.category || "weekend_bake",
      prepTimeMinutes: editingRecipe.prepTimeMinutes || 20,
      cookTimeMinutes: editingRecipe.cookTimeMinutes || 30,
      servings: editingRecipe.servings || "2-4 portions",
      difficulty: editingRecipe.difficulty || "approachable",
      coverImage: editingRecipe.coverImage,
      galleryImages: [editingRecipe.coverImage],
      ingredients: editingRecipe.ingredients || [{ section: "Ingredients", items: ["Flour, butter, spices"] }],
      instructions: editingRecipe.instructions || [{ stepNumber: 1, title: "Prepare with care", text: "Mix and enjoy." }],
      anaviSecretTip: editingRecipe.anaviSecretTip || "",
      isFavorite: editingRecipe.isFavorite ?? false,
      owner: editingRecipe.owner || "anavi",
      createdAt: editingRecipe.createdAt || new Date().toISOString(),
    };
    saveRecipe(fullItem);
    setEditingRecipe(null);
    showToast("Recipe added to Kitchen of Little Joys!");
  };

  // Artwork Save Handler
  const handleSaveArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtwork?.title || !editingArtwork?.image) return;
    const fullItem: ArtworkItem = {
      id: editingArtwork.id || `art-${Date.now()}`,
      title: editingArtwork.title,
      medium: editingArtwork.medium || "watercolor",
      mediumLabel: editingArtwork.mediumLabel || "Watercolor on Arches Paper",
      year: editingArtwork.year || "2024",
      dimensions: editingArtwork.dimensions || "30 × 40 cm",
      description: editingArtwork.description || "",
      image: editingArtwork.image,
      galleryCategory: editingArtwork.galleryCategory || "watercolors",
      paletteColors: editingArtwork.paletteColors || ["#C89B3C", "#8FA67A", "#3D2E28"],
      owner: editingArtwork.owner || "anavi",
      createdAt: editingArtwork.createdAt || new Date().toISOString(),
    };
    saveArtwork(fullItem);
    setEditingArtwork(null);
    showToast("Artwork added to Museum of Her!");
  };

  // Dream Save Handler
  const handleSaveDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDream?.title || !editingDream?.coverImage) return;
    const fullItem: DreamItem = {
      id: editingDream.id || `drm-${Date.now()}`,
      title: editingDream.title,
      category: editingDream.category || "wanderlust_travel",
      locationName: editingDream.locationName || "",
      country: editingDream.country || "",
      targetYear: editingDream.targetYear || "2025",
      status: editingDream.status || "dreaming",
      description: editingDream.description || "",
      coverImage: editingDream.coverImage,
      owner: editingDream.owner || "anavi",
      isShared: true,
      createdAt: editingDream.createdAt || new Date().toISOString(),
    };
    saveDream(fullItem);
    setEditingDream(null);
    showToast("Horizon added to Observatory of Dreams!");
  };

  return (
    <div className="pt-28 sm:pt-36 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#172D29] text-[#FDE08B] border border-[#FDE08B]/40 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-serif font-bold">{notification}</span>
        </div>
      )}

      {/* Return link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-cocoa transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Return to Garden</span>
      </Link>

      {/* Top Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-10 border transition-all mb-10 ${
          isNight
            ? "bg-[#132521]/90 backdrop-blur-md border-[#B88B4A]/40 text-[#FAF5ED]"
            : "bg-[#FCFAF6] border-gold/30 shadow-storybook text-cocoa"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-bold mb-2">
              <Settings className="w-4 h-4 text-gold" />
              <span>Sanctuary Content Architecture</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
              Storybook Content Manager
            </h1>
            <p className="font-serif italic text-gold-deep text-sm sm:text-base mt-1">
              Add, edit, inscribe, and preserve memories, recipes, poems, and dreams without touching code.
            </p>
          </div>

          {/* Active Profile & Database Status */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gold/10 border border-gold/20">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: currentUser.signatureColor }}
            />
            <div className="text-left text-xs">
              <span className="block font-serif font-bold text-cocoa">{currentUser.name}</span>
              <span className="text-[10px] text-gold font-mono uppercase">
                {isSupabaseConnected ? "Connected to Supabase" : "Local Vault Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Management Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gold/20">
        {[
          { id: "memories", label: "House of Memories", count: data.memories.length },
          { id: "goals", label: "Garden of Becoming", count: data.goals.length },
          { id: "library", label: "Library of Words", count: data.library.length },
          { id: "artworks", label: "Museum of Her", count: data.artworks.length },
          { id: "recipes", label: "Kitchen Joys", count: data.recipes.length },
          { id: "dreams", label: "Observatory Dreams", count: data.dreams.length },
          { id: "universe", label: "Our Little Universe", count: data.universeTimeline.length },
          { id: "birthday", label: "Birthday (16 Nov) 🎂", count: "Special ✨" },
          { id: "vault", label: "Vault & Backups", count: "Settings" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-[#172D29] text-[#FDE08B] font-semibold shadow-md"
                  : "bg-[#F7F2EA] text-cocoa hover:bg-gold/15"
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-mono">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MEMORIES */}
      {activeTab === "memories" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa">
              Preserved Memories & Photographic Keepsakes
            </h2>
            <button
              onClick={() =>
                setEditingMemory({
                  title: "",
                  caption: "",
                  story: "",
                  personalNote: "",
                  location: "",
                  coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
                  format: "polaroid",
                  roomTag: "memories",
                  isShared: true,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-[#172D29] font-semibold text-xs uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Inscribe Memory</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.memories.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl p-5 border border-gold/30 bg-[#FAF7F2] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden mb-3 border border-gold/20">
                    <Image src={m.coverImage} alt={m.title} fill className="object-cover" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-gold font-bold">
                    {m.format} • {m.date}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-cocoa mt-0.5">{m.title}</h3>
                  <p className="text-xs text-cocoa/70 line-clamp-2 mt-1">{m.caption}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <button
                    onClick={() => setEditingMemory(m)}
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete memory "${m.title}"?`)) {
                        deleteMemory(m.id);
                        showToast("Memory deleted.");
                      }
                    }}
                    className="p-1 text-rose-600 hover:text-rose-800"
                    title="Delete memory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GOALS */}
      {activeTab === "goals" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa">
              Garden Milestones & Botanical Intentions
            </h2>
            <button
              onClick={() =>
                setEditingGoal({
                  title: "",
                  description: "",
                  category: "personal",
                  flowerStage: "sprout",
                  progressPercent: 30,
                  targetDate: "2025-12-31",
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-[#172D29] font-semibold text-xs uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Plant Intention</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.goals.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl p-5 border border-gold/30 bg-[#FAF7F2] flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-mono uppercase text-gold font-bold">
                    Stage: {g.flowerStage} • {g.progressPercent}% Cultivated
                  </span>
                  <h3 className="font-serif text-lg font-bold text-cocoa">{g.title}</h3>
                  <p className="text-xs text-cocoa/70">{g.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingGoal(g)}
                    className="p-2 text-gold hover:text-cocoa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove goal "${g.title}"?`)) {
                        deleteGoal(g.id);
                        showToast("Goal removed.");
                      }
                    }}
                    className="p-2 text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIBRARY */}
      {activeTab === "library" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa">
              Verses, Letters & Private Journals
            </h2>
            <button
              onClick={() =>
                setEditingLibrary({
                  title: "",
                  content: "",
                  type: "poetry",
                  isPrivate: false,
                  author: "Anavi",
                  date: new Date().toISOString().split("T")[0],
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-[#172D29] font-semibold text-xs uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Inscribe Verse</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.library.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-5 border border-gold/30 bg-[#FAF7F2] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-gold mb-1">
                    <span className="uppercase">{item.type}</span>
                    {item.isPrivate && (
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        <Lock className="w-3 h-3" />
                        <span>Private Owner-Only</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-cocoa">{item.title}</h3>
                  <p className="text-xs font-serif italic text-cocoa/80 line-clamp-3 mt-2 whitespace-pre-line">
                    {item.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <button
                    onClick={() => setEditingLibrary(item)}
                    className="text-xs text-gold hover:underline font-semibold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete entry "${item.title}"?`)) {
                        deleteLibraryItem(item.id);
                        showToast("Library entry removed.");
                      }
                    }}
                    className="p-1 text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: BIRTHDAY EXPERIENCE (16 NOV) */}
      {activeTab === "birthday" && (
        <AdminBirthdayManager />
      )}

      {/* TAB 8: VAULT & SETTINGS */}
      {activeTab === "vault" && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-gold/30">
            <h3 className="font-serif text-xl font-bold text-cocoa mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-gold" />
              <span>Supabase Cloud Integration Status</span>
            </h3>
            <p className="text-xs text-cocoa/70 leading-relaxed mb-4">
              When Supabase environment variables are provided, this application syncs with your private cloud PostgreSQL tables and media buckets.
            </p>
            <div className="p-4 rounded-xl bg-gold/10 font-mono text-xs text-cocoa space-y-1">
              <div>
                Status:{" "}
                <span className={isSupabaseConnected ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {isSupabaseConnected ? "LIVE SUPABASE CLOUD CONNECTED" : "OFFLINE / LOCAL STORAGE MODE (Zero-Config Active)"}
                </span>
              </div>
              <div>Database File: <code>supabase/schema.sql</code> (Ready for deployment)</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-gold/30">
            <h3 className="font-serif text-xl font-bold text-cocoa mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-gold" />
              <span>Export &amp; Backup Storybook JSON</span>
            </h3>
            <p className="text-xs text-cocoa/70 mb-4">
              Download a complete JSON snapshot of all memories, poems, goals, artworks, and relationship milestones.
            </p>
            <button
              onClick={exportJSON}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#172D29] font-semibold text-xs uppercase"
            >
              <Download className="w-4 h-4" />
              <span>Download Storybook Backup</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-gold/30">
            <h3 className="font-serif text-xl font-bold text-cocoa mb-2 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-gold" />
              <span>Reset to High-Fidelity Demonstration Content</span>
            </h3>
            <p className="text-xs text-cocoa/70 mb-4">
              Restores the default placeholder collection designed for Anavi&apos;s World.
            </p>
            <button
              onClick={() => {
                if (confirm("Reset all storybook content to demonstration placeholders?")) {
                  resetToDemonstrationData();
                  showToast("Storybook reset to demonstration content.");
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-400 text-rose-700 hover:bg-rose-50 font-semibold text-xs uppercase"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Demonstration Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: INSCRIBE / EDIT MEMORY */}
      {editingMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveMemory}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#FAF7F2] border border-gold/40 text-cocoa shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingMemory(null)}
              className="absolute top-4 right-4 p-2 text-cocoa/50 hover:text-cocoa"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold mb-4">
              {editingMemory.id ? "Edit Preserved Memory" : "Inscribe New Memory"}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingMemory.title || ""}
                  onChange={(e) => setEditingMemory({ ...editingMemory, title: e.target.value })}
                  placeholder="e.g. Afternoon Tea by the French Window"
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Caption</label>
                <input
                  type="text"
                  value={editingMemory.caption || ""}
                  onChange={(e) => setEditingMemory({ ...editingMemory, caption: e.target.value })}
                  placeholder="A one-sentence poetic summary"
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Date</label>
                  <input
                    type="date"
                    value={editingMemory.date || ""}
                    onChange={(e) => setEditingMemory({ ...editingMemory, date: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Location</label>
                  <input
                    type="text"
                    value={editingMemory.location || ""}
                    onChange={(e) => setEditingMemory({ ...editingMemory, location: e.target.value })}
                    placeholder="e.g. The Reading Nook"
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Cover Photograph URL</label>
                <input
                  type="url"
                  required
                  value={editingMemory.coverImage || ""}
                  onChange={(e) => setEditingMemory({ ...editingMemory, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Chronicle Narrative Story</label>
                <textarea
                  rows={4}
                  value={editingMemory.story || ""}
                  onChange={(e) => setEditingMemory({ ...editingMemory, story: e.target.value })}
                  placeholder="Write the full memory story here..."
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Handwritten Personal Note</label>
                <input
                  type="text"
                  value={editingMemory.personalNote || ""}
                  onChange={(e) => setEditingMemory({ ...editingMemory, personalNote: e.target.value })}
                  placeholder="A tender marginal note"
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Display Format</label>
                  <select
                    value={editingMemory.format || "polaroid"}
                    onChange={(e) => setEditingMemory({ ...editingMemory, format: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  >
                    <option value="polaroid">Polaroid</option>
                    <option value="editorial">Editorial</option>
                    <option value="film">Film Strip</option>
                    <option value="panoramic">Panoramic</option>
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Destination Room</label>
                  <select
                    value={editingMemory.roomTag || "memories"}
                    onChange={(e) => setEditingMemory({ ...editingMemory, roomTag: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  >
                    <option value="memories">House of Memories</option>
                    <option value="garden">Garden of Becoming</option>
                    <option value="library">Library of Words</option>
                    <option value="museum">Museum of Her</option>
                    <option value="kitchen">Kitchen of Little Joys</option>
                    <option value="observatory">Observatory of Dreams</option>
                    <option value="universe">Our Little Universe</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingMemory(null)}
                className="px-4 py-2 rounded-full border border-gold/30 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gold text-[#172D29] font-bold text-xs uppercase"
              >
                Save Keepsake
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: INSCRIBE / EDIT LIBRARY */}
      {editingLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveLibrary}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#FAF7F2] border border-gold/40 text-cocoa shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingLibrary(null)}
              className="absolute top-4 right-4 p-2 text-cocoa/50 hover:text-cocoa"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold mb-4">
              {editingLibrary.id ? "Edit Literary Piece" : "Inscribe Literary Entry"}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Entry Type</label>
                  <select
                    value={editingLibrary.type || "poetry"}
                    onChange={(e) => setEditingLibrary({ ...editingLibrary, type: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  >
                    <option value="shayari">Shayari (Hindi/Urdu)</option>
                    <option value="poetry">Poetry</option>
                    <option value="story">Personal Story</option>
                    <option value="letter">Love Letter</option>
                    <option value="journal">Private Personal Journal</option>
                    <option value="quote">Favorite Quote</option>
                    <option value="book">Book Recommendation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-cocoa mb-1">Privacy Level</label>
                  <select
                    value={editingLibrary.isPrivate ? "private" : "shared"}
                    onChange={(e) => setEditingLibrary({ ...editingLibrary, isPrivate: e.target.value === "private" })}
                    className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                  >
                    <option value="shared">Shared Sanctuary (Visible to Anavi &amp; Me)</option>
                    <option value="private">Private (Author Only Privacy Protected)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingLibrary.title || ""}
                  onChange={(e) => setEditingLibrary({ ...editingLibrary, title: e.target.value })}
                  placeholder="e.g. In the Hour Before the Morning Bell"
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Content (Poem, Shayari, or Letter)</label>
                <textarea
                  rows={6}
                  required
                  value={editingLibrary.content || ""}
                  onChange={(e) => setEditingLibrary({ ...editingLibrary, content: e.target.value })}
                  placeholder="Inscribe verses here..."
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white font-serif"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-cocoa mb-1">Author / Source / Pen Name</label>
                <input
                  type="text"
                  value={editingLibrary.author || ""}
                  onChange={(e) => setEditingLibrary({ ...editingLibrary, author: e.target.value })}
                  placeholder="e.g. Anavi"
                  className="w-full p-3 rounded-xl border border-gold/30 bg-white"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingLibrary(null)}
                className="px-4 py-2 rounded-full border border-gold/30 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gold text-[#172D29] font-bold text-xs uppercase"
              >
                Save Inscription
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
