import type { ReactNode } from "react";

type SectionHeadProps = {
  /** Two-digit counter, e.g. `01`. */
  num?: string;
  title: ReactNode;
  lede?: ReactNode;
};

/**
 * The numbered heading that opens every section past the hero. The source
 * styles the counter, heading and lede as one unit, so they ship as one.
 *
 * Spacing sits on the last element actually rendered, so a head without a lede
 * does not leave a double gap.
 */
export function SectionHead({ num, title, lede }: SectionHeadProps) {
  return (
    <header>
      <div className="mb-6 flex items-baseline gap-4">
        {num ? <span className="font-mono text-xs text-bone-400">{num}</span> : null}
        <h2 className="font-display text-display-m font-normal">{title}</h2>
      </div>
      {lede ? <p className="mb-8 max-w-prose text-bone-300">{lede}</p> : null}
    </header>
  );
}
