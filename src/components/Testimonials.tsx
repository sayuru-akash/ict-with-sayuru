"use client";

import { memo, useState } from "react";
import { ArrowUpRight, MapPin, Pause, Play, Quote } from "lucide-react";
import comments from "../../public/comments/comments.json";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface CommentItem {
  name: string;
  location: string;
  comment: string;
}

const REVIEWS: readonly CommentItem[] = comments;
const REVIEW_ROWS = [
  REVIEWS.filter((_, index) => index % 2 === 0),
  REVIEWS.filter((_, index) => index % 2 === 1),
];
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#60a5fa,#2563eb)",
  "linear-gradient(135deg,#818cf8,#4f46e5)",
  "linear-gradient(135deg,#38bdf8,#0284c7)",
];

const TestimonialCard = memo(function TestimonialCard({
  item,
  index,
  fullWidth = false,
}: {
  item: CommentItem;
  index: number;
  fullWidth?: boolean;
}) {
  const initials = item.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("");
  return (
    <figure className={`flex shrink-0 flex-col rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] ${fullWidth ? "w-full" : "w-[280px] min-[380px]:w-[320px] sm:w-[340px]"}`}>
      <Quote className="mb-4 h-7 w-7 shrink-0 text-blue-500" aria-hidden="true" />
      <blockquote className="mb-6 flex-1 text-[15px] font-medium leading-7 text-slate-700">
        <p>{item.comment}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }} aria-hidden="true">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-5 text-slate-900">{item.name}</p>
          <p className="mt-1 flex items-center gap-1 text-xs leading-5 text-slate-500">
            <MapPin className="h-3 w-3 shrink-0 text-blue-400" aria-hidden="true" />{item.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
});

function MarqueeRow({
  items,
  paused,
  reverse = false,
}: {
  items: readonly CommentItem[];
  paused: boolean;
  reverse?: boolean;
}) {
  return (
    <div className="review-row group overflow-hidden py-2 motion-reduce:overflow-x-auto" role="region" aria-label={reverse ? "More student experiences" : "Student experiences"} tabIndex={0}>
      <div
        className={`review-track flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${items.length * 11}s`, animationPlayState: paused ? "paused" : undefined }}
      >
        <div className="flex shrink-0 items-stretch gap-4 pr-4">
          {items.map((item, index) => <TestimonialCard key={item.name} item={item} index={index} />)}
        </div>
        <div className="flex shrink-0 items-stretch gap-4 pr-4 motion-reduce:hidden" aria-hidden="true">
          {items.map((item, index) => <TestimonialCard key={`copy-${item.name}`} item={item} index={index} />)}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const [reading, setReading] = useState(false);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white px-4 pb-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          animation="/animations/studentreview.tgs"
          className="mb-8"
          badge="Student Reviews"
          heading="සිසුන්ගේ අදහස්.."
          subtitle="ඉගෙනුම් අත්දැකීම්, ඔවුන්ගේ වචනවලින්ම."
        />
        <div className="mb-7 flex flex-wrap items-center justify-center gap-3">
          <Dialog open={reading} onOpenChange={setReading}>
            <DialogTrigger asChild>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                Read all {REVIEWS.length} reviews <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[85svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
              <DialogHeader className="shrink-0 border-b border-slate-100 p-5 pr-12 text-left sm:p-6 sm:pr-12">
                <DialogTitle className="text-xl font-bold">Student experiences</DialogTitle>
                <DialogDescription>{REVIEWS.length} reviews, in the students&apos; own words.</DialogDescription>
              </DialogHeader>
              <div data-lenis-prevent className="min-h-0 overflow-y-auto overscroll-contain bg-slate-50/70 p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {REVIEWS.map((item, index) => <TestimonialCard key={item.name} item={item} index={index} fullWidth />)}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <button
            type="button"
            onClick={() => setPaused(value => !value)}
            aria-pressed={paused}
            aria-controls="student-review-rows"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-blue-200 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            {paused ? "Resume scrolling" : "Pause scrolling"}
          </button>
        </div>
        <div id="student-review-rows" className="relative" style={{ maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)" }}>
          {REVIEW_ROWS.map((items, index) => <MarqueeRow key={index} items={items} paused={paused || reading} reverse={index === 1} />)}
        </div>
      </div>
    </section>
  );
}
