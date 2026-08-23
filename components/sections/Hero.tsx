import { heroStats } from "@/lib/content";
import { FlickCard3D } from "../effects/FlickCard3D";
import { EmailCapture } from "../ui/EmailCapture";
import { Eyebrow } from "../ui/Eyebrow";
import { Section } from "../ui/Section";

/**
 * One orchestrated entrance: the eyebrow, headline, lede, form and stats rise
 * in sequence while the card settles into place.
 */
export function Hero() {
  return (
    <Section
      rhythm="hero"
      className="grid grid-cols-[1.05fr_0.95fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12"
    >
      <div className="grid content-start gap-6">
        <Eyebrow className="animate-rise-0">Dollar card · Nigeria first</Eyebrow>

        <h1 className="-mt-2 animate-rise-1 font-display text-display-xl font-normal">
          Spend dollars
          <br />
          without asking
          <br />
          your bank.
        </h1>

        <p className="max-w-[46ch] animate-rise-2 text-lg text-bone-300">
          Fund in Naira. Get a Visa card that works at any online checkout in the
          world. No branch visit, no limit letter, no declined screen.
        </p>

        <div className="animate-rise-3">
          <EmailCapture action="Join the waitlist" />
        </div>

        <ul className="mt-2 flex animate-rise-4 flex-wrap gap-6 font-mono text-xs tracking-mono text-bone-400 max-sm:gap-4">
          {heroStats.map((stat) => (
            <li key={stat}>{stat}</li>
          ))}
        </ul>
      </div>

      <div className="relative h-130 animate-settle max-lg:h-105 max-sm:h-85">
        <FlickCard3D />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-eyebrow text-bone-400">
          Click the card to flip it
        </span>
      </div>
    </Section>
  );
}
