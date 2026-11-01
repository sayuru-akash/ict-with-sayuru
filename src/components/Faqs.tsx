"use client";

import { SITE } from "@/lib/site";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
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
      "A/L සහ O/L ICT Online පන්තිවලට ලංකාව පුරා ඕනෑම තැනක සිට සම්බන්ධ විය හැක. Class link එක Class Schedule එකේ තියෙන WhatsApp button එකෙන් ලැබේ.",
  },
  {
    tag: "Classes",
    question: "Class එකක් missed උනොත් recording ලැබෙනවද?",
    answer:
      "ඔව්, සෑම class එකකම recording එක ඔබගේ Dashboard එකේ ඇති Class Detail පිටුවෙන් ඕනෑම වේලාවක නැරඹිය හැක.",
  },
  {
    tag: "Payments",
    question: "Payment කරන්නේ කොහොමද?",
    answer:
      'Dashboard එකේ Payments පිටුවෙන් Bank Transfer එකක් කර, Deposit Slip එකේ පින්තූරයක් Reference Number එකක් සමඟ upload කරන්න. එසේම Online Payment සිදු කිරීමට "Pay Online" Button එක Click කරන්න. Credit Card, Visa, Master සහ Lanka QR හරහා මුදල් ගෙවිය හැක.',
  },
  {
    tag: "Payments",
    question: "Payment එක verify වෙන්න කොච්චර වෙලා යනවද?",
    answer:
      "සාමාන්‍යයෙන් පැය 2-4 ඇතුලත verify කරනු ලැබේ. Slip එක reject උනොත් හේතුව Payments පිටුවෙන් පෙන්වන අතර, පැහැදිලි පින්තූරයක් නැවත upload කළ හැක.",
  },
  {
    tag: "Support",
    question: "ප්‍රශ්නයක් ආවොත් අහන්නේ කොහොමද?",
    answer:
      "WhatsApp මගින් සෘජුවම අපිව සම්බන්ධ කරගත හැක - පිටුවේ පහළම සහ Class Schedule එකේ තියෙන WhatsApp button එකෙන් කෙටි පණිවිඩයක් යවන්න.",
  },
  {
    tag: "Progress",
    question: "මගේ Rank සහ Marks track කරගන්නේ කොහොමද?",
    answer:
      "Dashboard එකේ ඇති Ranks සහ Marks පිටු දෙකෙන්ම ඔබගේ ලකුණු, Rank සහ ප්‍රගතිය සජීවීව නිරීක්ෂණය කළ හැක.",
  },
];

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(index === 0);

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
        className="relative flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <span className="mb-1.5 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-blue-600">
            {item.tag}
          </span>
          <span className="block text-[15px] font-semibold text-slate-800">
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
        className="relative grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14px] leading-relaxed text-slate-500">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PromptLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 text-[12.5px]">
      <span className="text-sky-600">guest</span>
      <span className="text-emerald-600">:</span>
      <span className="text-sky-500">~</span>
      <span className="text-slate-500">$</span>
      <span className="text-slate-500">{children}</span>
    </div>
  );
}

function TerminalInput({
  id,
  command,
  placeholder,
  type = "text",
  textarea,
  value,
  onChange,
  grow,
}: {
  id: string;
  command: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (val: string) => void;
  grow?: boolean;
}) {
  const inputClasses =
    "w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[13px] text-slate-800 outline-none transition-colors placeholder:text-slate-300 focus:border-blue-400 focus:bg-white";

  return (
    <div className={grow ? "flex flex-1 flex-col" : undefined}>
      <PromptLabel>{command}</PromptLabel>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          required
          className={`${inputClasses} resize-none ${grow ? "flex-1" : ""}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className={inputClasses}
        />
      )}
    </div>
  );
}

function ContactTerminalForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
    >
      <div className="flex items-center gap-2 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs text-slate-500">
          contact - bash
        </div>
        <div className="w-[52px]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col p-5 sm:p-6"
      >
        <p className="mb-4 font-mono text-[12.5px] text-slate-500">
          # ප්‍රශ්නයක් තියෙනවද? අපිට ලියන්න, ඉක්මනින් reply කරන්නම්
        </p>
        <div className="flex flex-1 flex-col gap-4">
          <TerminalInput
            id="contact-name"
            command="set --name"
            placeholder="ඔබගේ නම..."
            value={name}
            onChange={setName}
          />
          <TerminalInput
            id="contact-email"
            command="set --email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <TerminalInput
            id="contact-message"
            command="set --message"
            placeholder="ඔබගේ පණිවිඩය..."
            textarea
            value={message}
            onChange={setMessage}
            grow
          />
        </div>
        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 font-mono text-[13px] font-medium text-white transition-colors hover:bg-blue-500 sm:w-auto"
        >
          {sent ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <span className="text-emerald-400">$</span>
          )}
          ./send_message.sh
        </button>
      </form>
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
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-3">
            {FAQS_DATA.map((item, idx) => (
              <FaqAccordionItem key={item.question} item={item} index={idx} />
            ))}
          </div>
          <ContactTerminalForm />
        </div>
      </div>
    </section>
  );
}
