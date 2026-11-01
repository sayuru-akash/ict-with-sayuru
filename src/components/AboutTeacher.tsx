"use client";

import { SITE } from "@/lib/site";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { MacbookTerminal } from "@/components/ui/macbook-terminal";

export function AboutTeacher() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inView = useInView(imgRef);

  return (
    <section
      id="about-teacher"
      className="relative flex items-center overflow-hidden bg-white font-grotesk"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1340px] flex-col items-center px-6 pb-24 xl:items-stretch">
        <SectionHeader
          animation="/animations/aboutteacher.tgs"
          className="mb-0 w-full sm:mb-8 xl:mb-10"
          badge="About the Teacher"
          heading="ගුරුවරයා පිළිබඳ.."
          subtitle={
            <>
              <span className="font-medium text-slate-700">
                Sayuru Amarasinghe
              </span>
              <br />
              {SITE.qualifications[0]}<br />
              {SITE.qualifications[1]}<br />
              <span className="text-blue-600">{SITE.role}</span>
            </>
          }
        />

        <div className="flex w-full flex-col items-center gap-0 sm:gap-8 xl:flex-row xl:items-center xl:gap-2">
          <motion.div
            className="relative flex w-full items-center justify-center xl:w-[36%] xl:justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] rounded-full opacity-70 lg:blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 75% at 50% 95%, rgba(37,99,235,0.18) 0%, transparent 75%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 flex select-none flex-col items-center justify-center"
              aria-hidden="true"
            >
              <span
                className="font-black uppercase leading-none text-blue-100 text-[92px] sm:text-[clamp(50px,11vw,200px)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                SAYURU
              </span>
              <span
                className="font-black uppercase leading-none text-blue-50 text-[43px] sm:text-[clamp(30px,5vw,90px)]"
                style={{ letterSpacing: "-0.02em" }}
              >
                AMARASINGHE
              </span>
            </div>
            <motion.img
              ref={imgRef}
              src="/images/sayuru-amarasinghe-original.webp"
              srcSet="/images/sayuru-amarasinghe-original-480.webp 480w, /images/sayuru-amarasinghe-original-768.webp 768w, /images/sayuru-amarasinghe-original.webp 1200w"
              sizes="(min-width: 1280px) 400px, (min-width: 640px) 380px, calc(100vw - 48px)"
              alt="Sayuru Amarasinghe"
              width={1200}
              height={1800}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-auto max-w-full rounded-3xl select-none object-cover shadow-xl shadow-blue-900/10"
              style={{ height: "clamp(320px, 62vh, 700px)" }}
              animate={inView ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{
                duration: 6,
                repeat: inView ? Infinity : 0,
                ease: "easeInOut",
              }}
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="flex w-full flex-col items-center xl:w-[64%] xl:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <div className="w-full max-w-2xl">
              <MacbookTerminal
                className="w-full max-w-none"
                username="sayuru"
                theme="light"
                transparent
                enableSound={false}
                typingSpeed={38}
                delayBetweenCommands={800}
                commands={[
                  "whoami",
                  "cat education.txt",
                  "cat experience.txt",
                  "cat classes.txt",
                ]}
                outputs={{
                  0: [SITE.name, "සයුරු අමරසිංහ"],
                  1: [...SITE.qualifications],
                  2: [SITE.role, "Software Engineering · IT · Cyber Security"],
                  3: [
                    "G.C.E. A/L & O/L ICT · Online Classes",
                    "Theory · Revision · Paper Class",
                    "Join from anywhere in Sri Lanka",
                    `${SITE.email} · ${SITE.phone}`,
                  ],
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
