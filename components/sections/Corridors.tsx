import { corridors, corridorsHead } from "@/lib/content";
import { SectionHead } from "../ui/SectionHead";

const INSET = "max(1.5rem, calc((100vw - var(--container-measure)) / 2 + 1.5rem))";

/**
 * Story cards in a horizontal, snap-scrolling row that bleeds off the right
 * edge — the overflow is the cue that there are more. Pure CSS.
 */
export function Corridors() {
  return (
    <section aria-labelledby="corridors-title" className="overflow-hidden py-24 max-md:py-16">
      <div className="mx-auto max-w-measure px-6">
        <SectionHead
          eyebrow={corridorsHead.eyebrow}
          title={<span id="corridors-title">{corridorsHead.title}</span>}
          lede={corridorsHead.lede}
        />
      </div>

      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        // The first card lines up with the measure; the rest bleed off-screen.
        style={{ paddingInline: INSET, scrollPaddingInline: INSET }}
        tabIndex={0}
        aria-label="Example payments"
      >
        {corridors.map((corridor) => (
          <li
            key={corridor.from + corridor.to}
            className="relative flex min-h-96 w-80 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-bone-100/8 bg-card-object p-7 max-sm:min-h-80 max-sm:w-[78vw]"
          >
            <span
              aria-hidden="true"
              className="absolute right-6 top-6 font-mono text-sm tabular-nums text-green-500"
            >
              {corridor.amount}
            </span>
            <span
              aria-hidden="true"
              className="absolute -left-10 -top-10 size-48 rounded-full bg-green-wash blur-2xl"
            />
            <h3 className="relative mb-3 text-2xl font-bold tracking-[-0.025em] text-bone-100">
              {corridor.from} <span className="text-green-500">→</span> {corridor.to}
            </h3>
            <p className="relative text-bone-300">{corridor.story}</p>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-14 max-w-measure px-6 text-center text-lg font-medium text-bone-100">
        {corridorsHead.close}
      </p>
    </section>
  );
}
