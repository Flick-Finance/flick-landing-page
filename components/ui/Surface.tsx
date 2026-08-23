import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SurfaceProps = {
  children: ReactNode;
  /** Step counter, e.g. `01`. Rendered in accent mono above the title. */
  step?: string;
  title?: string;
  raised?: boolean;
  className?: string;
};

/**
 * The bounded panel the whole page is built from. Depth comes from stacked ink
 * plus a hairline — surfaces never carry a shadow.
 */
export function Surface({
  children,
  step,
  title,
  raised = false,
  className,
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "h-full rounded-lg border border-ink-600 p-6 transition-colors duration-160 ease-out hover:border-ink-500",
        raised ? "bg-ink-700" : "bg-ink-800",
        className,
      )}
    >
      {step ? (
        <div className="mb-3 font-mono text-xs text-green-500">{step}</div>
      ) : null}
      {title ? (
        <h3 className="mb-2 text-heading font-bold">{title}</h3>
      ) : null}
      {typeof children === "string" ? (
        <p className="text-sm text-bone-300">{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
