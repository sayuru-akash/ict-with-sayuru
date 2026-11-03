"use client";

import { SITE } from "@/lib/site";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Download, Share, SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSmoothHashClick } from "@/components/Navbar";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && navigator.maxTouchPoints > 1)
  );
}

function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setInstalled(isStandaloneMode());
    setIos(isIosDevice());

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    return outcome === "accepted";
  }, [deferredPrompt]);

  return {
    canInstall: !installed && (deferredPrompt !== null || ios),
    hasNativePrompt: deferredPrompt !== null,
    ios,
    installed,
    promptInstall,
  };
}

export function InstallAppButton({ className }: { className?: string }) {
  const { canInstall, hasNativePrompt, ios, promptInstall } = usePwaInstall();
  const [iosModalOpen, setIosModalOpen] = useState(false);

  if (!canInstall) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (hasNativePrompt) {
            promptInstall();
          } else if (ios) {
            setIosModalOpen(true);
          }
        }}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm transition-colors",
          className
        )}
      >
        <Download className="size-4" />
        Install app
      </button>

      <Dialog open={iosModalOpen} onOpenChange={setIosModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Install this app</DialogTitle>
            <DialogDescription>
              Add Sayuru Amarasinghe to your Home Screen for a full-screen app
              experience.
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-4 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                1
              </span>
              <span className="flex items-center gap-1.5">
                Tap the <Share className="inline size-4 text-blue-600" />
                <strong>Share</strong> button in Safari&apos;s toolbar
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                2
              </span>
              <span className="flex items-center gap-1.5">
                Scroll down and tap{" "}
                <SquarePlus className="inline size-4 text-blue-600" />
                <strong>Add to Home Screen</strong>
              </span>
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </>
  );
}

const FOOTER_NAVIGATION = [
  { href: "#programmes", label: "A/L & O/L Programmes" },
  { href: "#about-teacher", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faqs", label: "FAQs" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const FOOTER_SOCIALS = [
  { href: SITE.facebook, label: "Facebook" },
  { href: SITE.whatsapp, label: "WhatsApp" },
];

const FOOTER_CONTACT = [
  { href: `mailto:${SITE.email}`, label: SITE.email },
  { href: `tel:${SITE.phoneHref}`, label: SITE.phone },
  { href: SITE.whatsapp, label: "Contact us" },
];

function FooterColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-slate-500 uppercase">
      <span className="h-1 w-1 rounded-full bg-blue-500" />
      {children}
    </h3>
  );
}

function FooterLinkItem({ href, label }: { href: string; label: string }) {
  const handleHashClick = useSmoothHashClick();
  const isExternal = href.startsWith("http");
  const isRoute = href.startsWith("/");
  const linkClass =
    "group inline-flex items-center gap-1.5 py-1 text-[14px] text-slate-500 transition-colors hover:text-blue-600";

  if (isRoute) {
    return (
      <li>
        <Link href={href} className={linkClass}>
          <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        onClick={isExternal ? undefined : (e) => handleHashClick(e, href)}
        className={linkClass}
      >
        <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" aria-label="Sayuru Amarasinghe home" className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              <img
                src="/logos/sayuru-mark.svg"
                alt=""
                className="h-8 w-8 flex-shrink-0 object-contain"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-slate-900">
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  Sayuru
                </span>{" "}
                Amarasinghe
              </span>
            </Link>
            <div className="h-px w-full max-w-[220px] bg-slate-200" />
            <p className="max-w-md leading-relaxed text-slate-500">
              ලංකාවේ හොඳම Online ICT පන්තිය. GCE A/L සහ O/L විෂය නිර්දේශ ආවරණය කරමින්
              ඔබව සාර්ථකත්වයට රැගෙන යයි.
            </p>
            <InstallAppButton className="rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-600" />
          </div>

          <div>
            <FooterColumnHeading>Navigation</FooterColumnHeading>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {FOOTER_NAVIGATION.map((item) => (
                  <FooterLinkItem key={item.href} {...item} />
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <FooterColumnHeading>Socials</FooterColumnHeading>
            <ul className="space-y-2.5">
              {FOOTER_SOCIALS.map((item) => (
                <FooterLinkItem key={item.label} {...item} />
              ))}
            </ul>
          </div>

          <div>
            <FooterColumnHeading>Contact</FooterColumnHeading>
            <ul className="space-y-2.5">
              {FOOTER_CONTACT.map((item) => (
                <FooterLinkItem key={item.label} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="relative overflow-hidden bg-white pt-2"
        style={{ minHeight: 520 }}
      >
        <svg
          viewBox="0 0 1200 483"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[640px] w-full"
          aria-hidden="true"
        >
          <g filter="url(#footer_glow_0)">
            <path
              d="M41.3469 186C528.326 486.107 987.148 311.045 1155.69 186H1235V470H-34V186H41.3469Z"
              fill="#1D4ED8"
            />
          </g>
          <g filter="url(#footer_glow_1)">
            <path
              d="M41.3469 243C528.326 543.107 987.148 368.045 1155.69 243H1235V527H-34V243H41.3469Z"
              fill="#3B82F6"
            />
          </g>
          <g filter="url(#footer_glow_2)">
            <path
              d="M41.3469 294C528.326 594.107 987.148 419.045 1155.69 294H1235V578H-34V294H41.3469Z"
              fill="#1E3A8A"
            />
          </g>
          <defs>
            <filter
              id="footer_glow_0"
              x="-144"
              y="76"
              width="1489"
              height="504"
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
              <feGaussianBlur stdDeviation="55" />
            </filter>
            <filter
              id="footer_glow_1"
              x="-61.5"
              y="215.5"
              width="1324"
              height="339"
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
              <feGaussianBlur stdDeviation="13.75" />
            </filter>
            <filter
              id="footer_glow_2"
              x="-144"
              y="184"
              width="1489"
              height="504"
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
              <feGaussianBlur stdDeviation="55" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-x-0 bottom-0">
          <span
            className="pointer-events-none relative block w-full select-none text-center whitespace-nowrap uppercase leading-[0.8]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.4rem, 10.5vw, 12rem)",
              letterSpacing: "0.01em",
              backgroundImage:
                "linear-gradient(0deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 45%, rgba(37,99,235,0) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              paddingTop: "0.15em",
              transform: "perspective(500px) translateZ(11px) rotateX(5deg)",
            }}
            aria-hidden="true"
          >
            SAYURU AMARASINGHE
          </span>
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/15 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
            <p className="text-sm text-white/80">
              All rights reserved. © {new Date().getFullYear()}{" "}
              Sayuru Amarasinghe
            </p>
            <a
              href="https://codezela.com"
              className="text-sm text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Codezela Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
