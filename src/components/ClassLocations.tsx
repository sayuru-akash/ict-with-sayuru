"use client";

import { SITE } from "@/lib/site";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface ClassScheduleItem {
  day: string;
  daySinhala: string;
  time: string;
  classType: string;
  classTypeSinhala: string;
  whatsappUrl: string;
  youtubeUrl: string;
}

interface YearOffering {
  year: string;
  classes: ClassScheduleItem[];
}

interface LocationData {
  slug: string;
  name: string;
  place: string;
  placeSinhala: string;
  instituteName?: string;
  mapQuery?: string;
  address?: string;
  online?: boolean;
  offerings: YearOffering[];
}

const LOCATIONS_DATA: LocationData[] = [
  {
    slug: "online-islandwide",
    name: "Online",
    place: "Island-wide",
    placeSinhala: "මුළු දිවයිනටම",
    online: true,
    offerings: [
      {
        year: "2026",
        classes: [
          {
            day: "Wednesday",
            daySinhala: "බදාදා",
            time: "20:00 - 23:00",
            classType: "Live Class",
            classTypeSinhala: "සජීවී පන්තිය",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
          {
            day: "Friday",
            daySinhala: "සිකුරාදා",
            time: "20:00 - 23:00",
            classType: "Live Class",
            classTypeSinhala: "සජීවී පන්තිය",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
          {
            day: "Saturday",
            daySinhala: "සෙනසුරාදා",
            time: "20:00 - 23:00",
            classType: "Live Class",
            classTypeSinhala: "සජීවී පන්තිය",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
          {
            day: "Sunday",
            daySinhala: "ඉරිදා",
            time: "20:00 - 23:00",
            classType: "Live Class",
            classTypeSinhala: "සජීවී පන්තිය",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
          {
            day: "Thursday",
            daySinhala: "බ්‍රහස්පතින්දා",
            time: "19:00 - 23:00",
            classType: "Repeat Class (Not Mandatory)",
            classTypeSinhala: "නැවත පන්තිය (අනිවාර්ය නොවේ)",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
        ],
      },
      {
        year: "2027",
        classes: [
          {
            day: "Thursday",
            daySinhala: "බ්‍රහස්පතින්දා",
            time: "07:00 - 09:00",
            classType: "Class 01",
            classTypeSinhala: "පන්තිය 01",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
          {
            day: "Thursday",
            daySinhala: "බ්‍රහස්පතින්දා",
            time: "09:00 - 11:00",
            classType: "Class 02",
            classTypeSinhala: "පන්තිය 02",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
        ],
      },
      {
        year: "2028",
        classes: [
          {
            day: "Thursday",
            daySinhala: "බ්‍රහස්පතින්දා",
            time: "07:00 - 09:00",
            classType: "Live Class",
            classTypeSinhala: "සජීවී පන්තිය",
            whatsappUrl: SITE.whatsapp,
            youtubeUrl: "",
          },
        ],
      },
    ],
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.71 14.19c-.24.68-1.19 1.25-1.95 1.41-.52.11-1.19.19-3.47-.74-2.91-1.2-4.79-4.14-4.94-4.33-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="6" fill="currentColor" />
      <path d="M11.2 6l8.4 4-8.4 4V6z" fill="#fff" />
    </svg>
  );
}

function PhysicalRadarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2.75" fill="currentColor" />
      <circle
        cx="12"
        cy="12"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.55}
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.25}
      />
    </svg>
  );
}

function OnlineRadarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2.75" fill="currentColor" />
      <circle
        cx="12"
        cy="12"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="2.2 2.6"
        opacity={0.7}
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="1.6 3"
        opacity={0.4}
      />
    </svg>
  );
}

const MODAL_TRANSITION = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

function SocialActionLink({
  href,
  logo,
  label,
  fill,
  text,
}: {
  href: string;
  logo: React.ReactNode;
  label: string;
  fill: string;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex flex-1 items-center gap-2.5 rounded-full border-2 py-1.5 pr-4 pl-1.5 transition-colors duration-200 ${fill}`}
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white">
        {logo}
      </span>
      <span className={`text-[13px] font-bold ${text}`}>{label}</span>
    </a>
  );
}

function ClassScheduleCard({ cls }: { cls: ClassScheduleItem }) {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
          {cls.classType} / {cls.classTypeSinhala}
        </span>
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-slate-800">
        <Clock
          className="h-3.5 w-3.5 flex-shrink-0 text-blue-500"
          aria-hidden="true"
        />
        {cls.day}{" "}
        <span className="font-normal text-slate-400">({cls.daySinhala})</span>
        <span className="text-slate-300">·</span> {cls.time}
      </p>
      <div className="mt-3.5 flex gap-2.5">
        <SocialActionLink
          href={cls.whatsappUrl}
          logo={<WhatsAppIcon className="h-4 w-4 text-emerald-500" />}
          label="WhatsApp"
          fill="border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-none hover:bg-white"
          text="text-white group-hover:text-blue-700"
        />
        {cls.youtubeUrl && <SocialActionLink
          href={cls.youtubeUrl}
          logo={<YouTubeIcon className="h-4 w-5 text-red-600" />}
          label="YouTube"
          fill="border-blue-700 bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-none hover:bg-white"
          text="text-white group-hover:text-blue-800"
        />}
      </div>
    </div>
  );
}

function LocationOfferingsPanel({ location }: { location: LocationData }) {
  const { name, place, offerings, instituteName, online } = location;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentOffering = offerings[selectedIdx] ?? offerings[0];

  return (
    <motion.div
      layout
      transition={MODAL_TRANSITION}
      className="flex flex-col gap-5"
    >
      <div className="inline-flex w-fit gap-1 rounded-full bg-slate-100 p-1">
        {offerings.map((offering, idx) => (
          <button
            key={offering.year}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
              idx === selectedIdx
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {offering.year}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {online ? (
            <OnlineRadarIcon className="h-4 w-4" />
          ) : (
            <PhysicalRadarIcon className="h-4 w-4" />
          )}
        </span>
        <p className="truncate text-[13px] font-semibold text-slate-800">
          {online ? `${name} - ${place}` : instituteName}
        </p>
      </div>

      {currentOffering.classes.length > 1 ? (
        <motion.div
          layout
          transition={MODAL_TRANSITION}
          className="flex flex-col gap-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {currentOffering.classes.map((cls) => (
              <motion.div
                key={`${selectedIdx}-${cls.classType}-${cls.day}-${cls.time}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={MODAL_TRANSITION}
              >
                <ClassScheduleCard cls={cls} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          {currentOffering.classes.map((cls) => (
            <ClassScheduleCard
              key={`${cls.classType}-${cls.day}-${cls.time}`}
              cls={cls}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function PhysicalMapPanel({ location }: { location: LocationData }) {
  const { mapQuery, address } = location;
  if (!mapQuery) return null;
  const encodedQuery = encodeURIComponent(mapQuery);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-slate-100 lg:sticky lg:top-0">
      <iframe
        title={`Map - ${mapQuery}`}
        src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
        className="h-[280px] w-full lg:h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
        {address && (
          <p className="truncate text-[12px] font-medium text-white">
            {address}
          </p>
        )}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-[12px] font-semibold text-blue-700 backdrop-blur-sm transition-colors hover:bg-white"
        >
          Open in Maps
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function OnlineIslandMapPanel() {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col items-center justify-end overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white text-center lg:sticky lg:top-0">
      <img
        src="/images/lkmap.avif"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-contain object-top p-6 opacity-80"
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full flex-col items-center gap-2 bg-gradient-to-t from-white via-white/95 to-transparent px-6 pt-10 pb-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <OnlineRadarIcon className="h-6 w-6" />
        </span>
        <p className="text-[15px] font-semibold text-slate-900">
          Join from anywhere in Sri Lanka
        </p>
        <p className="max-w-[28ch] text-[13px] text-slate-500">
          ශ්‍රී ලංකාවේ ඕනෑම තැනක සිට සම්බන්ධ වන්න.
        </p>
      </div>
    </div>
  );
}

function LocationModal({
  location,
  trigger,
}: {
  location: LocationData;
  trigger: React.ReactNode;
}) {
  const { name, place, placeSinhala, online } = location;
  const [panelEl, setPanelEl] = useState<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!panelEl) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setPanelHeight(entry.contentRect.height);
    });
    ro.observe(panelEl);
    return () => ro.disconnect();
  }, [panelEl]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-baseline gap-2.5 text-[22px]">
            {name} <span className="text-slate-300">-</span> {place}
            <span className="text-[14px] font-normal text-slate-400">
              {placeSinhala}
            </span>
          </DialogTitle>
          <DialogDescription>
            Online A/L ICT with Sayuru Amarasinghe. Contact us on WhatsApp to join.
          </DialogDescription>
        </DialogHeader>
        <div
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start"
          style={
            {
              "--panel-h": panelHeight ? `${panelHeight}px` : "auto",
            } as React.CSSProperties
          }
        >
          <div ref={setPanelEl}>
            <LocationOfferingsPanel location={location} />
          </div>
          <div className="overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1.28,0.36,1)] lg:h-[var(--panel-h)]">
            {online ? (
              <OnlineIslandMapPanel />
            ) : (
              <PhysicalMapPanel location={location} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LocationCard({
  location,
  index,
}: {
  location: LocationData;
  index: number;
}) {
  const { name, place, placeSinhala, offerings, online } = location;
  const years = offerings.map((o) => o.year);
  const yearLabel =
    years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : years[0];

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-300",
        online
          ? "border-blue-700 bg-blue-600 text-white hover:border-blue-400"
          : "border-slate-200 bg-white text-slate-800 hover:border-blue-200"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 scale-100 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125",
          online
            ? "bg-white/15 group-hover:bg-white/25"
            : "bg-blue-400/10 group-hover:bg-blue-400/20"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "bg-grain pointer-events-none absolute inset-0",
          online ? "opacity-[0.06] mix-blend-overlay" : "opacity-[0.03]"
        )}
      />
      {online ? (
        <OnlineRadarIcon className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 text-white/15" />
      ) : (
        <PhysicalRadarIcon className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 text-blue-900/[0.08]" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase",
            online
              ? "border-white/25 bg-white/10 text-white"
              : "border-blue-100 bg-blue-50 text-blue-600"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              online ? "bg-white" : "bg-blue-500"
            )}
          />
          Enrolling
        </span>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-12",
            online ? "bg-white/15 text-white" : "bg-slate-50 text-slate-400"
          )}
        >
          <ArrowUpRight size={15} />
        </span>
      </div>

      <h3 className="relative mt-4 text-base leading-snug font-bold">
        {name}{" "}
        <span className={online ? "text-blue-200" : "text-slate-300"}>-</span>{" "}
        {place}
      </h3>
      <p
        className={cn(
          "relative mt-1.5 text-xs leading-relaxed",
          online ? "text-blue-100" : "text-slate-500"
        )}
      >
        {placeSinhala} · A/L Classes
      </p>

      <div
        className={cn(
          "relative mt-auto flex items-center justify-between pt-4 text-[10px] font-semibold tracking-wide uppercase",
          online ? "text-blue-100" : "text-slate-400"
        )}
      >
        <div className="flex items-center gap-1.5">
          <Calendar size={12} />
          {yearLabel}
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5",
            online ? "bg-white/15 text-white" : "bg-slate-50 text-slate-500"
          )}
        >
          {online ? "Online" : "Physical"}
        </span>
      </div>

      <LocationModal
        location={location}
        trigger={
          <button
            type="button"
            className={cn(
              "relative z-10 mt-5 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold transition-colors",
              online
                ? "bg-white text-blue-700 hover:bg-blue-50"
                : "bg-blue-600 text-white hover:bg-blue-500"
            )}
          >
            View Class
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        }
      />
    </motion.div>
  );
}

