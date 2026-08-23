import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** `alert` is the declined moment and appears once per page. */
  tone?: "accent" | "muted" | "alert";
  className?: string;
};

const TONE = {
  accent: "text-green-500 tracking-eyebrow",
  muted: "text-bone-400 tracking-eyebrow",
  alert: "text-signal-red tracking-legal",
} as const;

/**
 * Mono, uppercase, widely tracked. One of only two places uppercase is allowed
 * (the other is a table header).
 */
export function Eyebrow({ children, tone = "accent", className }: EyebrowProps) {
  return (
    <div className={cn("font-mono text-xs uppercase", TONE[tone], className)}>
      {children}
    </div>
  );
}
