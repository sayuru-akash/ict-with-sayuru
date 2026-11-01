"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";

export interface StudentResult {
  rank: number;
  name: string;
  index: string;
  gender: "male" | "female";
  icon: number;
}

function getRankTier(rank: number) {
  if (rank <= 10) {
    return {
      accent: "#1E3A8A",
      medallionTo: "#2563EB",
      glow: "rgba(30,58,138,0.3)",
      label: "TOP 10",
    };
  }
  if (rank <= 20) {
    return {
      accent: "#1E40AF",
      medallionTo: "#2563EB",
      glow: "rgba(30,64,175,0.28)",
      label: "TOP 20",
    };
  }
  if (rank <= 50) {
    return {
      accent: "#1D4ED8",
      medallionTo: "#2563EB",
      glow: "rgba(29,78,216,0.26)",
      label: "TOP 50",
    };
  }
  return {
    accent: "#2563EB",
    medallionTo: "#1E3A8A",
    glow: "rgba(37,99,235,0.24)",
    label: "TOP 100",
  };
}

function formatStudentName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const StudentAvatar = memo(function StudentAvatar({
  name,
  gender = "male",
  icon = 1,
  featured,
}: {
  name: string;
  gender?: string;
  icon?: number;
  featured?: boolean;
}) {
  const size = featured ? 48 : 38;
  const src = `/profile-icons/${gender}-${icon}.webp`;
  return (
    <div
      className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-50"
      style={{
        width: size,
        height: size,
        border: `${featured ? "2px" : "1.5px"} solid #DBEAFE`,
      }}
    >
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ width: size, height: size, objectFit: "cover" }}
      />
    </div>
  );
});

const StudentResultCard = memo(function StudentResultCard({
  student,
  featured = false,
}: {
  student: StudentResult;
  featured?: boolean;
}) {
  const tier = getRankTier(student.rank);
  const formattedName = formatStudentName(student.name);
  const badgeSize = featured ? 46 : 40;

  return (
    <article
      className="group relative flex items-center overflow-hidden rounded-2xl border border-blue-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_10px_28px_rgba(37,99,235,0.12)]"
      style={{
        gap: featured ? "12px" : "10px",
        padding: featured ? "14px 16px" : "12px 14px",
      }}
    >
      <div
        className="flex flex-shrink-0 flex-col items-center justify-center rounded-xl text-white"
        style={{
          width: badgeSize,
          height: badgeSize,
          background: `linear-gradient(135deg, ${tier.accent}, ${tier.medallionTo})`,
          boxShadow: `0 4px 12px ${tier.glow}`,
        }}
      >
        <span
          className="font-black leading-none"
          style={{ fontSize: featured ? "15px" : "13px" }}
        >
          {student.rank}
        </span>
        <span
          className="mt-0.5 font-semibold uppercase leading-none"
          style={{ fontSize: "6.5px", letterSpacing: "0.08em" }}
        >
          Rank
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="truncate font-semibold leading-tight text-slate-900"
          style={{ fontSize: featured ? "14px" : "13px" }}
        >
          {formattedName}
        </p>
        <p
          className="mt-1 flex items-center gap-1.5"
          style={{ fontSize: featured ? "10px" : "9.5px" }}
        >
          <span
            className="font-bold uppercase tracking-wider"
            style={{ color: tier.accent }}
          >
            {tier.label}
          </span>
          <span className="text-slate-500">•</span>
          <span className="truncate font-mono text-slate-500">
            {student.index}
          </span>
        </p>
      </div>

      <StudentAvatar
        name={student.name}
        gender={student.gender}
        icon={student.icon}
        featured={featured}
      />
    </article>
  );
});

function ResultsColumn({
  students,
  speed,
  direction = "up",
  startOffset = 0,
  paused,
  featured = false,
}: {
  students: StudentResult[];
  speed: number;
  direction?: "up" | "down";
  startOffset?: number;
  paused: boolean;
  featured?: boolean;
}) {
  const colRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(startOffset);
  const [inView, setInView] = useState(false);
  const halfHeightRef = useRef(0);

  useEffect(() => {
    if (colRef.current) {
      colRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
    }
  }, []);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = colRef.current;
    if (!el || paused || !inView) return;
    if (halfHeightRef.current === 0) {
      halfHeightRef.current = el.scrollHeight / 2;
    }
    let rafId: number;
    const step = () => {
      const half = halfHeightRef.current;
      if (direction === "up") {
        offsetRef.current += speed;
        if (offsetRef.current >= half) offsetRef.current = 0;
      } else {
        offsetRef.current -= speed;
        if (offsetRef.current <= 0) offsetRef.current = half;
      }
      el.style.transform = `translateY(-${offsetRef.current}px)`;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused, inView, speed, direction]);

  const doubled = [...students, ...students];

  return (
    <div
      ref={colRef}
      className={`flex flex-col will-change-transform ${
        featured ? "gap-3" : "gap-2.5"
      }`}
    >
      {doubled.map((student, idx) => (
        <StudentResultCard
          key={`${student.index}-${idx}`}
          student={student}
          featured={featured}
        />
      ))}
    </div>
  );
}

export function Results() {
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/results/results.json")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch(() => {});
  }, []);

  const top20 = students.filter((s) => Number(s.rank) <= 20);
  const rest = students.filter((s) => Number(s.rank) > 20);
  const leftCol = rest.filter((_, idx) => idx % 2 === 0);
  const rightCol = rest.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="results"
      className="relative overflow-hidden bg-white px-4 pb-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionHeader
            animation="/animations/rank.tgs"
            badge="Student Results"
            heading="2025 ප්‍රතිඵල වලින් බිදක්.."
          />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {[
              { value: "02", label: "ලංකාවේ මුල් 10 ට" },
              { value: "07", label: "දිස්ත්‍රික් මුල් 10 ට" },
              { value: "92", label: "දිස්ත්‍රික් මුල් 100 ට" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
              >
                <span className="text-[15px] font-black text-slate-900">
                  {value}
                </span>
                <span className="text-[11px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
          <div
            className="mx-auto mt-5 h-[1.5px] w-24 rounded-full"
            style={{
              background: "linear-gradient(90deg,#93C5FD,#2563EB,#1D4ED8)",
            }}
          />
        </div>

        {students.length > 0 && (
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: "500px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
              style={{
                background: "linear-gradient(to bottom, #fff 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
              style={{
                background: "linear-gradient(to top, #fff 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div className="flex h-full gap-3">
              <div className="flex-1 overflow-hidden">
                <ResultsColumn
                  students={leftCol}
                  speed={0.28}
                  direction="up"
                  startOffset={0}
                  paused={paused}
                />
              </div>
              <div className="hidden flex-1 overflow-hidden sm:block">
                <ResultsColumn
                  students={top20}
                  speed={0.28}
                  direction="down"
                  startOffset={0}
                  paused={paused}
                  featured
                />
              </div>
              <div className="hidden flex-1 overflow-hidden lg:block">
                <ResultsColumn
                  students={rightCol}
                  speed={0.28}
                  direction="up"
                  startOffset={120}
                  paused={paused}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-5">
          {[
            ["#1D4ED8", "TOP 10"],
            ["#2563EB", "TOP 20"],
            ["#3B82F6", "TOP 50"],
            ["#60A5FA", "TOP 100"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
              />
              <span className="text-[11px] font-medium text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
