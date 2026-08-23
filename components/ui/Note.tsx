import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type NoteProps = {
  children: ReactNode;
  tone?: "accent" | "alert";
  className?: string;
};

/** A 2px left rule and an 8% green wash — one of the system's two wash uses. */
export function Note({ children, tone = "accent", className }: NoteProps) {
  return (
    <div
      className={cn(
        "rounded-r-md border-l-2 px-6 py-4 text-sm text-bone-200",
        tone === "alert"
          ? "border-signal-red bg-transparent"
          : "border-green-500 bg-green-wash",
        className,
      )}
    >
      {children}
    </div>
  );
}
