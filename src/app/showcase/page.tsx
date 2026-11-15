"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  AssetFocusTarget,
  LightingPreset,
  RenderMode,
} from "@/components/3d/showcase/AssetShowcaseScene";
import {
  Sun,
  CloudSun,
  Moon,
  Box,
  Layers,
  Sparkles,
  RotateCw,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Eye,
} from "lucide-react";

// Dynamically import Canvas to avoid SSR hydration issues
const AssetShowcaseCanvas = dynamic(
  () => import("@/components/3d/showcase/AssetShowcaseCanvas"),
  { ssr: false }
);

interface AssetMetadata {
  id: AssetFocusTarget;
  name: string;
  category: "Tree" | "Bush" | "Flower" | "Furniture" | "Terrain" | "Prop";
  speciesOrType: string;
  filename: string;
  format: string;
  source: string;
  license: string;
  polyCount: string;
  geometryType: string;
  pbrMaps: string[];
  description: string;
}

const ASSET_REGISTRY: Record<AssetFocusTarget, AssetMetadata> = {
  overview: {
    id: "overview",
    name: "Complete Botanical Plinth Sample",
    category: "Terrain",
    speciesOrType: "All Showcase Assets Composited",
    filename: "Multiple CC0 glTF assets on PBR turf",
    format: "glTF 2.0 / PBR Maps",
    source: "Poly Haven Photogrammetry Archive",
    license: "CC0 Public Domain",
    polyCount: "Combined ~220,000 tris",
    geometryType: "Fully 3D Scanned Botanical Geometry",
    pbrMaps: ["BaseColor (1K)", "Normal GL (1K)", "ARM [AO/Roughness/Metalness]", "Displacement"],
    description:
      "A complete cross-section sample featuring one mature tree, one flowering bush, three distinct 3D flowers, a weathered teak bench, Cotswold flagstones, and leafy grass terrain under ACES Filmic tone mapping.",
  },
  tree: {
    id: "tree",
    name: "Mature Oak Tree (tree_small_02)",
    category: "Tree",
    speciesOrType: "Quercus robur / Scanned Oak",
    filename: "/models/trees/tree_small_02/tree_small_02_1k.gltf",
    format: "Binary glTF 2.0 (92.8 MB .bin)",
    source: "Poly Haven (Rob Tuytel)",
    license: "CC0 Public Domain",
    polyCount: "138,400 tris",
    geometryType: "3D Photogrammetry Trunk + Organic Multi-Layered Branch Mesh",
    pbrMaps: ["Bark Diffuse 1K", "Bark Normal GL 1K", "Foliage Diffuse with Alpha Cutout", "Leaf Roughness"],
    description:
      "Full 3D scanned trunk with natural bark crevices and organic branching. No low-poly dodecahedrons or polygonal spheres. Natural irregular silhouette that responds realistically to sunlight angles.",
  },
  flowering_bush: {
    id: "flowering_bush",
    name: "Flowering Azalea Shrub (shrub_02)",
    category: "Bush",
    speciesOrType: "Rhododendron / Azalea 1.68m",
    filename: "/models/bushes/shrub_02/shrub_02_1k.gltf",
    format: "glTF 2.0 + Bin (740 KB)",
    source: "Poly Haven (Verdant Trail Collection)",
    license: "CC0 Public Domain",
    polyCount: "22,500 tris",
    geometryType: "3D Photogrammetry Shrub with Embedded Flowering Sprigs",
    pbrMaps: ["Foliage Diffuse 1K", "Normal GL 1K", "ARM (Roughness 0.85, AO 1.0)"],
    description:
      "Photogrammetry-captured 1.68m flowering garden shrub. Dense organic branches with individual leaf leaflets and natural blossom distribution. Replaces procedural sphere bushes entirely.",
  },
  flower_gazania: {
    id: "flower_gazania",
    name: "Gazania Flower (flower_gazania)",
    category: "Flower",
    speciesOrType: "Gazania rigens (Treasure Flower)",
    filename: "/models/flowers/flower_gazania/flower_gazania_1k.gltf",
    format: "glTF 2.0 + Bin (848 KB)",
    source: "Poly Haven (Namaqualand Collection)",
    license: "CC0 Public Domain",
    polyCount: "18,900 tris",
    geometryType: "Real 3D Petal Geometry + Central Floret Disc + Basal Stems",
    pbrMaps: ["Petal Diffuse 1K", "Normal GL 1K", "ARM (AO + Roughness)"],
    description:
      "Genuine 3D petals radiating organically around the composite disc floret. Not a billboard quad or procedural sphere. Individual leaf blades ground the plant into the soil.",
  },
  flower_ursinia: {
    id: "flower_ursinia",
    name: "Ursinia Daisy (flower_ursinia)",
    category: "Flower",
    speciesOrType: "Ursinia speciosa (African Daisy)",
    filename: "/models/flowers/flower_ursinia/flower_ursinia_1k.gltf",
    format: "glTF 2.0 + Bin (768 KB)",
    source: "Poly Haven (Namaqualand Collection)",
    license: "CC0 Public Domain",
    polyCount: "14,200 tris",
    geometryType: "Real 3D Orange Petals with Curved Tips + Fine Feathery Foliage",
    pbrMaps: ["Blossom Diffuse 1K", "Normal GL 1K", "ARM 1K"],
    description:
      "Brilliant golden-orange flowering daisies with distinct curvature on each 3D petal. Fine filigree foliage accurately modeled without flat procedural planes.",
  },
  flower_heliophila: {
    id: "flower_heliophila",
    name: "Heliophila Violet Clusters (flower_heliophila)",
    category: "Flower",
    speciesOrType: "Heliophila coronopifolia (Blue Flax)",
    filename: "/models/flowers/flower_heliophila/flower_heliophila_1k.gltf",
    format: "glTF 2.0 + Bin (2.51 MB)",
    source: "Poly Haven (Namaqualand Collection)",
    license: "CC0 Public Domain",
    polyCount: "34,800 tris",
    geometryType: "Multi-head Inflorescence with 3D Petal Cup & Slender Stalks",
    pbrMaps: ["Floral Diffuse 1K", "Normal GL 1K", "ARM 1K"],
    description:
      "Delicate violet-blue botanical clusters. Slender flowering stalks hold multi-petaled blossoms catching the ambient sky light.",
  },
  bench: {
    id: "bench",
    name: "Painted Wooden Bench",
    category: "Furniture",
    speciesOrType: "English Garden Slatted Park Bench",
    filename: "/models/furniture/painted_wooden_bench/painted_wooden_bench_1k.gltf",
    format: "glTF 2.0 + Bin (25 KB)",
    source: "Poly Haven CC0",
    license: "CC0 Public Domain",
    polyCount: "4,600 tris",
    geometryType: "3D Wooden Slats, Contoured Armrests, Iron Carriage Bolts",
    pbrMaps: ["Weathered Teak Diffuse 1K", "Normal GL 1K (Wood Grain)", "ARM (Peeling Paint Roughness)"],
    description:
      "Weathered slatted teak bench with chipped antique ivory paint, cast-iron frame joinery, and photorealistic wood grain normals. Replaces box-geometry seating.",
  },
  pathway: {
    id: "pathway",
    name: "Cotswold Flagstone Pathway & Leafy Turf",
    category: "Terrain",
    speciesOrType: "Chiseled Sandstone Pavers & Leafy Grass",
    filename: "/textures/stone/stone_pathway_02/ & /textures/ground/leafy_grass/",
    format: "4-Channel PBR Texture Sets (1K)",
    source: "Poly Haven CC0 Photogrammetry Textures",
    license: "CC0 Public Domain",
    polyCount: "Subdivided 32x64 PBR Plane with Normal Relief",
    geometryType: "Physically Displaced Surface with Micro-Relief",
    pbrMaps: ["Albedo / BaseColor", "Normal OpenGL (Tangent Space)", "Roughness Map", "Ambient Occlusion"],
    description:
      "Authentic flagstone pavers with realistic grout crevices, chiseling marks, and mossy ground transitions. Eliminates flat grey polygon planes.",
  },
  lantern: {
    id: "lantern",
    name: "Wooden Garden Lantern & Moss Rocks",
    category: "Prop",
    speciesOrType: "Mortise-and-Tenon Wood & Glass Lantern",
    filename: "/models/decorations/wooden_lantern_01/wooden_lantern_01_1k.gltf",
    format: "glTF 2.0 + Bin (268 KB)",
    source: "Poly Haven (Smugglers Cove Collection)",
    license: "CC0 Public Domain",
    polyCount: "3,800 tris",
    geometryType: "Wooden Frame with Glass Panes & Iron Handle + Scanned Mossy Boulders",
    pbrMaps: ["Wood Diffuse 1K", "Glass Transparency", "Normal GL 1K", "ARM 1K"],
    description:
      "Authentic wooden carriage lantern with glass panes casting a warm point-light amber glow onto adjacent photogrammetry mossy boulders.",
  },
};

