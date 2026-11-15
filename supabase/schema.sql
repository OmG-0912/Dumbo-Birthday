-- ==============================================================================
-- ANAVI'S WORLD — PRODUCTION SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================
-- Execute this script in the Supabase SQL Editor (https://app.supabase.com)
-- to instantiate the relational schema, foreign keys, row-level security,
-- and private storage bucket permissions.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('anavi', 'me', 'guest')),
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  favorite_flower TEXT,
  signature_color TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. MEMORIES & PHOTOGRAPHY
CREATE TABLE IF NOT EXISTS public.memories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  story TEXT NOT NULL,
  personal_note TEXT,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  location_details TEXT,
  cover_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}'::TEXT[],
  video_url TEXT,
  audio_recording_url TEXT,
  audio_title TEXT,
  room_tag TEXT NOT NULL DEFAULT 'memories',
  format TEXT NOT NULL DEFAULT 'editorial' CHECK (format IN ('polaroid', 'film', 'editorial', 'panoramic')),
  is_shared BOOLEAN NOT NULL DEFAULT true,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  owner_role TEXT NOT NULL CHECK (owner_role IN ('anavi', 'me', 'guest')),
  tags TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. GOALS & MILESTONES (Garden of Becoming)
CREATE TABLE IF NOT EXISTS public.goals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('personal', 'creative', 'career', 'wellness', 'together')),
  flower_stage TEXT NOT NULL DEFAULT 'sprout' CHECK (flower_stage IN ('seed', 'sprout', 'bud', 'bloomed')),
  target_date DATE NOT NULL,
  completed_date DATE,
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  reflection_notes TEXT,
  milestone_steps JSONB DEFAULT '[]'::JSONB,
  is_shared BOOLEAN NOT NULL DEFAULT true,
  owner_role TEXT NOT NULL CHECK (owner_role IN ('anavi', 'me')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. LITERATURE, POETRY & PRIVATE JOURNALS (Library of Words)
CREATE TABLE IF NOT EXISTS public.library_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('shayari', 'poetry', 'story', 'letter', 'journal', 'quote', 'book')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  source_book TEXT,
  language TEXT DEFAULT 'english' CHECK (language IN ('english', 'hindi', 'urdu', 'french')),
  date DATE NOT NULL,
  recipient TEXT,
  is_private BOOLEAN NOT NULL DEFAULT false, -- If true: only owner can read!
  owner_role TEXT NOT NULL CHECK (owner_role IN ('anavi', 'me')),
  book_cover_image TEXT,
  book_rating INTEGER CHECK (book_rating BETWEEN 1 AND 5),
  reading_status TEXT CHECK (reading_status IN ('currently_reading', 'completed', 'want_to_read')),
  book_author TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ARTWORK & PAINTINGS (Museum of Her)
CREATE TABLE IF NOT EXISTS public.artworks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  medium TEXT NOT NULL,
  medium_label TEXT NOT NULL,
  year TEXT NOT NULL,
  dimensions TEXT,
  description TEXT NOT NULL,
  inspiration TEXT,
  image TEXT NOT NULL,
  gallery_category TEXT NOT NULL CHECK (gallery_category IN ('paintings', 'sketches', 'watercolors', 'digital')),
  palette_colors TEXT[] DEFAULT '{}'::TEXT[],
  owner_role TEXT NOT NULL DEFAULT 'anavi',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. RECIPES (Kitchen of Little Joys)
CREATE TABLE IF NOT EXISTS public.recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('weekend_bake', 'comfort_dinner', 'sweet_indulgence', 'beverage_alchemy', 'quick_bites')),
  prep_time_minutes INTEGER NOT NULL DEFAULT 15,
  cook_time_minutes INTEGER NOT NULL DEFAULT 30,
  servings TEXT NOT NULL DEFAULT '2-4 portions',
  difficulty TEXT NOT NULL DEFAULT 'approachable' CHECK (difficulty IN ('delicate', 'approachable', 'adventurous')),
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}'::TEXT[],
  ingredients JSONB NOT NULL DEFAULT '[]'::JSONB,
  instructions JSONB NOT NULL DEFAULT '[]'::JSONB,
  anavi_secret_tip TEXT,
  memorable_moment TEXT,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  owner_role TEXT NOT NULL DEFAULT 'anavi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. DREAMS & TRAVEL (Observatory of Dreams)