export function ClassLocations() {
  return (
    <section
      id="flow"
      className="relative overflow-hidden bg-white px-4 pb-24"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          animation="/animations/journy.tgs"
          className="mb-14"
          badge="Online Classes"
          heading="ඕනෑම තැනක සිට ICT ඉගෙනගන්න"
          subtitle="Online A/L & O/L ICT with Sayuru Amarasinghe · මුළු දිවයිනටම"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {LOCATIONS_DATA.flatMap((location) => location.offerings.map((offering) => ({
            ...location,
            slug: `${location.slug}-${offering.year}`,
            name: `${offering.year} A/L`,
            place: "Online",
            offerings: [offering],
          }))).map((loc, idx) => (
            <LocationCard key={loc.slug} location={loc} index={idx} />
          ))}
          <article className="relative flex flex-col overflow-hidden rounded-3xl border border-blue-200 bg-blue-50 p-6 text-slate-900">
            <span className="w-fit rounded-xl border border-blue-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">O/L ICT</span>
            <h3 className="mt-4 text-base font-bold">O/L ICT - Online</h3>
            <p className="mt-1.5 text-xs text-slate-600">සාමාන්‍ය පෙළ · මුළු දිවයිනටම</p>
            <p className="mt-4 mb-5 text-sm leading-relaxed text-slate-600">Contact Sayuru for O/L class details and the timetable.</p>
            <a href={`${SITE.whatsapp}?text=${encodeURIComponent("Hi Sayuru, I would like to join O/L ICT online classes. Please share the timetable and class details.")}`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500">
              Ask about O/L Classes <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
