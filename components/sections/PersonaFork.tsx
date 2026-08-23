import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { PersonaSwitcher } from "./PersonaSwitcher";

/**
 * Two ways in. Only the tab machinery is a Client Component — the heading and
 * the section shell stay on the server.
 */
export function PersonaFork() {
  return (
    <Section id="fork" divider>
      <SectionHead
        num="02"
        title="Where your dollars come from"
        lede="Two ways in. Pick the one that matches how you already hold money."
      />
      <PersonaSwitcher />
    </Section>
  );
}