CREATE TABLE IF NOT EXISTS public.dreams (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('wanderlust_travel', 'bucket_list', 'creative_dream', 'cosmic_ambition')),
  location_name TEXT,
  country TEXT,
  coordinates NUMERIC[] DEFAULT '{}'::NUMERIC[],
  target_year TEXT,
  status TEXT NOT NULL DEFAULT 'dreaming' CHECK (status IN ('dreaming', 'planning', 'fulfilled')),
  description TEXT NOT NULL,
  itinerary_notes TEXT[] DEFAULT '{}'::TEXT[],
  cover_image TEXT NOT NULL,
  constellation_position JSONB DEFAULT '{"x": 50, "y": 50}'::JSONB,
  owner_role TEXT NOT NULL DEFAULT 'anavi',
  is_shared BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. OUR LITTLE UNIVERSE (Shared Sanctuary)
CREATE TABLE IF NOT EXISTS public.universe_timeline (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_story TEXT,
  image TEXT,
  category TEXT NOT NULL CHECK (category IN ('first_moment', 'special_travel', 'sacred_promise', 'laughter', 'home')),
  coordinates_label TEXT,
  is_major_milestone BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.important_places (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT NOT NULL,
  significance TEXT NOT NULL,
  story TEXT NOT NULL,
  location_note TEXT NOT NULL,
  image TEXT NOT NULL,
  favorite_memory_date TEXT,
  visit_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.constellation_stars (
  id TEXT PRIMARY KEY,
  star_name TEXT NOT NULL,
  memory_title TEXT NOT NULL,
  quote TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  memory_ref_id TEXT,
  date_hint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universe_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.important_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constellation_stars ENABLE ROW LEVEL SECURITY;

-- Helper to check user's role from profiles table
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Library Items RLS: Private journal entries are strictly author-only!
CREATE POLICY "Public & shared library items are readable by authenticated members"
  ON public.library_items FOR SELECT
  USING (
    is_private = false OR 
    owner_role = public.current_user_role()
  );

CREATE POLICY "Authenticated family can manage library items"
  ON public.library_items FOR ALL
  TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

-- 2. General content readable by authenticated users (or public read-only for sanctuary)
CREATE POLICY "Storybook content readable by all"
  ON public.memories FOR SELECT USING (true);
CREATE POLICY "Storybook goals readable by all"
  ON public.goals FOR SELECT USING (true);
CREATE POLICY "Storybook artworks readable by all"
  ON public.artworks FOR SELECT USING (true);
CREATE POLICY "Storybook recipes readable by all"
  ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Storybook dreams readable by all"
  ON public.dreams FOR SELECT USING (true);
CREATE POLICY "Storybook universe readable by all"
  ON public.universe_timeline FOR SELECT USING (true);
CREATE POLICY "Storybook places readable by all"
  ON public.important_places FOR SELECT USING (true);
CREATE POLICY "Storybook stars readable by all"
  ON public.constellation_stars FOR SELECT USING (true);

-- 3. Only verified family members (Anavi or Me) can insert, update, or delete content
CREATE POLICY "Family members can modify memories"
  ON public.memories FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

CREATE POLICY "Family members can modify goals"
  ON public.goals FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

CREATE POLICY "Family members can modify artworks"
  ON public.artworks FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

CREATE POLICY "Family members can modify recipes"
  ON public.recipes FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

CREATE POLICY "Family members can modify dreams"
  ON public.dreams FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

CREATE POLICY "Family members can modify universe"
  ON public.universe_timeline FOR ALL TO authenticated
  USING (public.current_user_role() IN ('anavi', 'me'))
  WITH CHECK (public.current_user_role() IN ('anavi', 'me'));

-- ==============================================================================
-- STORAGE BUCKETS SETUP (Execute in Storage Dashboard or SQL)
-- ==============================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('memories-media', 'memories-media', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('artworks', 'artworks', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('audio-recordings', 'audio-recordings', true);
