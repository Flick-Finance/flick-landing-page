import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  /** Small sentence-case label above the title, e.g. "What it costs". */
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /**
   * `split` puts the title left and the lede right on wide screens — the
   * editorial layout most sections open with. `center` stacks everything on
   * the axis.
   */
  layout?: "split" | "center";
  /** `light` for the bone band, where text flips to ink. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * The heading that opens every section past the hero: a heavy grotesk title
 * set tight, with the lede either beside it or under it.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  layout = "split",
  tone = "dark",
  className,
}: SectionHeadProps) {
  const light = tone === "light";

  return (
    <header
      className={cn(
        "mb-14 max-md:mb-10",
        layout === "split"
          ? "grid grid-cols-[1.15fr_0.85fr] items-end gap-x-16 gap-y-6 max-lg:grid-cols-1"
          : "mx-auto grid max-w-[52rem] justify-items-center gap-6 text-center",
        className,
      )}
    >
      <div className={cn(layout === "center" && "grid justify-items-center")}>
        {eyebrow ? (
          <p
            className={cn(
              "mb-5 text-sm font-medium",
              light ? "text-ink-500" : "text-bone-400",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "text-title font-bold text-balance",
            light ? "text-ink-900" : "text-bone-100",
          )}
        >
          {title}
        </h2>
      </div>
      {/* A div, not a p: a lede may be a rich node such as a <Note>. */}
      {lede ? (
        <div
          className={cn(
            "max-w-[46ch] text-lg",
            light ? "text-ink-600" : "text-bone-300",
            layout === "split" && "lg:pb-2",
          )}
        >
          {lede}
        </div>
      ) : null}
    </header>
  );
}
