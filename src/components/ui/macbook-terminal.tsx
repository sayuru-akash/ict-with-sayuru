"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const KEY_DOWN_OFFSETS: Record<string, [number, number]> = {
  A: [31542, 85],
  B: [40621, 107],
  C: [39632, 95],
  D: [32492, 85],
  E: [23317, 83],
  F: [32973, 87],
  G: [33453, 94],
  H: [33986, 93],
  I: [25795, 91],
  J: [34425, 88],
  K: [34932, 90],
  L: [35410, 95],
  M: [41610, 93],
  N: [41103, 90],
  O: [26309, 84],
  P: [26804, 83],
  Q: [22245, 95],
  R: [23817, 92],
  S: [32031, 88],
  T: [24297, 92],
  U: [25313, 95],
  V: [40136, 94],
  W: [22790, 89],
  X: [39148, 76],
  Y: [24811, 93],
  Z: [38694, 80],
  " ": [51541, 144],
  "-": [42594, 90],
  "@": [23317, 83],
  "/": [42594, 90],
  ".": [42594, 90],
  ":": [42594, 90],
  "0": [26309, 84],
  "1": [25313, 95],
  "2": [23317, 83],
  "3": [23817, 92],
  "4": [24297, 92],
  "5": [24811, 93],
  "6": [25313, 95],
  "7": [25795, 91],
  "8": [26309, 84],
  "9": [26804, 83],
  Enter: [19065, 110],
};

const KEY_UP_OFFSETS: Record<string, [number, number]> = {
  A: [31632, 80],
  B: [40736, 95],
  C: [39732, 85],
  D: [32577, 80],
  E: [23402, 80],
  F: [33063, 80],
  G: [33553, 85],
  H: [34081, 85],
  I: [25890, 85],
  J: [34515, 85],
  K: [35027, 85],
  L: [35510, 85],
  M: [41710, 85],
  N: [41198, 85],
  O: [26394, 80],
  P: [26889, 80],
  Q: [22345, 85],
  R: [23912, 85],
  S: [32121, 80],
  T: [24392, 85],
  U: [25413, 85],
  V: [40236, 85],
  W: [22880, 85],
  X: [39228, 70],
  Y: [24911, 85],
  Z: [38779, 75],
  " ": [51691, 130],
  "-": [42689, 85],
  "@": [23402, 80],
  "/": [42689, 85],
  ".": [42689, 85],
  ":": [42689, 85],
  "0": [26394, 80],
  "1": [25413, 85],
  "2": [23402, 80],
  "3": [23912, 85],
  "4": [24392, 85],
  "5": [24911, 85],
  "6": [25413, 85],
  "7": [25890, 85],
  "8": [26394, 80],
  "9": [26889, 80],
  Enter: [19180, 100],
};

function useKeySound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      try {
        ctxRef.current = new AudioContext();
        const res = await fetch("/sounds/sound.wav");
        if (!res.ok) return;
        bufferRef.current = await ctxRef.current.decodeAudioData(
          await res.arrayBuffer()
        );
        loadedRef.current = true;
      } catch {}
    })();
    return () => {
      ctxRef.current?.close();
    };
  }, [enabled]);

  const playSlice = (slice?: [number, number]) => {
    if (!loadedRef.current || !ctxRef.current || !bufferRef.current || !slice)
      return;
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    const source = ctxRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(ctxRef.current.destination);
    source.start(0, slice[0] / 1000, slice[1] / 1000);
  };

  return {
    down: (key: string) =>
      playSlice(KEY_DOWN_OFFSETS[key.toUpperCase()] || KEY_DOWN_OFFSETS[key]),
    up: (key: string) =>
      playSlice(KEY_UP_OFFSETS[key.toUpperCase()] || KEY_UP_OFFSETS[key]),
  };
}

function useTerminalInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggeredRef.current)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          setInView(true);
          if (once) {
            triggeredRef.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

function tokenizeCommand(text: string): Array<{ type: TokenType; value: string }> {
  const tokens: Array<{ type: TokenType; value: string }> = [];
  const parts = text.split(/(\s+)/);
  let expectCommand = true;

  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      tokens.push({ type: "default", value: part });
      continue;
    }
    if (part.startsWith("#")) {
      tokens.push({ type: "comment", value: part });
      continue;
    }
    if (part.startsWith("$")) {
      tokens.push({ type: "variable", value: part });
      expectCommand = false;
      continue;
    }
    if (part.startsWith("--") || part.startsWith("-")) {
      tokens.push({ type: "flag", value: part });
      expectCommand = false;
      continue;
    }
    if (/^["'].*["']$/.test(part)) {
      tokens.push({ type: "string", value: part });
      expectCommand = false;
      continue;
    }
    if (/^\d+$/.test(part)) {
      tokens.push({ type: "number", value: part });
      expectCommand = false;
      continue;
    }
    if (/^[|>&<]+$/.test(part)) {
      tokens.push({ type: "operator", value: part });
      expectCommand = true;
      continue;
    }
    if (part.includes("/") || part.startsWith(".") || part.startsWith("~")) {
      tokens.push({ type: "path", value: part });
      expectCommand = false;
      continue;
    }
    if (expectCommand) {
      tokens.push({ type: "command", value: part });
      expectCommand = false;
      continue;
    }
    tokens.push({ type: "default", value: part });
  }
  return tokens;
}

const DARK_COLORS: Record<TokenType, string> = {
  command: "text-emerald-400",
  flag: "text-sky-400",
  string: "text-amber-300",
  number: "text-purple-400",
  operator: "text-red-400",
  path: "text-cyan-300",
  variable: "text-pink-400",
  comment: "text-neutral-500",
  default: "text-neutral-300",
};

const LIGHT_COLORS: Record<TokenType, string> = {
  command: "text-emerald-600",
  flag: "text-sky-600",
  string: "text-amber-600",
  number: "text-purple-600",
  operator: "text-red-600",
  path: "text-cyan-700",
  variable: "text-pink-600",
  comment: "text-slate-400",
  default: "text-slate-700",
};

