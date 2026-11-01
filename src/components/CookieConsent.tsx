"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== "accepted" && saved !== "declined") {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[200] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.18)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-[19rem]"
        >
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Cookie className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-[12px] leading-relaxed text-slate-600">
              We use cookies for essential functionality and to improve your
              experience. See our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-blue-600 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="flex-1 rounded-full bg-blue-600 px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleChoice("declined")}
              className="flex-1 rounded-full bg-slate-100 px-3.5 py-2 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
