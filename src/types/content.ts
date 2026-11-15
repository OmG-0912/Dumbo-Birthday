// Content entity type definitions for Anavi's World — The Enchanted Living Storybook

export type AccountRole = 'anavi' | 'me' | 'guest';

export interface UserProfile {
  id: string;
  role: AccountRole;
  name: string;
  avatar: string;
  bio: string;
  favoriteFlower: string;
  signatureColor: string;
}

// 1. MEMORIES & PHOTOGRAPHY
export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  story: string;
  personalNote?: string;
  date: string; // ISO date or display string
  location: string;
  locationDetails?: string;
  coverImage: string;
  images: string[];
  videoUrl?: string;
  audioRecordingUrl?: string;
  audioTitle?: string;
  roomTag: 'memories' | 'garden' | 'library' | 'museum' | 'kitchen' | 'observatory' | 'universe';
  format: 'polaroid' | 'film' | 'editorial' | 'panoramic';
  isShared: boolean;
  isFavorite?: boolean;
  owner: AccountRole;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

// 2. GOALS & MILESTONES (Garden of Becoming)
export type FlowerStage = 'seed' | 'sprout' | 'bud' | 'bloomed';
export type GoalCategory = 'personal' | 'creative' | 'career' | 'wellness' | 'together';

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  flowerStage: FlowerStage;
  targetDate: string;
  completedDate?: string;
  progressPercent: number; // 0 to 100
  reflectionNotes?: string;
  milestoneSteps: { id: string; text: string; done: boolean }[];
  isShared: boolean;
  owner: AccountRole;
  createdAt: string;
}

// 3. LITERATURE, POETRY & JOURNAL (Library of Words)
export type LibraryItemType = 'shayari' | 'poetry' | 'story' | 'letter' | 'journal' | 'quote' | 'book';
export type BookStatus = 'currently_reading' | 'completed' | 'want_to_read';

export interface LibraryItem {
  id: string;
  type: LibraryItemType;
  title: string;
  content: string; // Markdown or formatted text
  author?: string;
  sourceBook?: string;
  language?: 'english' | 'hindi' | 'urdu' | 'french';
  date: string;
  recipient?: string; // For letters (e.g. "To Anavi", "To Rohan")
  isPrivate: boolean; // TRUE for private personal journals!
  owner: AccountRole;
  bookCoverImage?: string;
  bookRating?: number; // 1 to 5
  readingStatus?: BookStatus;
  bookAuthor?: string;
  tags: string[];
  createdAt: string;
}

// 4. ARTWORK & PAINTINGS (Museum of Her)
export type ArtMedium = 'oil_canvas' | 'watercolor' | 'graphite_sketch' | 'acrylic' | 'digital_illustration' | 'mixed_media';

export interface ArtworkItem {
  id: string;
  title: string;
  medium: ArtMedium;
  mediumLabel: string;
  year: string;
  dimensions?: string;
  description: string;
  inspiration?: string;
  image: string;
  galleryCategory: 'paintings' | 'sketches' | 'watercolors' | 'digital';
  paletteColors: string[];
  owner: AccountRole;
  isFeatured?: boolean;
  createdAt: string;
}

// 5. RECIPES & CULINARY (Kitchen of Little Joys)
export type RecipeCategory = 'weekend_bake' | 'comfort_dinner' | 'sweet_indulgence' | 'beverage_alchemy' | 'quick_bites';

export interface RecipeItem {
  id: string;
  title: string;
  subtitle: string;
  category: RecipeCategory;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number | string;
  difficulty: 'delicate' | 'approachable' | 'adventurous';
  coverImage: string;
  galleryImages: string[];
  ingredients: { section?: string; items: string[] }[];
  instructions: { stepNumber: number; title?: string; text: string }[];
  anaviSecretTip?: string;
  memorableMoment?: string;
  isFavorite: boolean;
  owner: AccountRole;
  createdAt: string;
}

// 6. DREAMS & TRAVEL (Observatory of Dreams)
export type DreamCategory = 'wanderlust_travel' | 'bucket_list' | 'creative_dream' | 'cosmic_ambition';
export type DreamStatus = 'dreaming' | 'planning' | 'fulfilled';

export interface DreamItem {
  id: string;
  title: string;
  category: DreamCategory;
  locationName?: string;
  country?: string;
  coordinates?: [number, number]; // [lat, lng]
  targetYear?: string;
  status: DreamStatus;
  description: string;
  itineraryNotes?: string[];
  coverImage: string;
  constellationPosition?: { x: number; y: number }; // 2D sky projection (0-100%)
  owner: AccountRole;
  isShared: boolean;
  createdAt: string;
}

// 7. OUR LITTLE UNIVERSE (Shared Sanctuary)
export interface UniverseMilestone {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  detailedStory?: string;
  image?: string;
  category: 'first_moment' | 'special_travel' | 'sacred_promise' | 'laughter' | 'home';
  coordinatesLabel?: string;
  isMajorMilestone: boolean;
}

export interface ImportantPlace {
  id: string;
  name: string;
  nickname: string;
  significance: string;
  story: string;
  locationNote: string;
  image: string;
  favoriteMemoryDate?: string;
  visitCount?: number;
}

export interface ConstellationStar {
  id: string;
  starName: string;
  memoryTitle: string;
  quote: string;
  coordinates: { x: number; y: number; size: number };
  memoryRefId?: string;
  dateHint: string;
}

// Database / Local Store Bundle
export interface StorybookDatabase {
  profiles: Record<AccountRole, UserProfile>;
  memories: MemoryItem[];
  goals: GoalItem[];
  library: LibraryItem[];
  artworks: ArtworkItem[];
  recipes: RecipeItem[];
  dreams: DreamItem[];
  universeTimeline: UniverseMilestone[];
  importantPlaces: ImportantPlace[];
  constellationStars: ConstellationStar[];
}
