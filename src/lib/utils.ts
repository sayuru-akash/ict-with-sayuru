import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const tgsCallbacks: Array<() => void> = [];
let tgsState: "idle" | "loading" | "ready" = "idle";

export function loadTgsPlayer(callback: () => void) {
  if (typeof window === "undefined") return;
  if (tgsState === "ready") {
    callback();
    return;
  }
  tgsCallbacks.push(callback);
  if (tgsState === "loading") return;
  tgsState = "loading";
  const script = document.createElement("script");
  script.src = "/lib/tgs-player.js";
  script.async = true;
  script.onload = () => {
    tgsState = "ready";
    for (const cb of tgsCallbacks) cb();
    tgsCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA_QUERY);
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export function useInViewObserver<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "100px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
