import { routesHead } from "@/lib/content";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { PersonaSwitcher } from "./PersonaSwitcher";

/**
 * How it works, split by how you already hold money. Only the tab machinery
 * is a Client Component — the heading and the section shell stay on the
 * server.
 */
export function FundingRoutes() {
  return (
    <Section id="how" divider rhythm="lg">
      <SectionHead
        layout="center"
        title={routesHead.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        lede={routesHead.lede}
        className="mb-10"
      />
      <PersonaSwitcher />
    </Section>
  );
}
