export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const TOKEN_KEY = "sayuru_token";

export function getToken(): string | null {
  return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearToken(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

const CACHE_TTL = 60_000;
const responseCache = new Map<string, { expiry: number; promise: Promise<unknown> }>();

export function clearApiCache(key?: string): void {
  if (key) {
    responseCache.delete(key);
  } else {
    responseCache.clear();
  }
}

function reportClientError(message: string, url?: string): void {
  if (typeof window === "undefined" || !API_BASE_URL) return;
  try {
    const token = getToken();
    fetch(`${API_BASE_URL}/api/client-errors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, url: url ?? window.location.href }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

async function rawRequest<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) throw new ApiError(503, "Student portal is not available yet.");
  const token = getToken();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  } catch (err) {
    const isAbort = err instanceof DOMException && err.name === "AbortError";
    reportClientError(
      `network error: ${(init.method ?? "GET").toUpperCase()} ${path} - ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    throw new ApiError(
      0,
      isAbort
        ? "Request timed out. Please check your connection and try again."
        : "Connection problem. Please check your internet and try again."
    );
  }

  let parsed: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!response.ok) {
    const msg =
      (parsed && typeof parsed === "object" && "message" in parsed
        ? String((parsed as { message: unknown }).message)
        : null) ?? `Request failed (${response.status})`;
    throw new ApiError(response.status, msg);
  }

  return parsed as T;
}

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  if ((init.method ?? "GET").toUpperCase() !== "GET") {
    clearApiCache();
    return rawRequest<T>(path, init);
  }
  const cached = responseCache.get(path);
  if (cached && cached.expiry > Date.now()) {
    return cached.promise as Promise<T>;
  }
  const promise = rawRequest<T>(path, init).catch((err) => {
    responseCache.delete(path);
    throw err;
  });
  responseCache.set(path, { expiry: Date.now() + CACHE_TTL, promise });
  return promise;
}
