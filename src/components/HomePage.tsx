"use client";

import React, { Suspense, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { AuthQueryHandler } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AboutTeacher } from "@/components/AboutTeacher";
import { Testimonials } from "@/components/Testimonials";
import { ClassLocations } from "@/components/ClassLocations";
import { Faqs } from "@/components/Faqs";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const LENIS_ROOT_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
  wheelMultiplier: 0.85,
  touchMultiplier: 0.85,
};

function HashScrollWatcher() {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const frame = requestAnimationFrame(() => lenis?.scrollTo(hash));
    return () => cancelAnimationFrame(frame);
  }, [lenis]);

  return null;
}

export function HomePage() {
  return (
    <ReactLenis root options={LENIS_ROOT_OPTIONS}>
      <HashScrollWatcher />
      <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
        <Suspense fallback={null}>
          <AuthQueryHandler />
        </Suspense>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Features />
          <AboutTeacher />
          <Testimonials />
          <ClassLocations />
          <Faqs />
          <FeedbackSection />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </ReactLenis>
  );
}
