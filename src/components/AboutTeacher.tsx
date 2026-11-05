"use client";

import { SITE } from "@/lib/site";
import Link from "next/link";
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
          className="mb-8 w-full xl:mb-10"
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

        <div className="mb-8 text-center"><Link href="/about-sayuru-amarasinghe" className="text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-500">Read Sayuru Amarasinghe’s teacher profile</Link></div>
        <div className="flex w-full flex-col items-center gap-8 xl:flex-row xl:items-center xl:gap-2">
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
            <motion.picture
              className="relative z-10 block w-full max-w-[400px]"
              animate={inView ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{
                duration: 6,
                repeat: inView ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <source
                type="image/avif"
                srcSet="/images/sayuru-amarasinghe-profile-480.avif 480w, /images/sayuru-amarasinghe-profile-768.avif 768w, /images/sayuru-amarasinghe-profile.avif 1071w"
                sizes="(min-width: 448px) 400px, calc(100vw - 48px)"
              />
              <img
                ref={imgRef}
                src={SITE.profilePortrait}
                srcSet="/images/sayuru-amarasinghe-profile-480.webp 480w, /images/sayuru-amarasinghe-profile-768.webp 768w, /images/sayuru-amarasinghe-profile.webp 1071w"
                sizes="(min-width: 448px) 400px, calc(100vw - 48px)"
                alt="Sayuru Amarasinghe in his graduation cap and gown"
                width={1071}
                height={1071}
                loading="lazy"
                decoding="async"
                className="block aspect-square h-auto w-full rounded-3xl select-none object-contain shadow-xl shadow-blue-900/10"
                draggable={false}
              />
            </motion.picture>
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
