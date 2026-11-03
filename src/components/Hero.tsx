"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getWordVariants } from "@/components/ui/section-header";
import { useIsDesktop } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { useSmoothHashClick } from "@/components/Navbar";

const ROTATING_PHRASES = ["Clear Theory", "Paper Class Ranking", "Real A Results"];

function RotatingPhrase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % ROTATING_PHRASES.length),
      2400
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex h-[1.5em] w-[260px] items-center justify-center overflow-hidden align-bottom sm:w-[310px] xl:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_PHRASES[index]}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap xl:justify-start"
        >
          <span className="font-display relative text-[1.15em] text-slate-900">
            <span
              className="absolute inset-x-[-6px] bottom-[6px] top-[48%] -z-10 rounded-sm bg-blue-200/70"
              aria-hidden="true"
            />
            {ROTATING_PHRASES[index]}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroAwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hero-award-gradient" x1="9" y1="6" x2="29" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <path d="M12 32C5 28 3 19 7 11M28 32C35 28 37 19 33 11" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" />
      <g fill="url(#hero-award-gradient)">
        <ellipse cx="6" cy="15" rx="2.1" ry="4" transform="rotate(-25 6 15)" />
        <ellipse cx="6.5" cy="23" rx="2.1" ry="4" transform="rotate(-45 6.5 23)" />
        <ellipse cx="11" cy="29.5" rx="2.1" ry="4" transform="rotate(-60 11 29.5)" />
        <ellipse cx="34" cy="15" rx="2.1" ry="4" transform="rotate(25 34 15)" />
        <ellipse cx="33.5" cy="23" rx="2.1" ry="4" transform="rotate(45 33.5 23)" />
        <ellipse cx="29" cy="29.5" rx="2.1" ry="4" transform="rotate(60 29 29.5)" />
        <path d="M16 27L14 37L20 33L26 37L24 27" />
        <circle cx="20" cy="17" r="11" stroke="#dbeafe" strokeWidth="1.5" />
      </g>
      <circle cx="20" cy="17" r="8.5" fill="none" stroke="white" strokeOpacity="0.25" />
      <path d="M17 14L20 12V23M17 23H23" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroAwardBadge() {
  return (
    <span className="relative mx-2 -top-1 inline-flex h-9 w-9 shrink-0 items-center justify-center align-middle sm:mx-3 sm:-top-2 sm:h-11 sm:w-11">
      <span
        className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-[radial-gradient(circle,rgba(96,165,250,0.4)_0%,transparent_70%)] lg:bg-blue-400/40 lg:blur-lg"
        aria-hidden="true"
      />
      <motion.span
        className="inline-flex h-full w-full items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-white/90 to-blue-100/70 shadow-[0_8px_20px_rgba(37,99,235,0.35)]"
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroAwardIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      </motion.span>
    </span>
  );
}

