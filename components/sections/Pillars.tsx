import { pillars } from "@/lib/content";

/**
 * Three tall panels: a two-line claim at the top, the number that proves it
 * and a short explanation at the bottom. The space between them is the point.
 */
export function Pillars() {
  return (
    <section aria-label="Why Flick" className="bg-ink-900">
      <div className="mx-auto grid max-w-measure grid-cols-3 gap-5 px-6 pb-24 max-lg:grid-cols-1 max-md:pb-16">
        {pillars.map((pillar) => (
          <article
            key={pillar.figure}
            className="group flex min-h-90 flex-col justify-between rounded-2xl border border-bone-100/8 bg-panel p-8 transition-colors duration-280 ease-out hover:border-green-500/40 max-lg:min-h-72"
          >
            <h3 className="text-[1.625rem] font-bold leading-[1.15] tracking-[-0.025em] text-bone-100">
              {pillar.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>

            <div>
              <p className="mb-4 font-mono text-4xl tabular-nums tracking-display text-green-500">
                {pillar.figure}
              </p>
              <p className="max-w-[36ch] text-bone-300">{pillar.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
