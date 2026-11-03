"use client";

import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeader } from "@/components/ui/section-header";

const PLAN_FEE = `Rs. ${PLAN.fee.toLocaleString("en-LK")}`;


const ENQUIRIES = [
  { tag: "2027 A/L ICT", title: "2027 A/L ICT - Online", sinhala: "උසස් පෙළ 2027 · මුළු දිවයිනටම", level: "2027 A/L", description: "Contact us for 2027 A/L class details and the timetable." },
  { tag: "2028 A/L ICT", title: "2028 A/L ICT - Online", sinhala: "උසස් පෙළ 2028 · මුළු දිවයිනටම", level: "2028 A/L", description: "Contact us for 2028 A/L class details and the timetable." },
  { tag: "O/L ICT", title: "O/L ICT - Online", sinhala: "සාමාන්‍ය පෙළ · මුළු දිවයිනටම", level: "O/L", description: "Contact us for O/L class details and the timetable." },
];

function TwentyDayPlanModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="relative mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          View 20 Day Plan <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent data-lenis-prevent className="max-h-[85svh] gap-5 overflow-y-auto overscroll-contain p-5 sm:max-w-2xl sm:p-7">
        <DialogHeader className="pr-6 text-left">
          <span className="mb-2 w-fit rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600">O/L ICT · ONLINE</span>
          <DialogTitle className="text-2xl font-bold leading-tight sm:text-3xl">{PLAN.name}</DialogTitle>
          <DialogDescription className="mt-1 leading-relaxed">
            {PLAN.campaignName} with {SITE.name}. A focused {PLAN.durationDays}-day study plan for G.C.E. O/L ICT students across Sri Lanka.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <p lang="si" className="text-base font-bold leading-relaxed text-slate-900">දවස් 20කින්, ඔබේ ICT සූදානමට අලුත් ආරම්භයක්.</p>
          <p lang="si" className="mt-2 text-sm leading-7 text-slate-600">දැනට F, S හෝ C මට්ටමේ සිටින සිසුන්ටත් ගැළපෙන, B හෝ ඊට ඉහළ ප්‍රතිඵලයක් ඉලක්ක කරගත් වැඩපිළිවෙළක්.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-blue-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{PLAN.durationDays} days</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5"><BookOpen className="h-3.5 w-3.5" aria-hidden="true" />{PLAN.shortNotes} short notes</span>
            <span className="rounded-full bg-white px-3 py-1.5">{PLAN.pastPaperYears} years of past papers</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-bold text-slate-900">What&apos;s included</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PLAN.highlights.map(highlight => (
              <li key={highlight.title} className="rounded-2xl border border-slate-100 p-4">
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Check className="h-4 w-4" aria-hidden="true" /></span>
                <h4 className="text-sm font-bold leading-relaxed text-slate-900">{highlight.title}</h4>
                <p lang="si" className="mt-1.5 text-[13px] leading-6 text-slate-600">{highlight.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-blue-600 p-4 text-white sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-blue-100">Full programme fee · සම්පූර්ණ ගාස්තුව</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">{PLAN_FEE}</p>
            </div>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold">All {PLAN.durationDays} days</span>
          </div>
          <a href={PLAN.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />Register on WhatsApp<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-2 text-center text-xs text-blue-100">{SITE.phone}</p>
        </div>
        <p className="text-center text-xs leading-relaxed text-slate-500">Ask on WhatsApp for the starting date, class timetable and how to join.</p>
      </DialogContent>
    </Dialog>
  );
}

function TwentyDayPlanCard() {
  return (
    <article id={PLAN.id} className="relative flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-blue-700 bg-blue-600 p-6 text-white">
      <CalendarDays className="pointer-events-none absolute -right-5 top-12 h-32 w-32 -rotate-12 text-white/[0.07]" aria-hidden="true" />
      <span className="relative w-fit rounded-xl border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">O/L ICT · 20 Day Plan</span>
      <h3 className="relative mt-4 text-base font-bold">{PLAN.name}</h3>
      <p lang="si" className="relative mt-1.5 text-xs text-blue-100">සාමාන්‍ය පෙළ · මුළු දිවයිනටම</p>
      <p className="relative mt-4 text-sm leading-relaxed text-blue-50">{PLAN.durationDays} days, {PLAN.shortNotes} short notes and focused theory &amp; past-paper practice.</p>
      <div className="relative mt-4 mb-5 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight">{PLAN_FEE}</span>
        <span className="text-xs text-blue-100">full programme</span>
      </div>
      <TwentyDayPlanModal />
    </article>
  );
}

function EnquiryCard({ enquiry }: { enquiry: (typeof ENQUIRIES)[number] }) {
  const href = `${SITE.whatsapp}?text=${encodeURIComponent(`${SITE.messageGreeting} I would like to join ${enquiry.level} ICT online classes. Please share the timetable and class details.`)}`;
  return (
    <article className="relative flex flex-col overflow-hidden rounded-3xl border border-blue-200 bg-blue-50 p-6 text-slate-900">
      <span className="w-fit rounded-xl border border-blue-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">{enquiry.tag}</span>
      <h3 className="mt-4 text-base font-bold">{enquiry.title}</h3>
      <p lang="si" className="mt-1.5 text-xs text-slate-600">{enquiry.sinhala}</p>
      <p className="mt-4 mb-5 text-sm leading-relaxed text-slate-600">{enquiry.description}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${enquiry.level} ICT classes on WhatsApp`} className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
        Ask about {enquiry.level} <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </a>
    </article>
  );
}

export function ClassLocations() {
  return (
    <section id="flow" className="relative overflow-hidden bg-white px-4 pb-24">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          animation="/animations/journy.tgs"
          className="mb-14"
          badge="Online Classes"
          heading="ඕනෑම තැනක සිට ICT ඉගෙනගන්න"
          subtitle="Online A/L & O/L ICT with Sayuru Amarasinghe · මුළු දිවයිනටම"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <TwentyDayPlanCard />
          {ENQUIRIES.map(enquiry => <EnquiryCard key={enquiry.level} enquiry={enquiry} />)}
        </div>
      </div>
    </section>
  );
}
