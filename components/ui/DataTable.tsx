import { cn } from "@/lib/cn";

export type DataRow = {
  cells: string[];
  /** Green wash + accent numerals. Reserved for the Flick row. */
  highlight?: boolean;
};

type DataTableProps = {
  /** Read by assistive tech only — the lede above says this on screen. */
  caption?: string;
  columns: string[];
  rows: DataRow[];
};

/**
 * Every column past the first is a number, so it gets mono type and
 * `tabular-nums` — figures have to line up to be comparable.
 */
export function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-120 border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-ink-600 p-4 text-left font-mono text-xs font-normal uppercase tracking-column text-bone-400"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.cells[0]}>
              {row.cells.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={cell}
                    scope="row"
                    className={cn(
                      "border-b border-ink-600 p-4 text-left font-body font-normal text-bone-200",
                      row.highlight && "bg-green-wash",
                    )}
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={cell}
                    className={cn(
                      "border-b border-ink-600 p-4 text-left font-mono tabular-nums",
                      row.highlight
                        ? "bg-green-wash text-green-500"
                        : "text-bone-100",
                    )}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
