import { appBalance, appLedger } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Tilt } from "../effects/Tilt";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Section } from "../ui/Section";

export function AppShowcase() {
  return (
    <Section
      id="app"
      divider
      band
      rhythm="lg"
      className="grid grid-cols-[1fr_0.85fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12"
    >
      <div>
        <Eyebrow>The app</Eyebrow>
        <p className="my-4 font-display text-statement-l">
          Card details, balance, every charge — in one screen.
        </p>
        <p className="mb-8 max-w-[52ch] text-bone-300">
          Fund, freeze, or replace the card yourself. Every transaction shows the
          merchant, the amount in dollars, and what it cost you in Naira.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="lg" href="#join">
            Download for iOS
          </Button>
          <Button variant="secondary" size="lg" href="#join">
            Download for Android
          </Button>
        </div>
      </div>

      <div className="flex justify-center perspective-[1400px]">
        <Tilt depth={0.8} base={-4}>
          <div className="w-75 max-w-full rounded-xl border border-bone-100/12 bg-card-object p-6 shadow-screen">
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
    </Section>
  );
}
