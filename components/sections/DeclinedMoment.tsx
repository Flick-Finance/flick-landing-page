import { declineRows } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Tilt } from "../effects/Tilt";
import { Eyebrow } from "../ui/Eyebrow";
import { Section } from "../ui/Section";

/**
 * The hook. Signal red appears here and nowhere else on the page.
 */
export function DeclinedMoment() {
  return (
    <Section rhythm="tight">
      <div className="grid grid-cols-2 items-center gap-12 rounded-2xl border border-bone-100/8 bg-panel p-14 max-lg:grid-cols-1 max-lg:gap-10 max-lg:p-8">
        <div>
          <Eyebrow tone="alert">Transaction declined</Eyebrow>
          <p className="mb-5 mt-5 text-title font-bold text-bone-100">
            You had the money. The card still said no.
          </p>
          <p className="max-w-[52ch] text-bone-300">
            A Nigerian card at an international checkout fails for reasons you
            never see: a quarterly limit, an unsupported currency, a routing rule
            written elsewhere. Flick removes the guesswork — you hold dollars, so
            the checkout has nothing to argue with.
          </p>
        </div>

        <ul className="grid transform-3d gap-3.5 perspective-[1200px]">
          {declineRows.map((row) => (
            <li key={row.label}>
              <Tilt depth={row.depth} base={row.base}>
                <span
                  className={cn(
                    "block rounded-r-md border border-l-2 px-5 py-4.5 font-mono text-xs tracking-mono",
                    row.approved
                      ? "border-green-500 bg-green-wash text-green-500 shadow-receipt-ok"
                      : "border-ink-500 border-l-signal-red bg-ink-850 text-bone-300 shadow-receipt",
                    "max-sm:p-4 max-sm:text-[0.6875rem]",
                  )}
                >
                  {row.label}
                </span>
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
