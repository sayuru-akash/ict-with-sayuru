"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import {
  API_BASE_URL,
  apiFetch,
  clearApiCache,
  clearToken,
  getToken,
  setToken,
} from "@/lib/api";
import { cn, loadTgsPlayer } from "@/lib/utils";

const CACHE_KEYS = ["pa:classes-cache", "pa:my-classes-cache"];
const WORKBOX_PREFIX = "workbox-precache";

export async function clearClientStorage() {
  if (typeof window === "undefined") return;
  clearToken();
  clearApiCache();
  try {
    for (const key of CACHE_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {}
  try {
    window.sessionStorage.clear();
  } catch {}
  try {
    if ("caches" in window) {
      const keys = await window.caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(WORKBOX_PREFIX))
          .map((k) => window.caches.delete(k))
      );
    }
  } catch {}
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: AuthUser | null;
  status: "loading" | "guest" | "authed";
  login: () => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  completeLogin: (token: string, user?: AuthUser | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<"loading" | "guest" | "authed">("loading");
  const router = useRouter();

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setStatus("guest");
      return;
    }
    try {
      const { user: fetchedUser } = await apiFetch<{ user: AuthUser }>("/api/auth/me");
      setUser(fetchedUser);
      setStatus("authed");
    } catch {
      clearToken();
      setUser(null);
      setStatus("guest");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(() => {
    if (!API_BASE_URL) {
      toast.info("Student portal coming soon", { description: "Please contact Sayuru for online class registration." });
      return;
    }
    window.location.href = `${API_BASE_URL}/auth/google`;
  }, []);

  const completeLogin = useCallback(
    async (token: string, nextUser?: AuthUser | null) => {
      clearApiCache();
      setToken(token);
      if (nextUser) {
        setUser(nextUser);
        setStatus("authed");
        return;
      }
      await refresh();
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {}
    await clearClientStorage();
    setUser(null);
    setStatus("guest");
    toast.success("Logged out");
    router.replace("/");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      status,
      login,
      logout,
      refresh,
      completeLogin,
    }),
    [user, status, login, logout, refresh, completeLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function GoogleLogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

interface LoginButtonProps {
  className?: string;
  text?: string;
  showArrow?: boolean;
  showGoogleIcon?: boolean;
  ariaLabel?: string;
}

export function LoginButton({
  className = "",
  text = "Login",
  showArrow = false,
  showGoogleIcon = false,
  ariaLabel,
}: LoginButtonProps) {
  const { login } = useAuth();
  return (
    <button
      type="button"
      onClick={login}
      className={cn(
        "group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className
      )}
      aria-label={ariaLabel ?? text}
    >
      <span className="relative flex items-center justify-center gap-2">
        {showGoogleIcon && (
          <GoogleLogoIcon className="h-5 w-5 flex-shrink-0 rounded-full bg-white p-0.5" />
        )}
        {text}
        {showArrow && (
          <ChevronRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
    </button>
  );
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  cancelled: "Sign-in was cancelled. Please try again.",
  failed: "Something went wrong signing you in. Please try again.",
  disabled: "Your account is disabled. Contact support for help.",
};

export function AuthQueryHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get("auth");
    if (authParam && AUTH_ERROR_MESSAGES[authParam]) {
      toast.error(AUTH_ERROR_MESSAGES[authParam]);
      params.delete("auth");
      const query = params.toString();
      window.history.replaceState(
        {},
        "",
        window.location.pathname + (query ? `?${query}` : "")
      );
    }
  }, []);
  return null;
}

export function PageLoader({
  label = "Loading",
  src = "/animations/study.tgs",
  fullScreen = false,
}: {
  label?: string;
  src?: string;
  fullScreen?: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTgsPlayer(() => setReady(true));
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 animate-route-fade-in ${
        fullScreen ? "min-h-dvh bg-white" : "h-full"
      }`}
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        <div
          className={`absolute transition-opacity duration-300 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        </div>
        <div
          className={`absolute transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <tgs-player
            key={src}
            autoplay
            loop
            mode="normal"
            src={src}
            style={{ width: "176px", height: "176px" }}
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-400">{label}...</p>
    </div>
  );
}
