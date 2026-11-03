"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { LoginButton } from "@/context/AuthContext";
import { useIsDesktop } from "@/lib/utils";

export function useSmoothHashClick() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname === "/") {
        lenis?.scrollTo(href);
      } else {
        router.push(`/${href}`);
      }
    }
  };
}

const NAV_ITEMS = [
  { href: "#about-teacher", label: "About" },
  { href: "#programmes", label: "Programmes" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#flow", label: "Online Classes" },
  { href: "#faqs", label: "FAQs" },
];

export function Navbar() {
  const handleHashClick = useSmoothHashClick();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState("");
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });
  const isDesktop = useIsDesktop();
  const scrolledBg = isDesktop
    ? "rgba(255,255,255,0.75)"
    : "rgba(255,255,255,0.95)";
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1));
    const visibleSet = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        }
        let current = "";
        for (const id of ids) {
          if (visibleSet.has(id)) {
            current = id;
          }
        }
        setActiveId(current);
      },
      { rootMargin: "-38% 0px -62% 0px", threshold: 0 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.href.slice(1) === activeId);
    if (idx === -1) {
      setPill((prev) => ({ ...prev, show: false }));
      return;
    }
    const el = linkRefs.current[idx];
    if (!el) return;
    const frame = requestAnimationFrame(() => {
      setPill({
        left: el.offsetLeft,
        width: el.offsetWidth,
        show: true,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId]);

  return (
    <motion.nav
      initial={false}
      className="fixed left-0 right-0 top-0 z-50 mx-auto w-[92%] font-grotesk"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 60ms",
      }}
      animate={{
        maxWidth: scrolled ? 760 : 1200,
        marginTop: scrolled ? 20 : 14,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
    >
      <motion.div
        className="flex h-[52px] items-center justify-between rounded-full border px-3"
        animate={{
          backgroundColor: scrolled ? scrolledBg : "rgba(255,255,255,0)",
          ...(isDesktop && {
            backdropFilter: scrolled
              ? "blur(16px) saturate(180%)"
              : "blur(0px)",
            WebkitBackdropFilter: scrolled
              ? "blur(16px) saturate(180%)"
              : "blur(0px)",
          }),
          borderColor: scrolled
            ? "rgba(15,23,42,0.08)"
            : "rgba(15,23,42,0)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link
          href="/"
          aria-label="Sayuru Amarasinghe home"
          onClick={() => setMobileMenuOpen(false)}
          className="relative z-10 flex flex-shrink-0 items-center gap-2 rounded-full pl-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <img
            src="/logos/sayuru-mark.svg"
            alt=""
            className={`flex-shrink-0 object-contain transition-all duration-300 ${
              scrolled ? "h-10 w-10" : "h-9 w-9"
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-[13px] font-semibold text-slate-900 ${
              scrolled ? "hidden" : "hidden sm:block"
            }`}
          >
            Sayuru <span className="text-blue-600"> Amarasinghe</span>
          </span>
          <span
            className={`text-[13px] font-semibold text-slate-900 ${
              scrolled ? "hidden" : "sm:hidden"
            }`}
          >
            Sayuru ICT
          </span>
        </Link>

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
          <div
            ref={navContainerRef}
            className="pointer-events-auto relative flex items-center gap-0.5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-[3px] rounded-full"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.show ? 1 : 0,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 2px 10px rgba(15,23,42,0.08)",
                transition:
                  "left 320ms cubic-bezier(0.34,1.4,0.64,1), width 240ms ease, opacity 180ms ease",
              }}
            />
            {NAV_ITEMS.map(({ href, label }, idx) => (
              <a
                key={href}
                ref={(el) => {
                  linkRefs.current[idx] = el;
                }}
                href={href}
                onClick={(e) => handleHashClick(e, href)}
                className={`relative z-10 select-none rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                  activeId === href.slice(1)
                    ? "text-slate-900"
                    : "text-slate-500"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <LoginButton
            className="hidden h-8 rounded-full bg-blue-600 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500 lg:block"
            text="Login"
            ariaLabel="Login"
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </motion.div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[58px] rounded-2xl p-2 lg:hidden"
          style={{
            background: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
          }}
        >
          {NAV_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`block rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                activeId === href.slice(1)
                  ? "bg-blue-50 text-slate-900"
                  : "text-slate-500"
              }`}
              onClick={(e) => {
                handleHashClick(e, href);
                setMobileMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
          <div className="mt-1 border-t border-slate-100 pt-2">
            <LoginButton
              className="w-full rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500"
              text="Login"
              ariaLabel="Login"
            />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
