// Supabase configuration detection helper

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    anonKey &&
    url.startsWith("https://") &&
    anonKey.length > 20 &&
    !url.includes("your-project")
  );
};

export const getSupabaseCredentials = () => {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    isConfigured: isSupabaseConfigured(),
  };
};
