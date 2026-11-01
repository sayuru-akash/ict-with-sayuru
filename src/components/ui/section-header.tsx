"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn, loadTgsPlayer, useInViewObserver, useIsDesktop } from "@/lib/utils";

export function getWordVariants(isDesktop: boolean) {
  return {
    hidden: {
      opacity: 0,
      y: 32,
      ...(isDesktop && { filter: "blur(8px)" }),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(isDesktop && { filter: "blur(0px)" }),
    },
  };
}

export function AnimatedHeading({
  children,
  className,
  style,
  delay = 0,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = children.split(/\s+/).filter(Boolean);
  const variants = getWordVariants(useIsDesktop());

  return (
    <motion.h2
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.075, delayChildren: delay / 1000 }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          variants={variants}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-block",
            marginRight: idx < words.length - 1 ? "0.45em" : undefined,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export function SectionBadge({
  label,
  live = false,
}: {
  label: string;
  live?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-[5px] text-[11px] font-semibold uppercase tracking-[0.13em] text-blue-700">
      {live && (
        <span
          className="relative flex h-[5px] w-[5px] flex-shrink-0"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-65" />
          <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-emerald-500" />
        </span>
      )}
      {label}
    </span>
  );
}

const BADGE_BORDER = "#DBEAFE";
const BADGE_SHADOW =
  "0px 0.6px 0.6px -1.25px rgba(42,40,46,0.18), 0px 2.29px 2.29px -2.5px rgba(42,40,46,0.16), 0px 10px 10px -3.75px rgba(42,40,46,0.06)";
const ARCH_PATH =
  "M 0 152 C 0 132.039 3.932 112.274 11.57 93.832 C 19.209 75.391 30.405 58.634 44.52 44.52 C 58.634 30.405 75.391 19.209 93.832 11.57 C 112.274 3.932 132.039 0 152 0 C 171.961 0 191.727 3.932 210.168 11.57 C 228.61 19.209 245.366 30.405 259.481 44.52 C 273.595 58.634 284.791 75.391 292.429 93.832 C 300.068 112.274 304 132.039 304 152 L 258.939 152 C 258.939 137.957 256.172 124.051 250.799 111.076 C 245.424 98.102 237.547 86.313 227.616 76.383 C 217.687 66.453 205.898 58.576 192.924 53.202 C 179.949 47.828 166.043 45.062 152 45.062 C 137.957 45.062 124.051 47.828 111.076 53.202 C 98.102 58.576 86.313 66.453 76.383 76.383 C 66.453 86.313 58.576 98.102 53.202 111.076 C 47.828 124.051 45.062 137.957 45.062 152 Z";
const ARCH_MASK = "linear-gradient(to bottom, black 55%, transparent 96%)";

export function ArchDecoration({ animation }: { animation?: string }) {
  const [ready, setReady] = useState(false);
  const { ref, inView } = useInViewObserver<HTMLDivElement>();

  useEffect(() => {
    if (animation && inView) {
      loadTgsPlayer(() => setReady(true));
    }
  }, [animation, inView]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative mx-auto flex max-w-full origin-bottom scale-[0.78] items-start justify-center sm:scale-90 xl:origin-top xl:scale-100"
      style={{ width: 520, height: 152 }}
    >
      <svg
        viewBox="0 0 304 152"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 48,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          height: 140,
          overflow: "visible",
          maskImage: ARCH_MASK,
          WebkitMaskImage: ARCH_MASK,
        }}
      >
        <title>Arch glow effect</title>
        <defs>
          <filter
            id="arch-glow-blur"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feMorphology operator="dilate" radius="6" />
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <mask id="arch-glow-mask" maskUnits="userSpaceOnUse">
            <path d={ARCH_PATH} fill="#fff" filter="url(#arch-glow-blur)" />
          </mask>
        </defs>
        <image
          href="/images/features/arch-glow.webp"
          x="-130"
          y="-52"
          width="565"
          preserveAspectRatio="xMidYMin slice"
          mask="url(#arch-glow-mask)"
          opacity="0.9"
        />
      </svg>
      <div
        style={{
          position: "relative",
          width: 280,
          height: 140,
          marginTop: 48,
          maskImage: ARCH_MASK,
          WebkitMaskImage: ARCH_MASK,
        }}
      >
        <svg
          viewBox="0 0 304 152"
          aria-hidden="true"
          style={{ width: "100%", height: "100%" }}
        >
          <title>Arch decoration</title>
          <defs>
            <linearGradient
              id="section-arch-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0" stopColor="#DBEAFE" />
              <stop offset="0.35" stopColor="#60A5FA" />
              <stop offset="0.75" stopColor="#2563EB" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path d={ARCH_PATH} fill="url(#section-arch-gradient)" />
        </svg>
      </div>
      {animation && ready && inView && (
        <tgs-player
          autoplay
          loop
          mode="normal"
          src={animation}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 14,
            transform: "translateX(-50%)",
            width: 105,
            height: 105,
          }}
        />
      )}
    </div>
  );
}

export function SectionHeader({
  badge,
  heading,
  subtitle,
  live = false,
  className,
  animation,
}: {
  badge: string;
  heading: string;
  subtitle?: React.ReactNode;
  live?: boolean;
  className?: string;
  animation?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center pt-12 text-center", className)}>
      <ArchDecoration animation={animation} />
      <span
        className="relative mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-[#424242]"
        style={{
          borderColor: BADGE_BORDER,
          boxShadow: BADGE_SHADOW,
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: "-0.4px",
          lineHeight: 1.1,
        }}
      >
        {live && (
          <span
            className="relative flex h-[6px] w-[6px] flex-shrink-0"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-65" />
            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-500" />
          </span>
        )}
        {badge}
      </span>
      <AnimatedHeading
        delay={150}
        className="max-w-2xl text-slate-900"
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        {heading}
      </AnimatedHeading>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-[500px] text-[#424242]"
          style={{
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
