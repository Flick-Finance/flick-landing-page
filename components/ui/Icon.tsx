import type { IconName } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * A small line-icon set drawn for Flick: 24px grid, 1.5px stroke, round caps.
 * Inline SVG in `currentColor`, so icons take the colour of their text.
 */
const PATHS: Record<IconName, string> = {
  briefcase:
    "M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3.5 8.5A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-9ZM3.5 12.5h17M12 11.5v2",
  bag: "M5 8h14l-1 11.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5L5 8ZM9 8V6.5a3 3 0 0 1 6 0V8",
  cap: "M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9ZM6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5",
  store:
    "M4 9.5 5.5 4.5h13L20 9.5M4 9.5a2.67 2.67 0 0 0 5.33 0 2.67 2.67 0 0 0 5.34 0 2.67 2.67 0 0 0 5.33 0M5 11.5v8h14v-8M10 19.5v-4.5h4v4.5",
  bolt: "M13 3 5 13.5h6l-1 7.5 8-10.5h-6l1-7.5Z",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3Z",
  shield:
    "M12 3.5 19.5 6v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3.5ZM9 12l2.2 2.2L15.5 10",
  card: "M3.5 7A1.5 1.5 0 0 1 5 5.5h14A1.5 1.5 0 0 1 20.5 7v10a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V7ZM3.5 10h17M7 15h3",
  swap: "M7 4.5 3.5 8 7 11.5M3.5 8h13M17 12.5l3.5 3.5-3.5 3.5M20.5 16h-13",
  "arrow-down": "M12 4v14M6 12.5l6 6 6-6M5 21h14",
};

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
