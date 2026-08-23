import { steps } from "@/lib/content";
import { Tilt } from "../effects/Tilt";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { Surface } from "../ui/Surface";

export function HowItWorks() {
  return (
    <Section id="how" divider>
      <SectionHead
        num="01"
        title="How it works"
        lede="Three steps, all of them in the app. Nothing to sign, nobody to call."
      />

      <div className="grid grid-cols-3 gap-4 perspective-[1400px] max-lg:grid-cols-1">
        {steps.map((step) => (
          <Tilt key={step.step} depth={step.depth}>
            <Surface step={step.step} title={step.title}>
              {step.body}
            </Surface>
          </Tilt>
        ))}
      </div>
    </Section>
  );
}
