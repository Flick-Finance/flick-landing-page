import { hero, orbitChips } from "@/lib/content";
import { CardOrbit } from "../effects/CardOrbit";
import { FlickCard3D } from "../effects/FlickCard3D";
import { Badge } from "../ui/Badge";
import { EmailCapture } from "../ui/EmailCapture";

/**
 * One orchestrated entrance: badge, headline, lede, form and stats rise in
 * sequence while the card settles into its orbit.
 *
 * The headline pairs a serif italic lead word with a heavy grotesk — light
 * voice in, hard number-like statement out.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-swoosh" />

      <div className="mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-measure grid-cols-[1.05fr_0.95fr] items-center gap-10 px-6 py-20 max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-6 max-lg:py-14">
        <div className="grid content-start gap-7">
          <div className="animate-rise-0">
            <Badge tone="neutral">{hero.badge.toUpperCase()}</Badge>
          </div>

          <h1 className="animate-rise-1">
            <span className="block font-display text-[clamp(2.75rem,6vw,4.75rem)] italic leading-none tracking-display text-bone-200">
              {hero.lead}
            </span>
            {hero.headline.map((line) => (
              <span
                key={line}
                className="block text-mega font-bold text-bone-100"
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-[44ch] animate-rise-2 text-lg text-bone-300">
            {hero.lede}
          </p>

          <div className="animate-rise-3">
            <EmailCapture action={hero.action} />
          </div>

          <ul className="flex animate-rise-4 flex-wrap gap-6 font-mono text-xs tracking-mono text-bone-400 max-sm:gap-4">
            {hero.stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-green-500" />
                {stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-140 animate-settle max-lg:h-110 max-sm:h-85">
          <CardOrbit chips={orbitChips}>
            <FlickCard3D />
          </CardOrbit>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-eyebrow text-bone-400">
            {hero.hint}
          </span>
        </div>
      </div>
    </section>
  );
}
