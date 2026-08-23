import { cn } from "@/lib/cn";

type RuleListProps = {
  kind?: "do" | "dont";
  title: string;
  items: string[];
};

export function RuleList({ kind = "do", title, items }: RuleListProps) {
  const accent = kind === "do" ? "border-l-green-500" : "border-l-signal-red";
  const label = kind === "do" ? "text-green-500" : "text-signal-red";

  return (
    <div
      className={cn(
        "h-full rounded-lg border border-ink-600 border-l-2 p-6",
        accent,
      )}
    >
      <h3
        className={cn(
          "mb-4 font-mono text-xs font-normal uppercase tracking-label",
          label,
        )}
      >
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-ink-700 py-2 text-sm text-bone-300 last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
