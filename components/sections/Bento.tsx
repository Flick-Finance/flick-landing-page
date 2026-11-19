import { appBalance, appLedger, audiences, bento } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Tilt } from "../effects/Tilt";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";

/**
 * Who it's for. The heading and four audience tiles hold the left; the right
 * is a loose collage of the product itself — the balance screen, an approved
 * receipt and the card — each floating on its own parallax depth.
 */
export function Bento() {
  return (
    <Section id="who" divider rhythm="lg">
      <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-14">
        <div>
          <h2 className="mb-5 text-title font-bold text-bone-100">
            {bento.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mb-10 max-w-[48ch] text-lg text-bone-300">{bento.lede}</p>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-2xl border border-bone-100/6 bg-ink-800 p-6 transition-colors duration-160 ease-out hover:border-ink-500"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold leading-snug tracking-heading text-bone-100">
                    {audience.title}
                  </h3>
                  <Icon name={audience.icon} className="text-green-500" />
                </div>
                <p className="text-sm text-bone-300">{audience.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative h-150 perspective-[1400px] max-lg:h-130 max-sm:h-110"
        >
          {/* Balance screen */}
          <div className="absolute left-[8%] top-0 w-[62%] max-sm:left-0 max-sm:w-[78%]">
            <Tilt depth={0.55} base={-3}>
              <div className="rounded-2xl border border-bone-100/12 bg-card-object p-6 shadow-screen">
                <div className="font-mono text-[0.625rem] uppercase tracking-legal text-bone-400">
                  Balance
                </div>
                <div className="mb-6 mt-1.5 font-mono text-3xl tabular-nums tracking-display text-bone-100">
                  {appBalance}
                </div>
                <ul className="grid gap-3">
                  {appLedger.map((row) => (
                    <li
                      key={row.merchant}
                      className={cn(
                        "flex justify-between gap-4 border-t border-ink-600 pt-3 font-mono text-[0.6875rem]",
                        row.credit ? "text-green-500" : "text-bone-300",
                      )}
                    >
                      <span>{row.merchant}</span>
                      <span className="tabular-nums">{row.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </div>

          {/* Approved receipt */}
          <div className="absolute right-0 top-[46%] w-[58%] max-sm:w-[74%]">
            <Tilt depth={1} base={2.5}>
              <div className="rounded-xl border border-green-500 bg-ink-850 p-5 shadow-receipt-ok">
                <div className="mb-3 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-legal text-green-500">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  Approved
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-bold text-bone-100">Coursera</span>
                  <span className="font-mono tabular-nums text-bone-100">$49.00</span>
                </div>
                <div className="mt-1 font-mono text-[0.6875rem] tabular-nums text-bone-400">
                  ₦ COST SHOWN BEFORE CHECKOUT
                </div>
              </div>
            </Tilt>
          </div>

          {/* The card */}
          <div className="absolute bottom-0 left-[2%] w-[52%] max-sm:w-[64%]">
            <Tilt depth={0.8} base={-8}>
              <div className="relative aspect-[1.586] rounded-xl border border-bone-100/12 bg-card-object shadow-card">
                <span className="absolute left-5 top-4 font-display text-2xl text-bone-100">
                  Flick
                </span>
                <span className="absolute bottom-4 left-5 font-mono text-[0.625rem] tracking-mono text-bone-300">
                  4823 •••• •••• 7719
                </span>
                <span className="absolute bottom-3.5 right-5 text-xl font-black italic tracking-display text-bone-100">
                  VISA
                </span>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </Section>
  );
}
