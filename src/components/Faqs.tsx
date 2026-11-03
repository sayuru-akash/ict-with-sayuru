"use client";

import { SITE } from "@/lib/site";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";
import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

interface FaqItem {
  tag: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    tag: "Classes",
    question: 'Online class එකට සම්බන්ධ වෙන්නේ කොහොමද?',
    answer:
      "A/L සහ O/L ICT Online පන්තිවලට ලංකාව පුරා ඕනෑම තැනක සිට සම්බන්ධ විය හැක. Online Classes කොටසෙන් ඔබට අදාළ පන්තිය තෝරා WhatsApp මගින් අපව සම්බන්ධ කරගන්න. ලියාපදිංචිය තහවුරු කළ පසු Class link එක ලැබේ.",
  },
  {
    tag: "Classes",
    question: "Class එකක් missed උනොත් recording ලැබෙනවද?",
    answer:
      "ඔව්, සෑම class එකකම recording එක ඔබගේ LMS එකේ ඇති Class Detail පිටුවෙන් ඕනෑම වේලාවක නැරඹිය හැක.",
  },
  {
    tag: "Payments",
    question: "Payment කරන්නේ කොහොමද?",
    answer:
      'System එකේ Payments පිටුවෙන් Bank Transfer එකක් කර, Deposit Slip එකේ පින්තූරයක් Reference Number එකක් සමඟ upload කරන්න. එසේම Online Payment සිදු කිරීමට "Pay Online" Button එක Click කරන්න. Credit Card, Visa, Master සහ Lanka QR හරහා මුදල් ගෙවිය හැක.',
  },
  {
    tag: "Payments",
    question: "Payment එක verify වෙන්න කොච්චර වෙලා යනවද?",
    answer:
      "සාමාන්‍යයෙන් දින 2ක් ඇතුළත verify කරනු ලැබේ. Slip එක reject උනොත් හේතුව Payments පිටුවෙන් පෙන්වන අතර, පැහැදිලි පින්තූරයක් නැවත upload කළ හැක.",
  },
  {
    tag: "Support",
    question: "ප්‍රශ්නයක් ආවොත් අහන්නේ කොහොමද?",
    answer:
      "WhatsApp මගින් සෘජුවම අපිව සම්බන්ධ කරගත හැක - පිටුවේ පහළම තියෙන WhatsApp button එකෙන් කෙටි පණිවිඩයක් යවන්න.",
  },
  {
    tag: "20 Day Plan",
    question: "O/L ICT 20 Day Plan එකේ ඇතුළත් වෙන්නේ මොනවාද?",
    answer:
      `දින ${PLAN.durationDays}ක වැඩපිළිවෙළට කෙටි සටහන් පොත් ${PLAN.shortNotes}ක්, විශේෂ Theory පාඩම් සාකච්ඡා සහ පසුගිය වසර ${PLAN.pastPaperYears}ක Past Papers හා විභාග ඉලක්ක ප්‍රශ්න සාකච්ඡා ඇතුළත් වේ. සම්පූර්ණ ගාස්තුව රු. ${PLAN.fee.toLocaleString("en-LK")}යි. වැඩි විස්තර සහ ලියාපදිංචිය සඳහා Online Classes කොටසේ View 20 Day Plan button එක තෝරන්න.`,
  },
];

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const id = useId();
  const buttonId = `faq-question-${id}`;
  const panelId = `faq-answer-${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-colors duration-300 hover:border-blue-200"
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-blue-400/0 blur-2xl transition-colors duration-500 group-hover:bg-blue-400/15" />
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        id={buttonId}
        className="relative flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:px-7 sm:py-6"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div className="min-w-0">
          <span className="mb-1.5 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-blue-600">
            {item.tag}
          </span>
          <span className="block text-[15px] font-semibold leading-relaxed text-slate-800 sm:text-base">
            {item.question}
          </span>
        </div>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-100 bg-slate-50 text-slate-400 group-hover:border-blue-100 group-hover:text-blue-500"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className="relative grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-sm leading-7 text-slate-600 sm:px-7 sm:text-[15px]">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Faqs() {
  return (
    <section
      id="faqs"
      className="relative overflow-hidden bg-[#f7f9ff] px-4 pb-24"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          animation="/animations/faq.tgs"
          className="mb-12"
          badge="FAQs"
          heading="නිතර අසන ප්‍රශ්න"
          subtitle="පන්ති, ගෙවීම් සහ ලියාපදිංචිය ගැන ඔබට අවශ්‍ය පිළිතුරු."
        />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-3 sm:gap-4">
            {FAQS_DATA.map((item, idx) => (
              <FaqAccordionItem key={item.question} item={item} index={idx} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white p-5 text-center sm:flex-row sm:px-7 sm:text-left">
            <p className="text-sm font-medium text-slate-600">තවත් ප්‍රශ්නයක් තියෙනවද? අපිව සම්බන්ධ කරගන්න.</p>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(`${SITE.messageGreeting} I have a question about your ICT online classes.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
