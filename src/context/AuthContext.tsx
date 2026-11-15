"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AccountRole, UserProfile } from "@/types/content";
import { INITIAL_STORYBOOK_DATA } from "@/data/initialStorybookData";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface AuthContextType {
  currentUser: UserProfile;
  role: AccountRole;
  isAuthenticated: boolean;
  isAnavi: boolean;
  isMe: boolean;
  isGuest: boolean;
  isSupabaseConnected: boolean;
  loginAs: (role: AccountRole) => void;
  signInWithSupabase: (email: string, pass: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  canViewItem: (ownerRole: AccountRole, isPrivate?: boolean) => boolean;
  canEdit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "anavis_world_active_role";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<AccountRole>("anavi"); // Default to Anavi for seamless initial experience
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check Supabase connection
    const connected = isSupabaseConfigured();
    setIsSupabaseConnected(connected);

    if (connected) {
      const supabase = createClient();
      if (supabase) {
        supabase.auth.getSession().then((res: any) => {
          const session = res?.data?.session;
          if (session?.user?.email) {
            // Determine role by email
            const email = session.user.email.toLowerCase();
            if (email.includes("anavi")) {
              setRole("anavi");
            } else {
              setRole("me");
            }
          }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event: any, session: any) => {
            if (session?.user?.email) {
              const email = session.user.email.toLowerCase();
              if (email.includes("anavi")) {
                setRole("anavi");
              } else {
                setRole("me");
              }
            } else {
              setRole("guest");
            }
          }
        );

        return () => {
          authListener?.subscription?.unsubscribe();
        };
      }
    } else {
      // Local storage fallback for account switching
      const savedRole = localStorage.getItem(AUTH_STORAGE_KEY) as AccountRole;
      if (savedRole && ["anavi", "me", "guest"].includes(savedRole)) {
        setRole(savedRole);
      }
    }
  }, []);

  const loginAs = (newRole: AccountRole) => {
    setRole(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, newRole);
    }
  };

  const signInWithSupabase = async (email: string, pass: string) => {
    if (!isSupabaseConfigured()) {
      return { error: "Supabase credentials are not yet configured in environment variables." };
    }
    const supabase = createClient();
    if (!supabase) return { error: "Supabase client initialization failed." };

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) await supabase.auth.signOut();
    }
    loginAs("guest");
  };

  const currentUser = INITIAL_STORYBOOK_DATA.profiles[role] || INITIAL_STORYBOOK_DATA.profiles.guest;

  const isAnavi = role === "anavi";
  const isMe = role === "me";
  const isGuest = role === "guest";
  const isAuthenticated = role === "anavi" || role === "me";

  // Privacy Rule:
  // If item is private (e.g. personal journals), only the exact owner role can read it!
  const canViewItem = (ownerRole: AccountRole, isPrivate: boolean = false): boolean => {
    if (!isPrivate) return true;
    return role === ownerRole;
  };

  const canEdit = (): boolean => {
    return isAuthenticated;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        isAnavi,
        isMe,
        isGuest,
        isSupabaseConnected,
        loginAs,
        signInWithSupabase,
        signOut,
        canViewItem,
        canEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
