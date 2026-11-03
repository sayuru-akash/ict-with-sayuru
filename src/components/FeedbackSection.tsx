"use client";

import { SITE } from "@/lib/site";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageSquareHeart, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedHeading } from "@/components/ui/section-header";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stars = rating > 0 ? "⭐".repeat(rating) : "Not rated";
    const subject = encodeURIComponent(`Student feedback from ${name}`);
    const body = encodeURIComponent(`${SITE.messageGreeting}\n\nRating: ${stars}\n\n${message}\n\n- ${name}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="feedback-name"
          className="text-[13px] font-semibold text-slate-700"
        >
          ඔබේ නම
        </label>
        <input
          id="feedback-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ඔබගේ නම..."
          className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-slate-700">
          ඔබේ අත්දැකීම කොහොමද?
        </span>
        <div
          className="flex gap-1"
          role="radiogroup"
          aria-label="Rating out of 5"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
            >
              <Star
                className="h-6 w-6 transition-colors"
                fill={
                  star <= (hoverRating || rating) ? "#2563EB" : "transparent"
                }
                stroke={
                  star <= (hoverRating || rating) ? "#2563EB" : "#CBD5E1"
                }
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="feedback-message"
          className="text-[13px] font-semibold text-slate-700"
        >
          ඔබේ අදහස
        </label>
        <textarea
          id="feedback-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Class එක ගැන, ගුරුවරයා ගැන, results ගැන... ඔබේ අත්දැකීම කියන්න."
          className="resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-blue-500"
      >
        {submitted ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
        )}
        {submitted ? "ස්තූතියි!" : "Feedback එක යවන්න"}
      </button>
    </form>
  );
}

function EnvelopeGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 186 121"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g filter="url(#env_filter0_d)">
        <rect
          width="144"
          height="96"
          rx="8"
          transform="matrix(1 0 0 -1 21 108)"
          fill="url(#env_paint0)"
        />
        <rect
          x="-0.5"
          y="0.5"
          width="145"
          height="97"
          rx="8.5"
          transform="matrix(1 0 0 -1 21 109)"
          stroke="url(#env_paint1)"
        />
      </g>
      <mask
        id="env_mask0"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="21"
        y="12"
        width="144"
        height="96"
      >
        <rect x="21" y="12" width="144" height="96" rx="8" fill="white" />
      </mask>
      <g mask="url(#env_mask0)">
        <path
          d="M21 108L165 108L101.352 53.1923C98.389 50.6405 96.9073 49.3647 95.2444 48.8786C93.7788 48.4502 92.2212 48.4502 90.7556 48.8786C89.0927 49.3647 87.611 50.6405 84.6477 53.1923L21 108Z"
          fill="url(#env_paint2)"
        />
        <path
          d="M22.5 106L84.6546 52.6617C87.616 50.1203 89.0967 48.8496 90.7575 48.3661C92.2211 47.9399 93.7761 47.9408 95.2393 48.3686C96.8994 48.8541 98.3787 50.1264 101.337 52.6712L164.5 107"
          stroke="#2563EB"
          strokeOpacity="0.08"
        />
        <path
          d="M22.5 14L84.6546 67.3383C87.616 69.8797 89.0967 71.1504 90.7575 71.6339C92.2211 72.0601 93.7761 72.0592 95.2393 71.6314C96.8994 71.1459 98.3787 69.8736 101.337 67.3288L164.5 13"
          stroke="#2563EB"
          strokeOpacity="0.08"
        />
        <g filter="url(#env_filter10_i)">
          <path
            d="M21 12L165 12L101.352 66.8077C98.389 69.3595 96.9073 70.6354 95.2444 71.1214C93.7788 71.5498 92.2212 71.5498 90.7556 71.1214C89.0927 70.6354 87.611 69.3595 84.6477 66.8077L21 12Z"
            fill="url(#env_paint3)"
          />
        </g>
        <rect
          x="21.5"
          y="12.5"
          width="143"
          height="95"
          rx="7.5"
          stroke="white"
          strokeOpacity="0.4"
        />
      </g>
      <defs>
        <filter
          id="env_filter0_d"
          x="16"
          y="9"
          width="154"
          height="106"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.117 0 0 0 0 0.227 0 0 0 0 0.541 0 0 0 0.08 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1"
            result="shape"
          />
        </filter>
        <filter
          id="env_filter10_i"
          x="21"
          y="12"
          width="144"
          height="59.4427"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1" />
        </filter>
        <linearGradient
          id="env_paint0"
          x1="72"
          y1="0"
          x2="72"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.130208" stopColor="white" />
          <stop offset="0.848958" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient
          id="env_paint1"
          x1="72"
          y1="0"
          x2="72"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#475569" stopOpacity="0.06" />
          <stop offset="1" stopColor="#475569" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient
          id="env_paint2"
          x1="93"
          y1="46"
          x2="93"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.524194" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="env_paint3"
          x1="93"
          y1="12"
          x2="93"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.25" stopColor="white" />
          <stop offset="1" stopColor="#F1F5F9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FeedbackSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24">
      <div className="relative mx-auto max-w-5xl">
        <div
          id="join"
          className="relative overflow-hidden rounded-[20px] border-[3px] border-white px-6 py-16 text-center sm:px-16 sm:py-20"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, #2563EB 0%, #1D4ED8 100%)",
            boxShadow:
              "inset 90px 60px 90px rgba(255,255,255,0.2), 0 30px 70px -20px rgba(37,99,235,0.45), 0 10px 30px -10px rgba(37,99,235,0.3)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute -bottom-6 -left-16 sm:-bottom-8 sm:-left-20"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, rotate: 38 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            aria-hidden="true"
          >
            <EnvelopeGraphic className="h-40 w-60 sm:h-56 sm:w-80" />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute -right-16 -bottom-6 sm:-right-20 sm:-bottom-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, rotate: -38 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            aria-hidden="true"
          >
            <EnvelopeGraphic className="h-40 w-60 sm:h-56 sm:w-80" />
          </motion.div>

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <AnimatedHeading
              delay={0}
              className="text-white"
              style={{
                fontSize: "clamp(1.75rem, 5.5vw, 3.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
              }}
            >
              ඔබේ අත්දැකීම අපිත් එක්ක බෙදාගන්න
            </AnimatedHeading>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-xl text-[15px] leading-relaxed text-blue-50"
            >
              අපේ classes එකට සම්බන්ධ වුණු ඔබේ අත්දැකීම අනිත් සිසුන්ටත් වටිනවා.
              ඔබේ feedback එක අපිට කියන්න - ඒක අපිට තවත් හොඳින් වැඩ කරන්න උදව්
              වෙනවා.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2"
            >
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-blue-600 shadow-[0_10px_24px_-6px_rgba(15,23,42,0.35)]"
                  >
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-blue-100/80 to-transparent"
                      initial={{ left: "-35%" }}
                      animate={{ left: "130%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1.8,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                    <motion.span
                      className="flex"
                      animate={{ scale: [1, 1.3, 1, 1.2, 1] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: "easeInOut",
                      }}
                    >
                      <MessageSquareHeart
                        className="h-4 w-4 fill-blue-100"
                        aria-hidden="true"
                      />
                    </motion.span>
                    ඔබේ Feedback එක දෙන්න
                  </motion.button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ඔබේ Feedback එක</DialogTitle>
                    <DialogDescription>
                      ඔබේ අත්දැකීම හා අදහස් අපිත් එක්ක බෙදාගන්න. Submit කරාම ඔබේ
                      email app එකෙන් අපිට කෙලින්ම යවන්න පුළුවන්.
                    </DialogDescription>
                  </DialogHeader>
                  <FeedbackForm />
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
