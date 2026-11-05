"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { loadTgsPlayer, useInViewObserver } from "@/lib/utils";
import { SITE } from "@/lib/site";

const BLUE_DARK = "#2563EB";
const BLUE_MID = "#3B82F6";
const BLUE_LIGHT = "#60A5FA";
const BLUE_PALE = "#DBEAFE";

const SPARKLE_POSITIONS = [
  { top: "10%", left: "14%", size: 4 },
  { top: "18%", left: "88%", size: 3 },
  { top: "34%", left: "6%", size: 3 },
  { top: "46%", left: "94%", size: 4 },
  { top: "62%", left: "16%", size: 3 },
  { top: "74%", left: "82%", size: 4 },
  { top: "88%", left: "38%", size: 3 },
  { top: "92%", left: "68%", size: 4 },
];

function SparkleDots() {
  return (
    <>
      {SPARKLE_POSITIONS.map((dot) => (
        <span
          key={`${dot.top}-${dot.left}`}
          className="absolute rounded-full bg-white/70"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function AnimatedFeatureIcon({
  animation,
  emoji,
  size = 92,
  className = "",
}: {
  animation: string;
  emoji: string;
  size?: number;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const { ref, inView } = useInViewObserver<HTMLDivElement>();

  useEffect(() => {
    if (inView && animation) {
      loadTgsPlayer(() => setReady(true));
    }
  }, [inView, animation]);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center justify-center rounded-3xl bg-white shadow-xl ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1, rotate: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
    >
      {animation && ready && inView ? (
        <tgs-player
          autoplay
          loop
          mode="normal"
          src={animation}
          style={{ width: size * 0.68, height: size * 0.68 }}
        />
      ) : (
        <span style={{ fontSize: size * 0.42 }}>{emoji}</span>
      )}
    </motion.div>
  );
}

function TheoryIllustration() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE_MID} 55%, ${BLUE_LIGHT})`,
      }}
    >
      <SparkleDots />
      <motion.div
        className="-top-1 absolute left-1/2 h-9 w-4 bg-white"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)",
          transformOrigin: "top center",
          x: "-50%",
        }}
        whileHover={{ rotate: 22, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        aria-hidden="true"
      />
      <motion.svg
        viewBox="0 0 140 100"
        className="relative h-24 w-36"
        aria-hidden="true"
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.path
          d="M70 14 C 50 2, 20 2, 6 10 L6 88 C 20 80, 50 80, 70 92 Z"
          fill="white"
          fillOpacity="0.95"
          whileHover={{ x: -4 }}
        />
        <motion.path
          d="M70 14 C 90 2, 120 2, 134 10 L134 88 C 120 80, 90 80, 70 92 Z"
          fill="white"
          fillOpacity="0.82"
          whileHover={{ x: 4 }}
        />
        <g stroke={BLUE_PALE} strokeWidth="3" strokeLinecap="round">
          <line x1="16" y1="30" x2="56" y2="26" />
          <line x1="16" y1="42" x2="56" y2="38" />
          <line x1="16" y1="54" x2="56" y2="50" />
          <line x1="84" y1="26" x2="124" y2="30" />
          <line x1="84" y1="38" x2="124" y2="42" />
          <line x1="84" y1="50" x2="124" y2="54" />
        </g>
      </motion.svg>
    </div>
  );
}

function PaperIllustration() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE_MID} 55%, ${BLUE_LIGHT})`,
      }}
    >
      <SparkleDots />
      <motion.div
        className="relative h-32 w-24 rounded-lg bg-white p-3 shadow-xl"
        whileHover={{ rotate: -3, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <div
          className="h-1.5 w-2/3 rounded-full"
          style={{ backgroundColor: BLUE_PALE }}
        />
        <div
          className="mt-2.5 h-1.5 w-1/2 rounded-full"
          style={{ backgroundColor: BLUE_PALE }}
        />
        <div
          className="mt-2.5 h-1.5 w-3/4 rounded-full"
          style={{ backgroundColor: BLUE_PALE }}
        />
        <div
          className="mt-2.5 h-1.5 w-1/2 rounded-full"
          style={{ backgroundColor: BLUE_PALE }}
        />
        <motion.div
          className="-top-3 -right-3 absolute flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 shadow-md"
          whileHover={{ scale: 1.4, rotate: 18 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          aria-hidden="true"
        >
          <Check className="h-5 w-5 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
      <motion.span
        className="absolute bottom-5 left-5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold shadow-md"
        style={{ color: BLUE_DARK }}
        whileHover={{ scale: 1.1, y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        #1 Rank
      </motion.span>
    </div>
  );
}

function TwentyDayPlanIllustration() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE_MID} 55%, ${BLUE_LIGHT})`,
      }}
      aria-hidden="true"
    >
      <SparkleDots />
      <motion.div
        className="relative w-[176px] rounded-xl bg-white p-2.5 shadow-xl"
        whileHover={{ scale: 1.04, rotate: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="absolute -top-2 left-10 h-4 w-2 rounded-full bg-blue-200" />
        <span className="absolute -top-2 right-10 h-4 w-2 rounded-full bg-blue-200" />
        <div className="mb-2 flex items-center justify-between border-b border-blue-100 pb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold leading-none text-blue-600">20</span>
            <span className="text-[8px] font-bold tracking-widest text-slate-500">DAY PLAN</span>
          </div>
          <CalendarDays className="h-4 w-4 text-blue-500" strokeWidth={1.8} />
        </div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 20 }, (_, index) => (
            <span
              key={index}
              className={`flex h-4 items-center justify-center rounded text-[9px] font-bold ${
                index === 19 ? "bg-blue-600 text-white shadow-sm" : "bg-blue-50 text-blue-600"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const FEATURES_LIST = [
  {
    title: "20 Day Plan",
    description:
      "දින 20ක සැලැස්මක් ඔස්සේ ICT විභාගයට සූදානම් වන්න.",
    Illustration: TwentyDayPlanIllustration,
    animation: "",
    emoji: "🗓️",
    span: "lg:col-span-2",
  },
  {
    title: "Theory And Revision",
    description: "සියලු පාඩම වල කරුණු මුල සිට අංගසම්පුර්ණ ව ඉගැන්වේ.",
    Illustration: TheoryIllustration,
    animation: "/animations/theory.tgs",
    emoji: "📚",
    span: "lg:col-span-2",
  },
  {
    title: "Paper Class",
    description:
      "ප්‍රශ්න පත්‍ර ලියවා ලකුණු ලබාදී, Rank කර වැරදි සාකච්ඡා කරයි.",
    Illustration: PaperIllustration,
    animation: "/animations/rank.tgs",
    emoji: "📝",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

const CARD_SHADOW =
  "0px 0.6px 0.6px -1.25px rgba(42,40,46,0.18), 0px 2.29px 2.29px -2.5px rgba(42,40,46,0.16), 0px 10px 10px -3.75px rgba(42,40,46,0.06)";

function FeatureCard({
  title,
  description,
  Illustration,
  animation,
  emoji,
  span,
  index,
}: (typeof FEATURES_LIST)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 40px -12px rgba(37,99,235,0.28), 0 8px 16px -8px rgba(37,99,235,0.18)",
      }}
      className={`flex h-full flex-col rounded-3xl border bg-white ${span}`}
      style={{ borderColor: BLUE_PALE, boxShadow: CARD_SHADOW }}
    >
      <div className="p-1.5">
        <div className="h-[180px] overflow-hidden rounded-2xl sm:h-[200px]">
          <Illustration />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-1 pb-6">
        <div className="flex items-center gap-2.5">
          <AnimatedFeatureIcon animation={animation} emoji={emoji} size={32} />
          <h3 className="text-[16px] font-bold text-slate-900">{title}</h3>
        </div>
        <p className="mt-2 line-clamp-2 min-h-[42px] text-[13px] leading-[1.6] text-slate-500">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-28 overflow-hidden bg-white px-4 pb-24"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          animation="/animations/study.tgs"
          className="mb-14"
          badge="What We Offer"
          heading="අපේ වැඩ පිළිවෙළ"
          subtitle={
            <>
              මූලික සිද්ධාන්තයේ සිට අවසන් විභාග{" "}
              <br className="hidden sm:block" /> සූදානම දක්වා, සෑම පියවරකදීම ඔබ
              සමඟ සිටිමු.
            </>
          }
        />
        <section id="programmes" aria-label="A/L and O/L ICT programmes" className="mb-8 grid scroll-mt-28 gap-5 sm:grid-cols-2">
          {[
            { id: "al-ict", level: "A/L", name: "Advanced Level ICT", sinhala: "උසස් පෙළ ICT", description: "Theory, revision and past-paper practice for G.C.E. A/L ICT." },
            { id: "ol-ict", level: "O/L", name: "Ordinary Level ICT", sinhala: "සාමාන්‍ය පෙළ ICT", description: "Online ICT classes for G.C.E. O/L students. Ask about lessons and the class timetable." },
          ].map(programme => (
            <article key={programme.id} id={programme.id} className="scroll-mt-28 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
              <span className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wide text-blue-600">G.C.E. {programme.level}</span>
              <h3 className="text-xl font-bold text-slate-900">{programme.name}</h3>
              <p lang="si" className="mt-1 text-lg font-medium text-blue-600">{programme.sinhala}</p>
              <p lang="en" className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{programme.description}</p>
              <Link href={`/${programme.id}`} className="mt-5 mr-5 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-500">Explore {programme.level} ICT classes</Link>
              <a href={`${SITE.whatsapp}?text=${encodeURIComponent(`${SITE.messageGreeting} I would like to know about ${programme.level} ICT online classes and the timetable.`)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-500">
                Ask about {programme.level} ICT <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>
        <p className="mb-6 text-sm text-slate-600">Preparing for O/L ICT? <Link href="/ol-20-day-plan" className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4">Explore the 20 Day F to A Plan, inclusions and fee</Link>.</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES_LIST.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