export function Hero() {
  const variants = getWordVariants(useIsDesktop());
  const handleHashClick = useSmoothHashClick();

  return (
    <section
      id="hero"
      className="relative flex w-full select-none flex-col overflow-hidden bg-white font-grotesk"
    >
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-center px-6 pt-32 pb-0 lg:px-12 xl:min-h-[760px] xl:h-[100svh] xl:items-stretch xl:px-16 xl:py-0">
        <div
          className="pointer-events-none absolute hidden overflow-hidden xl:block"
          style={{
            width: "1053px",
            height: "895px",
            right: "-213px",
            top: "56.33%",
            transform: "translateY(-50%) rotate(-11deg)",
          }}
          aria-hidden="true"
        >
          <picture>
          <source media="(min-width: 1280px)" srcSet="/images/hero/hero-shape.webp" />
          <motion.img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            alt=""
            width={2106}
            height={1790}
            fetchPriority="low"
            className="h-full w-full select-none object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            draggable={false}
          />
          </picture>
        </div>

        <div className="pointer-events-none relative order-2 mt-8 flex w-full max-w-[420px] justify-center xl:absolute xl:right-0 xl:bottom-0 xl:mt-0 xl:w-[43%] xl:max-w-none">
          <picture className="contents">
          <source type="image/avif" srcSet="/images/sayuru-amarasinghe-480.avif 480w, /images/sayuru-amarasinghe-768.avif 768w, /images/sayuru-amarasinghe-1024.avif 1024w" sizes="(min-width: 1280px) 516px, (min-width: 468px) 420px, calc(100vw - 48px)" />
          <img
            src={SITE.portrait}
            srcSet="/images/sayuru-amarasinghe-480.webp 480w, /images/sayuru-amarasinghe-768.webp 768w, /images/sayuru-amarasinghe.webp 1024w"
            sizes="(min-width: 1280px) 516px, (min-width: 468px) 420px, calc(100vw - 48px)"
            alt="Sayuru Amarasinghe in his graduation cap and gown"
            width={1024}
            height={1536}
            fetchPriority="high"
            className="relative z-[1] h-auto w-full object-contain object-bottom xl:max-h-[min(84svh,780px)]"
            style={{ maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)" }}
            draggable={false}
          />
          </picture>
        </div>

        <div className="relative z-10 flex max-w-xl flex-col items-center text-center xl:items-start xl:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pr-4 pl-1.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
          >
            <span className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-3 py-1 text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(37,99,235,0.45)]">
              O/L
            </span>
            <span className="text-[12px] font-semibold text-slate-600">
              20 Day Plan Registration Open Now
            </span>
          </motion.div>

          <p className="mb-4 text-sm font-semibold tracking-wide text-blue-600 sm:text-base">
            {SITE.name} <span lang="si" className="text-slate-500">· සයුරු අමරසිංහ</span>
          </p>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500" lang="en">A/L &amp; O/L ICT · Online Classes</p>

          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.075, delayChildren: 0.15 }}
            className="mb-6 font-bold leading-[1.05] tracking-tight text-slate-900"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <motion.span
              variants={variants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", marginRight: "0.45em" }}
              className="text-[0.9em] sm:text-[0.95em]"
            >
              ලංකාවේ
            </motion.span>
            <motion.span
              variants={variants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-flex", alignItems: "center" }}
              className="text-[0.9em] sm:text-[0.95em]"
            >
              අංක එකේ
              <HeroAwardBadge />
            </motion.span>
            <br />
            <motion.span
              variants={variants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", marginRight: "0.28em" }}
              className="bg-gradient-to-t from-blue-700 via-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              <span className="font-display">Online</span> ICT
            </motion.span>
            <motion.span
              variants={variants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block" }}
            >
              පන්තිය
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-9 flex max-w-md flex-wrap items-center justify-center gap-x-1.5 text-lg font-medium leading-relaxed text-slate-500 xl:justify-start"
            style={{ letterSpacing: "-0.01em" }}
          >
            <span>Built for students who want</span>
            <RotatingPhrase />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mb-10 w-auto"
          >
            <a
              href="#flow"
              onClick={(event) => handleHashClick(event, "#flow")}
              className="flex h-12 w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 px-8 text-[15px] font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:opacity-90 active:scale-95"
            >
              Join Online Classes <span aria-hidden="true">↓</span>
            </a>
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute overflow-hidden xl:hidden"
          style={{
            right: "-90px",
            top: "-30px",
            height: "320px",
            width: "320px",
            zIndex: 0,
            maskImage: "linear-gradient(to bottom, black 40%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 75%)",
          }}
          aria-hidden="true"
        >
          <picture>
          <source media="(max-width: 1279px)" srcSet="/images/hero/hero-shape-mobile.webp" />
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            alt=""
            width={640}
            height={544}
            fetchPriority="low"
            className="absolute h-full w-full max-w-none select-none object-cover object-center"
            style={{ transform: "rotate(-25deg)" }}
            draggable={false}
          />
          </picture>
        </div>
      </div>
    </section>
  );
}
