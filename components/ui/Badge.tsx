import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "alert" | "pending";
  /** The 6px round dot — a span in `currentColor`, not an icon. */
  dot?: boolean;
};

const TONE = {
  neutral: "border-ink-600 bg-transparent text-bone-300",
  accent: "border-green-600 bg-green-wash text-green-500",
  alert: "border-signal-red bg-transparent text-signal-red",
  pending: "border-signal-amber bg-transparent text-signal-amber",
} as const;

export function Badge({ children, tone = "neutral", dot = true }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-badge",
        TONE[tone],
      )}
    >
      {dot ? (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}
