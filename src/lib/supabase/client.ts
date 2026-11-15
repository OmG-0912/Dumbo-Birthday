import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "./config";

export type TypedSupabaseClient = ReturnType<typeof createBrowserClient>;

let browserClient: TypedSupabaseClient | null = null;

export const createClient = (): TypedSupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (browserClient) return browserClient;

  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return browserClient;
};
