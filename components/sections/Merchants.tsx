import { merchantsHead } from "@/lib/content";
import { SectionHead } from "../ui/SectionHead";
import { MerchantBrowser } from "./MerchantBrowser";

/**
 * The page's one light band: bone-100 with ink type. It breaks the run of
 * dark sections exactly once, at the point the page turns from "how" to
 * "where".
 */
export function Merchants() {
  return (
    <section id="merchants" className="scroll-mt-18 bg-bone-100 text-ink-900">
      <div className="mx-auto max-w-measure px-6 py-24 max-md:py-16">
        <SectionHead tone="light" title={merchantsHead.title} lede={merchantsHead.lede} />
        <MerchantBrowser />
      </div>
    </section>
  );
}
