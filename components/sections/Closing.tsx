import { closing, closingCards } from "@/lib/content";
import { EmailCapture } from "../ui/EmailCapture";
import { Icon } from "../ui/Icon";

/**
 * The close. A three-line statement on the left, a stack of frosted cards on
 * the right over a faint oversized card, then a hairline and the waitlist.
 */
export function Closing() {
  return (
    <section
      id="join"
      className="relative isolate scroll-mt-18 overflow-hidden border-t border-ink-600"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-swoosh opacity-80" />
      {/* The oversized card ghost behind the stack. */}
      <div
        aria-hidden="true"
        className="absolute -right-24 top-16 -z-10 aspect-[1.586] w-[46rem] rotate-[-14deg] rounded-[2.5rem] border border-bone-100/6 bg-card-object opacity-60 max-lg:hidden"
      >
        <span className="absolute bottom-10 left-12 font-display text-8xl text-bone-100/10">
          Flick
        </span>
      </div>

      <div className="mx-auto max-w-measure px-6 py-28 max-md:py-18">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10">
          <div>
            <h2 className="mb-6 text-title font-bold text-bone-100">
              {closing.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-[48ch] text-lg text-bone-300">{closing.lede}</p>
          </div>

          <ul className="grid gap-4">
            {closingCards.map((card) => (
              <li
                key={card.title}
                className="flex items-start justify-between gap-6 rounded-2xl border border-bone-100/12 bg-bone-100/6 p-6 backdrop-blur-md"
              >
                <div>
                  <h3 className="mb-1 text-2xl font-bold tracking-[-0.025em] text-bone-100">
                    {card.title}
                  </h3>
                  <p className="text-sm text-bone-300">{card.body}</p>
                </div>
                <Icon name={card.icon} className="size-7 text-green-400" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t border-ink-600 pt-10">
          <EmailCapture action={closing.action} />
          <p className="font-display text-xl italic text-bone-300">{closing.tagline}</p>
        </div>
      </div>
    </section>
  );
}
