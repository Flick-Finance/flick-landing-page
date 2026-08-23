import { audiences } from "@/lib/content";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { Surface } from "../ui/Surface";

export function WhoItsFor() {
  return (
    <Section id="who" divider>
      <SectionHead
        num="04"
        title="Who is using it"
        lede="Different reasons, one problem: a dollar payment that has to go through without a phone call."
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-[360px]:grid-cols-1">
        {audiences.map((audience) => (
          <Surface key={audience.title} title={audience.title}>
            {audience.body}
          </Surface>
        ))}
      </div>
    </Section>
  );
}
