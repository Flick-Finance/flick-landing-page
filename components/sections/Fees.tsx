import { DataTable } from "../ui/DataTable";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { feeColumns, feeRows } from "@/lib/content";

export function Fees() {
  return (
    <Section id="fees" divider>
      <SectionHead
        num="03"
        title="What it costs"
        lede="One fee, shown before you confirm. Compare it to what you pay today."
      />
      <DataTable
        caption="Cost of moving $500 into dollars, by route"
        columns={feeColumns}
        rows={feeRows}
      />
    </Section>
  );
}
