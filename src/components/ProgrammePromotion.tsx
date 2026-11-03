"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SESSION_KEY = "sayuru:20-day-plan-promotion:v1";
const OPEN_DELAY_MS = 4000;
const PUBLIC_PATHS = new Set(["/", "/privacy-policy", "/refund-policy", "/terms-and-conditions"]);

export function ProgrammePromotion() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.has(pathname);

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) {
      try { sessionStorage.setItem(SESSION_KEY, "shown"); } catch { /* Storage may be disabled. */ }
    }
    setOpen(nextOpen);
  }

  useEffect(() => {
    if (!isPublic) {
      setOpen(false);
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "shown") return;
    } catch {
      // The promotion still works when browser storage is unavailable.
    }

    let timer: ReturnType<typeof setTimeout>;
    function showWhenAvailable() {
      try { if (sessionStorage.getItem(SESSION_KEY) === "shown") return; } catch { /* Continue without storage. */ }
      const active = document.activeElement;
      const editing = active instanceof HTMLElement && active.matches("input, textarea, select, [contenteditable=true]");
      const anotherDialog = document.querySelector('[data-slot="dialog-content"][data-state="open"]');
      if (document.visibilityState !== "visible" || editing || anotherDialog) {
        timer = setTimeout(showWhenAvailable, 1000);
        return;
      }
      try {
        sessionStorage.setItem(SESSION_KEY, "shown");
      } catch {
        // Storage restrictions must not interrupt the page.
      }
      setOpen(true);
    }

    timer = setTimeout(showWhenAvailable, OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isPublic, pathname]);

  if (!isPublic) return null;

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <button type="button" aria-label="Open 20 Day F to A Plan offer" className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-white/30 bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:bottom-5 sm:left-5 sm:text-sm">
          <Sparkles className="h-4 w-4" aria-hidden="true" />20 Day F to A Plan
        </button>
      </DialogTrigger>
      <DialogContent
        data-lenis-prevent
        overlayClassName="z-[210]"
        className="z-[220] max-h-[90svh] gap-0 overflow-hidden border-blue-400/30 bg-blue-600 p-0 text-white sm:max-w-3xl [&>button]:z-10 [&>button]:bg-white/95 [&>button]:p-1.5 [&>button]:text-blue-700 [&>button]:opacity-100 [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-white [&>button]:focus-visible:ring-offset-2 [&>button]:focus-visible:ring-offset-blue-600"
      >
        <a
          data-lenis-prevent
          href={PLAN.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Join ${PLAN.campaignName} on WhatsApp`}
          onClick={() => setOpen(false)}
          className="group relative block max-h-[90svh] overflow-y-auto overscroll-contain rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-5 outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-white sm:p-8"
        >
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
            <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
          </span>
          <div className="relative grid items-center gap-2 sm:grid-cols-[1.1fr_0.9fr] sm:gap-4">
            <div className="min-w-0">
              <span className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-white sm:text-xs">O/L ICT · REGISTRATION OPEN</span>
              <DialogTitle className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[52px]">
                <span className="block">{PLAN.durationDays} Day</span>{" "}
                <span className="block text-sky-200">F to A Plan</span>
              </DialogTitle>
              <DialogDescription lang="si" className="mt-4 max-w-sm text-sm leading-7 text-blue-50">
                දින {PLAN.durationDays}ක සැලැස්මකින් ඔබේ O/L ICT විභාගයට සූදානම් වෙන්න.
              </DialogDescription>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5"><BookOpen className="h-3.5 w-3.5" aria-hidden="true" />{PLAN.shortNotes} short notes</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />Theory + past papers</span>
              </div>
            </div>
            <picture className="pointer-events-none mx-auto block w-full max-w-[320px] sm:max-w-none">
              <source type="image/avif" srcSet="/images/20-day-plan-promo-480.avif 480w, /images/20-day-plan-promo.avif 960w" sizes="(min-width: 768px) 300px, (min-width: 640px) 250px, (min-width: 400px) 320px, calc(100vw - 72px)" />
              <img
                src="/images/20-day-plan-promo.webp"
                srcSet="/images/20-day-plan-promo-480.webp 480w, /images/20-day-plan-promo.webp 960w"
                sizes="(min-width: 768px) 300px, (min-width: 640px) 250px, (min-width: 400px) 320px, calc(100vw - 72px)"
                width={960}
                height={640}
                alt=""
                decoding="async"
                className="mx-auto h-[125px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none sm:h-auto sm:max-h-[300px]"
                draggable={false}
              />
            </picture>
          </div>
          <div className="relative mt-3 flex flex-col gap-4 border-t border-white/20 pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
            <p className="flex items-baseline gap-2 text-white">
              <span className="text-[28px] font-extrabold tracking-tight">Rs. {PLAN.fee.toLocaleString("en-LK")}</span>
              <span className="text-xs font-medium text-blue-100">Full programme</span>
            </p>
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg shadow-blue-950/10 transition-colors group-hover:bg-blue-50">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />Join on WhatsApp<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </a>
      </DialogContent>
    </Dialog>
  );
}