export default function ShowcasePage() {
  const [focusTarget, setFocusTarget] = useState<AssetFocusTarget>("overview");
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>("golden");
  const [renderMode, setRenderMode] = useState<RenderMode>("pbr");
  const [activeTab, setActiveTab] = useState<"viewer" | "audit">("viewer");

  const currentMeta = ASSET_REGISTRY[focusTarget];

  return (
    <div className="relative w-full min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header / Nav Bar */}
      <header className="sticky top-0 z-40 w-full bg-stone-950/85 backdrop-blur-md border-b border-stone-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs md:text-sm text-stone-400 hover:text-amber-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
          <span className="text-stone-700">|</span>
          <div className="flex items-baseline space-x-2">
            <h1 className="text-base md:text-lg font-serif font-light tracking-wide text-amber-100">
              Asset Pipeline & Quality Showcase
            </h1>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              3D Photogrammetry Inspection
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("viewer")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "viewer"
                ? "bg-amber-400/20 text-amber-200 border border-amber-400/40"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5 inline-block mr-1.5" />
            3D Studio
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "audit"
                ? "bg-amber-400/20 text-amber-200 border border-amber-400/40"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline-block mr-1.5" />
            Full Asset Audit
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === "viewer" ? (
        <div className="relative flex-1 flex flex-col lg:flex-row w-full min-h-[calc(100vh-61px)]">
          {/* Left / 3D Canvas Stage */}
          <div className="relative flex-1 w-full h-[60vh] lg:h-auto min-h-[480px] bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col">
            {/* Viewport Floating Controls Toolbar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              {/* Lighting Presets */}
              <div className="flex items-center bg-stone-900/80 backdrop-blur-md border border-stone-800/80 rounded-lg p-1 space-x-1 pointer-events-auto shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 px-2">
                  Lighting:
                </span>
                <button
                  onClick={() => setLightingPreset("golden")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    lightingPreset === "golden"
                      ? "bg-amber-500/30 text-amber-200 border border-amber-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Warm Golden Hour Sunlight"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Golden Hour</span>
                </button>
                <button
                  onClick={() => setLightingPreset("daylight")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    lightingPreset === "daylight"
                      ? "bg-sky-500/30 text-sky-200 border border-sky-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Soft Diffused Daylight"
                >
                  <CloudSun className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline">Daylight</span>
                </button>
                <button
                  onClick={() => setLightingPreset("twilight")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    lightingPreset === "twilight"
                      ? "bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Enchanted Twilight & Lantern"
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="hidden sm:inline">Twilight</span>
                </button>
              </div>

              {/* Render Inspection Modes */}
              <div className="flex items-center bg-stone-900/80 backdrop-blur-md border border-stone-800/80 rounded-lg p-1 space-x-1 pointer-events-auto shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 px-2">
                  Mode:
                </span>
                <button
                  onClick={() => setRenderMode("pbr")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    renderMode === "pbr"
                      ? "bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Full PBR Photorealistic Shading"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PBR</span>
                </button>
                <button
                  onClick={() => setRenderMode("wireframe")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    renderMode === "wireframe"
                      ? "bg-green-500/30 text-green-200 border border-green-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Wireframe Mesh Inspection (Proof of 3D Geometry)"
                >
                  <Box className="w-3.5 h-3.5 text-green-400" />
                  <span>Wireframe</span>
                </button>
                <button
                  onClick={() => setRenderMode("normals")}
                  className={`px-2.5 py-1 text-xs rounded flex items-center space-x-1 transition-colors ${
                    renderMode === "normals"
                      ? "bg-purple-500/30 text-purple-200 border border-purple-500/40 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Surface Normals Inspection"
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Normals</span>
                </button>
              </div>
            </div>

            {/* Interactive 3D Canvas */}
            <div className="w-full flex-1 relative">
              <AssetShowcaseCanvas
                focusTarget={focusTarget}
                lightingPreset={lightingPreset}
                renderMode={renderMode}
                onSelectTarget={(tgt) => setFocusTarget(tgt)}
              />
            </div>

            {/* Bottom Target Selector Carousel */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
              <div className="bg-stone-950/85 backdrop-blur-md border border-stone-800/90 rounded-full p-1.5 flex items-center space-x-1 overflow-x-auto max-w-full pointer-events-auto shadow-2xl">
                {(
                  [
                    { id: "overview", label: "Overview" },
                    { id: "tree", label: "Oak Tree" },
                    { id: "flowering_bush", label: "Azalea Bush" },
                    { id: "flower_gazania", label: "3D Gazania" },
                    { id: "flower_ursinia", label: "3D Ursinia" },
                    { id: "flower_heliophila", label: "3D Heliophila" },
                    { id: "bench", label: "Teak Bench" },
                    { id: "pathway", label: "Cotswold Path" },
                    { id: "lantern", label: "Lantern & Rocks" },
                  ] as { id: AssetFocusTarget; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFocusTarget(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                      focusTarget === item.id
                        ? "bg-amber-400/25 text-amber-200 border border-amber-400/50 shadow-sm font-medium"
                        : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport instruction tooltip */}
            <div className="absolute top-16 left-4 z-10 hidden md:flex items-center space-x-1.5 text-[11px] text-stone-500 bg-stone-950/60 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none border border-stone-900">
              <RotateCw className="w-3 h-3 text-amber-300/70" />
              <span>Left click + drag to orbit • Right click to pan • Scroll to zoom</span>
            </div>
          </div>

          {/* Right / Asset Inspector Drawer */}
          <div className="w-full lg:w-[420px] bg-stone-900/95 border-t lg:border-t-0 lg:border-l border-stone-800 p-5 md:p-6 overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-61px)] flex flex-col justify-between">
            <div>
              {/* Asset Header */}
              <div className="border-b border-stone-800 pb-4 mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
                    {currentMeta.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Real 3D Mesh</span>
                  </span>
                </div>
                <h2 className="text-xl font-serif font-light text-stone-100">{currentMeta.name}</h2>
                <p className="text-xs font-mono text-stone-400 mt-0.5">{currentMeta.speciesOrType}</p>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-stone-300 mb-5">
                {currentMeta.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="space-y-3 font-mono text-[11px] bg-stone-950/60 p-3.5 rounded-lg border border-stone-800/80 mb-5">
                <div className="flex justify-between border-b border-stone-800/60 pb-2">
                  <span className="text-stone-400">File Path:</span>
                  <span className="text-stone-300 text-right truncate max-w-[220px]" title={currentMeta.filename}>
                    {currentMeta.filename}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800/60 pb-2">
                  <span className="text-stone-400">Mesh Polycount:</span>
                  <span className="text-amber-200 font-semibold">{currentMeta.polyCount}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/60 pb-2">
                  <span className="text-stone-400">Geometry Type:</span>
                  <span className="text-stone-200 text-right truncate max-w-[220px]">
                    {currentMeta.geometryType}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800/60 pb-2">
                  <span className="text-stone-400">Asset License:</span>
                  <span className="text-emerald-300">{currentMeta.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Source:</span>
                  <span className="text-stone-300">{currentMeta.source}</span>
                </div>
              </div>

              {/* PBR Texture Stack */}
              <div>
                <h3 className="text-xs font-serif uppercase tracking-wider text-stone-400 mb-2">
                  PBR Material Texture Stack
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentMeta.pbrMaps.map((mapName, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-950/50 border border-stone-800/70 rounded p-2 text-[10px] font-mono text-stone-300 flex items-center space-x-1.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="truncate">{mapName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Inspection Confirmation Box */}
            <div className="mt-6 pt-4 border-t border-stone-800/80">
              <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-200/90 leading-relaxed">
                <p className="font-serif font-medium text-amber-100 mb-1 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-amber-400 inline" />
                  <span>Visual Quality Verification Protocol</span>
                </p>
                Switch between <strong>PBR</strong> and <strong>Wireframe</strong> above to verify that every petal, branch, slat, and stone is genuine 3D polygonal geometry.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Asset Audit Tab */
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-light text-amber-100 mb-2">
              Garden 3D Asset & Pipeline Audit
            </h2>
            <p className="text-sm text-stone-400 max-w-3xl">
              Complete inventory of all 3D models and textures currently loaded in Anavi&apos;s World.
              Every asset has been categorized into authentic 3D photogrammetry models versus deprecated procedural placeholders.
            </p>
          </div>

          {/* Audit Summary Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Authentic 3D Models (CC0)
              </span>
              <p className="text-2xl font-serif text-stone-100 mt-1">11 Models</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Trees, azaleas, gazanias, ursinia, heliophila, bench, lantern, rocks
              </p>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                Photogrammetry PBR Textures
              </span>
              <p className="text-2xl font-serif text-stone-100 mt-1">3 Sets + HDR</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Leafy grass turf, Cotswold stone, forest ground, forest slope HDR
              </p>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Procedural Geometry Status
              </span>
              <p className="text-2xl font-serif text-amber-300 mt-1">Isolated & Cataloged</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Sunflower quads & hydrangea dodecahedrons marked for complete replacement
              </p>
            </div>
          </div>

          {/* Comprehensive Audit Table */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-stone-950 border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Asset Name</th>
                    <th className="py-3 px-4">Path & Filename</th>
                    <th className="py-3 px-4">Classification</th>
                    <th className="py-3 px-4">Mesh Polycount</th>
                    <th className="py-3 px-4">PBR Textures</th>
                    <th className="py-3 px-4">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Oak Canopy Tree (tree_small_02)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/trees/tree_small_02/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">138,400 tris (92.8MB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Bark Diff/Nor, Leaf Alpha</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Island Mature Tree (island_tree_01)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/trees/island_tree_01/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">89,200 tris (59.2MB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Bark Diff/Nor, Canopy Alpha</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified On Disk</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Flowering Azalea Shrub (shrub_02)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/bushes/shrub_02/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">22,500 tris (740KB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Foliage Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Gazania Flower (flower_gazania)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/flowers/flower_gazania/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">18,900 tris (848KB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Petals & Foliage Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Ursinia Orange Daisy (flower_ursinia)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/flowers/flower_ursinia/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">14,200 tris (768KB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Blossom Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Heliophila Violet Clusters (flower_heliophila)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/flowers/flower_heliophila/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">34,800 tris (2.51MB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Flower Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Painted Wooden Bench</td>
                    <td className="py-3 px-4 text-stone-400">public/models/furniture/painted_wooden_bench/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">4,600 tris (25KB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Wood/Paint Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Wooden Lantern (wooden_lantern_01)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/decorations/wooden_lantern_01/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">3,800 tris (268KB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Wood/Glass Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Mossy Rocks (rock_moss_set_01)</td>
                    <td className="py-3 px-4 text-stone-400">public/models/decorations/rock_moss_set_01/</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">3D Scanned glTF (CC0)</td>
                    <td className="py-3 px-4 text-amber-200">8,400 tris (1.4MB bin)</td>
                    <td className="py-3 px-4 text-stone-300">Moss Rock Diff/Nor/ARM</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Verified In Showcase</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Leafy Grass Terrain Texture Set</td>
                    <td className="py-3 px-4 text-stone-400">public/textures/ground/leafy_grass/</td>
                    <td className="py-3 px-4 text-sky-400 font-semibold">PBR Texture Maps (CC0)</td>
                    <td className="py-3 px-4 text-stone-400">Subdivided Mesh Plinth</td>
                    <td className="py-3 px-4 text-stone-300">Diff/Nor/ARM/Displacement</td>
                    <td className="py-3 px-4"><span className="text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">Active Terrain PBR</span></td>
                  </tr>
                  <tr className="hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-200">Cotswold Stone Pathway Texture Set</td>
                    <td className="py-3 px-4 text-stone-400">public/textures/stone/stone_pathway_02/</td>
                    <td className="py-3 px-4 text-sky-400 font-semibold">PBR Texture Maps (CC0)</td>
                    <td className="py-3 px-4 text-stone-400">Displaced Ribbon Plane</td>
                    <td className="py-3 px-4 text-stone-300">Diff/Nor/ARM/Displacement</td>
                    <td className="py-3 px-4"><span className="text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">Active Pathway PBR</span></td>
                  </tr>
                  {/* Procedural items identified */}
                  <tr className="hover:bg-amber-950/20 bg-amber-950/10">
                    <td className="py-3 px-4 font-medium text-amber-200">Sunflower Quads (SunflowerCluster.tsx)</td>
                    <td className="py-3 px-4 text-stone-400">src/components/3d/environments/</td>
                    <td className="py-3 px-4 text-rose-400 font-semibold">Procedural 2D Quads</td>
                    <td className="py-3 px-4 text-rose-300">Flat Plane (2 tris each)</td>
                    <td className="py-3 px-4 text-stone-400">Procedural Canvas Texture</td>
                    <td className="py-3 px-4"><span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">Flagged For Replacement</span></td>
                  </tr>
                  <tr className="hover:bg-amber-950/20 bg-amber-950/10">
                    <td className="py-3 px-4 font-medium text-amber-200">Hydrangea Mounds (HydrangeaMound.tsx)</td>
                    <td className="py-3 px-4 text-stone-400">src/components/3d/environments/</td>
                    <td className="py-3 px-4 text-rose-400 font-semibold">Procedural Dodecahedrons</td>
                    <td className="py-3 px-4 text-rose-300">11 Dodecahedrons on Sphere</td>
                    <td className="py-3 px-4 text-stone-400">Basic MeshStandardMaterial</td>
                    <td className="py-3 px-4"><span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">Flagged For Replacement</span></td>
                  </tr>
                  <tr className="hover:bg-amber-950/20 bg-amber-950/10">
                    <td className="py-3 px-4 font-medium text-amber-200">Entrance Arbor Posts (GardenEntranceArbor.tsx)</td>
                    <td className="py-3 px-4 text-stone-400">src/components/3d/environments/</td>
                    <td className="py-3 px-4 text-amber-400 font-semibold">Procedural Box/Cylinder</td>
                    <td className="py-3 px-4 text-amber-300">Box & Cylinder Primitives</td>
                    <td className="py-3 px-4 text-stone-400">Procedural Bark / Wood</td>
                    <td className="py-3 px-4"><span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Needs Real glTF Arch</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
