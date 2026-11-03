"use client";

import { SITE } from "@/lib/site";
import React from "react";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionBadge } from "@/components/ui/section-header";

const LENIS_OPTIONS = { duration: 1.2 };

const LEGAL_LINKS = [
  { to: "/privacy-policy", label: "Privacy Policy & Terms" },
  { to: "/terms-and-conditions", label: "Terms and Conditions" },
  { to: "/refund-policy", label: "Refund Policy" },
];

export function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-slate-100 py-8 first:border-t-0 first:pt-0"
    >
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

export function ContactBox({
  email = SITE.email,
  phone = SITE.phone,
  phoneHref = SITE.phoneHref,
}: {
  email?: string;
  phone?: string;
  phoneHref?: string;
}) {
  return (
    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm text-slate-600">
        Email:{" "}
        <a
          href={`mailto:${email}`}
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          {email}
        </a>
      </p>
      <p className="mt-1.5 text-sm text-slate-600">
        Phone:{" "}
        <a
          href={`tel:${phoneHref}`}
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          {phone}
        </a>
      </p>
    </div>
  );
}

export function PolicyLayout({
  title,
  description,
  lastUpdated,
  sections,
  children,
}: {
  title: string;
  description: string;
  lastUpdated: string;
  sections: Array<{ id: string; title: string }>;
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <div className="min-h-screen bg-white font-grotesk selection:bg-blue-200 selection:text-blue-900">
        <Navbar />
        <main
          id="main-content"
          lang="en-LK"
          className="mx-auto max-w-7xl px-6 pt-36 pb-20 lg:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition-colors hover:text-blue-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to home
            </Link>
            <div className="flex justify-center">
              <SectionBadge label="Legal" />
            </div>
            <h1
              className="mt-4 font-bold text-slate-900"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {title}
            </h1>
            <p className="mt-4 text-slate-500">
              Last updated: {lastUpdated}. {description}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
            <nav aria-label="Table of contents" className="hidden lg:block">
              <div className="sticky top-28">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                  On this page
                </h3>
                <ul className="space-y-1 border-l border-slate-200 pl-4">
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="block py-1 text-[13px] text-slate-500 transition-colors hover:text-blue-600"
                      >
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 mb-3 flex items-center gap-2 border-t border-slate-200 pt-6 text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                  Legal
                </h3>
                <ul className="space-y-2">
                  {LEGAL_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        href={item.to}
                        className="block text-[13px] text-slate-500 transition-colors hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="max-w-3xl text-slate-600">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
