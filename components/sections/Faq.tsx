import { faqs } from "@/lib/content";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

export function Faq() {
  return (
    <Section id="faq" divider>
      <SectionHead num="06" title="Questions we get asked" />

      <dl className="grid grid-cols-2 gap-x-12 max-lg:grid-cols-1">
        {faqs.map((item) => (
          <div key={item.q} className="border-t border-ink-600 py-6">
            <dt className="mb-2 font-bold tracking-heading">{item.q}</dt>
            <dd className="max-w-[52ch] text-sm text-bone-300">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