function HighlightedCommand({
  text,
  theme,
}: {
  text: string;
  theme: "light" | "dark";
}) {
  const tokens = tokenizeCommand(text);
  const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={colors[tok.type]}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

interface MacbookTerminalProps {
  commands?: string[];
  outputs?: Record<number, string[]>;
  username?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
  enableSound?: boolean;
  theme?: "light" | "dark";
  transparent?: boolean;
}

export function MacbookTerminal({
  commands = ["npx shadcn@latest init"],
  outputs = {},
  username = "Manus-Macbook",
  className,
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
  enableSound = true,
  theme = "dark",
  transparent = false,
}: MacbookTerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inView = useTerminalInView(containerRef);
  const { down, up } = useKeySound(enableSound);

  const [history, setHistory] = useState<
    Array<{ type: "command" | "output"; content: string }>
  >([]);
  const [typedText, setTypedText] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outIdx, setOutIdx] = useState(-1);
  const [phase, setPhase] = useState<
    "idle" | "typing" | "executing" | "outputting" | "pausing" | "done"
  >("idle");
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[cmdIdx] || "";
  const currentOutputs = useMemo(
    () => outputs[cmdIdx] || [],
    [outputs, cmdIdx]
  );
  const isLastCommand = cmdIdx === commands.length - 1;

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const timer = setTimeout(() => setPhase("typing"), initialDelay);
    return () => clearTimeout(timer);
  }, [inView, phase, initialDelay]);

  useEffect(() => {
    if (phase === "typing") {
      if (charIdx < currentCommand.length) {
        const ch = currentCommand[charIdx];
        down(ch);
        const timer = setTimeout(() => {
          up(ch);
          setTypedText(currentCommand.slice(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, typingSpeed + Math.random() * 30);
        return () => clearTimeout(timer);
      } else {
        down("Enter");
        const timer = setTimeout(() => {
          up("Enter");
          setPhase("executing");
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, charIdx, currentCommand, typingSpeed, down, up]);

  useEffect(() => {
    if (phase === "executing") {
      setHistory((prev) => [
        ...prev,
        { type: "command", content: currentCommand },
      ]);
      setTypedText("");
      if (currentOutputs.length > 0) {
        setOutIdx(0);
        setPhase("outputting");
      } else {
        setPhase(isLastCommand ? "done" : "pausing");
      }
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase === "outputting") {
      if (outIdx >= 0 && outIdx < currentOutputs.length) {
        const timer = setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: "output", content: currentOutputs[outIdx] },
          ]);
          setOutIdx((prev) => prev + 1);
        }, 150);
        return () => clearTimeout(timer);
      } else if (outIdx >= currentOutputs.length) {
        const timer = setTimeout(() => {
          setPhase(isLastCommand ? "done" : "pausing");
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, outIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== "pausing") return;
    const timer = setTimeout(() => {
      setCharIdx(0);
      setOutIdx(-1);
      setCmdIdx((prev) => prev + 1);
      setPhase("typing");
    }, delayBetweenCommands);
    return () => clearTimeout(timer);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const isLight = theme === "light";

  const promptPrefix = (
    <span className={isLight ? "text-slate-400" : "text-neutral-500"}>
      <span className={isLight ? "text-sky-600" : "text-sky-500"}>
        {username}
      </span>
      <span className="text-emerald-600">:</span>
      <span className={isLight ? "text-sky-500" : "text-sky-400"}>~</span>
      <span className={isLight ? "text-slate-400" : "text-neutral-500"}>$</span>{" "}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto w-full max-w-xl px-4 font-mono text-xs", className)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-lg border shadow-2xl",
          isLight
            ? "border-slate-200 bg-white"
            : "border-neutral-800 bg-neutral-900",
          transparent &&
            (isLight
              ? "border-white/60 bg-white/55 backdrop-blur-md"
              : "border-neutral-700/60 bg-neutral-900/70 backdrop-blur-md")
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3",
            isLight ? "bg-slate-50" : "bg-neutral-800",
            transparent && (isLight ? "bg-slate-50/50" : "bg-neutral-800/60")
          )}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600" />
            <div className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600" />
            <div className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600" />
          </div>
          <div className="flex-1 text-center">
            <span
              className={cn(
                "truncate text-xs",
                isLight ? "text-slate-500" : "text-neutral-400"
              )}
            >
              {username} - bash
            </span>
          </div>
          <div className="w-[52px]" />
        </div>
        <div
          ref={bodyRef}
          className="h-[580px] overflow-hidden p-4 font-mono text-[15px] sm:h-[440px] sm:text-base"
        >
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed whitespace-pre-wrap">
              {item.type === "command" ? (
                <span>
                  {promptPrefix}
                  <HighlightedCommand text={item.content} theme={theme} />
                </span>
              ) : (
                <span
                  className={isLight ? "text-slate-500" : "text-neutral-400"}
                >
                  {item.content}
                </span>
              )}
            </div>
          ))}
          {phase === "typing" && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {promptPrefix}
              <HighlightedCommand text={typedText} theme={theme} />
              <span
                className={cn(
                  "ml-0.5 inline-block h-4 w-2 align-middle",
                  isLight ? "bg-slate-700" : "bg-neutral-300"
                )}
              />
            </div>
          )}
          {(phase === "done" ||
            phase === "pausing" ||
            phase === "outputting") && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {promptPrefix}
              <span
                className={cn(
                  "inline-block h-4 w-2 align-middle transition-opacity duration-100",
                  isLight ? "bg-slate-700" : "bg-neutral-300",
                  !cursorVisible && "opacity-0"
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
