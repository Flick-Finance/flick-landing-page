import { EmailCapture } from "../ui/EmailCapture";
import { Section } from "../ui/Section";

export function Waitlist() {
  return (
    <Section id="join" divider band rhythm="lg" className="text-center">
      <h2 className="mb-4 font-display text-display-l font-normal">
        Your card is waiting for an address.
      </h2>
      <p className="mx-auto mb-8 max-w-[42ch] text-bone-300">
        Early access opens in batches. Join once and we&rsquo;ll hold your place.
      </p>
      <div className="flex justify-center">
        <EmailCapture action="Join" />
      </div>
    </Section>
  );
}
