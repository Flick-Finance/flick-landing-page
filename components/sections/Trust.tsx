import { trustNote, weDo, weDont } from "@/lib/content";
import { Note } from "../ui/Note";
import { RuleList } from "../ui/RuleList";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

/**
 * Commitments, not trust cliches. No padlocks, no "bank-grade security".
 */
export function Trust() {
  return (
    <Section id="trust" divider>
      <SectionHead num="05" title="What we do and don't do" />

      <div className="mb-8 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <RuleList title="We do" items={weDo} />
        <RuleList kind="dont" title="We don't" items={weDont} />
      </div>

      <Note>{trustNote}</Note>
    </Section>
  );
}
