import { feeColumns, feeRows, feesHead } from "@/lib/content";
import { DataTable } from "../ui/DataTable";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

export function Fees() {
  return (
    <Section id="fees" divider rhythm="lg">
      <SectionHead
        eyebrow={feesHead.eyebrow}
        title={feesHead.title}
        lede={feesHead.lede}
      />
      <div className="rounded-2xl border border-bone-100/8 bg-panel p-4 max-sm:p-2">
        <DataTable
          caption="Cost of moving $500 into dollars, by route"
          columns={feeColumns}
          rows={feeRows}
        />
      </div>
    </Section>
  );
}
