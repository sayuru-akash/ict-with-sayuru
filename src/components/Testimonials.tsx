"use client";

import React, { memo, useEffect, useState } from "react";
import { User } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export interface CommentItem {
  name: string;
  gender: string;
  comment: string;
  time?: string;
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#93c5fd,#6366f1)",
  "linear-gradient(135deg,#f9a8d4,#c084fc)",
  "linear-gradient(135deg,#6ee7b7,#3b82f6)",
  "linear-gradient(135deg,#fde68a,#f97316)",
  "linear-gradient(135deg,#a5b4fc,#8b5cf6)",
  "linear-gradient(135deg,#fdba74,#f43f5e)",
  "linear-gradient(135deg,#bfdbfe,#2563eb)",
  "linear-gradient(135deg,#d9f99d,#16a34a)",
];

const TestimonialCard = memo(function TestimonialCard({
  item,
  idx,
}: {
  item: CommentItem;
  idx: number;
}) {
  const bg = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return (
    <div className="flex w-[280px] flex-shrink-0 cursor-default select-none flex-col rounded-[20px] border border-slate-200 bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.1)]">
      <div className="mb-4 flex-shrink-0 select-none text-blue-500" aria-hidden="true">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M10 11h-4c0-2.2 1.8-4 4-4v-4c-4.4 0-8 3.6-8 8v8h8v-8zm12 0h-4c0-2.2 1.8-4 4-4v-4c-4.4 0-8 3.6-8 8v8h8v-8z" />
        </svg>
      </div>
      <p className="mb-6 line-clamp-5 flex-1 text-[15.5px] font-bold leading-snug text-slate-800">
        {item.comment}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-slate-900">
            {item.name}
          </p>
          {item.time && (
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {item.time}
            </p>
          )}
        </div>
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{ background: bg }}
        >
          <User className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});

function MarqueeRow({
  items,
  reverse,
}: {
  items: CommentItem[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden pb-2">
      <div
        className={`flex w-max select-none gap-4 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, idx) => (
          <TestimonialCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    fetch("/comments/comments.json")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]));
  }, []);

  const firstRow = comments.filter((_, idx) => idx % 2 === 0);
  const secondRow = comments.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white px-4 pb-20"
    >
      {comments.length > 0 && (
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            animation="/animations/studentreview.tgs"
            className="mb-14"
            badge="Student Reviews"
            heading="සිසුන්ගේ අදහස්.."
            subtitle="A/L ICT සිසුන්ගේ සැබෑ අත්දැකීම් - ඔවුන්ගේ වචනවලින්ම."
          />
          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <div className="mb-4">
              <MarqueeRow items={firstRow} />
            </div>
            <MarqueeRow items={secondRow} reverse />
          </div>
        </div>
      )}
    </section>
  );
}
