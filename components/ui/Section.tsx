import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Hairline rule above the section. Every section past the hero has one. */
  divider?: boolean;
  /** Full-bleed surface band. Used by the app and waitlist sections. */
  band?: boolean;
  /** Vertical rhythm. `hero` and `tight` are one-offs at the top of the page. */
  rhythm?: "md" | "lg" | "hero" | "tight";
  className?: string;
};

const RHYTHM = {
  md: "py-16 max-md:py-12",
  lg: "py-24 max-md:py-16",
  hero: "pt-24 pb-16 max-md:py-16",
  tight: "pt-8 pb-16 max-md:py-12",
} as const;

/**
 * The 1120px measure with 24px gutters that every section on the page shares.
 * Section rhythm is deliberately generous — negative space does trust work.
 */
export function Section({
  id,
  children,
  divider = false,
  band = false,
  rhythm = "md",
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-22",
        divider && "border-t border-ink-600",
        band && "bg-ink-800",
      )}
    >
      <div
        className={cn("mx-auto max-w-measure px-6", RHYTHM[rhythm], className)}
      >
        {children}
      </div>
    </section>
  );
}
