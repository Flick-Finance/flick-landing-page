import { merchants } from "@/lib/content";
import { Eyebrow } from "../ui/Eyebrow";
import { MerchantWall } from "../ui/MerchantWall";
import { Section } from "../ui/Section";

export function MerchantProof() {
  return (
    <Section divider>
      <Eyebrow tone="muted" className="mb-8">
        Works where you already shop
      </Eyebrow>
      <MerchantWall names={merchants} />
    </Section>
  );
}
