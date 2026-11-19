import { faqHead, faqs } from "@/lib/content";
import { Section } from "../ui/Section";

/**
 * Native <details> accordions — keyboard and screen-reader behaviour for
 * free, and no client bundle.
 */
export function Faq() {
  return (
    <Section id="faq" divider rhythm="lg">
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-16 max-lg:grid-cols-1 max-lg:gap-4">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-sm font-medium text-bone-400">{faqHead.eyebrow}</p>
          <h2 className="text-title font-bold text-balance text-bone-100">{faqHead.title}</h2>
        </header>

        <div className="border-t border-ink-600">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-ink-600">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold tracking-heading text-bone-100 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative size-4 shrink-0 text-green-500 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-280 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[58ch] pb-6 text-bone-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
