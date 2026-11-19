"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string };

type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Accessible name for the tablist. */
  label: string;
  /** Namespaces the generated tab / panel ids. */
  idPrefix: string;
  /**
   * `pill` is the segmented control on ink. `plain` is a row of text tabs for
   * the bone band — the selected one goes full-strength ink.
   */
  variant?: "pill" | "plain";
};

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/**
 * A controlled tablist with automatic activation — arrow keys move the
 * selection, which is the expected behaviour when panels are cheap to swap.
 */
export function Tabs({
  items,
  value,
  onChange,
  label,
  idPrefix,
  variant = "pill",
}: TabsProps) {
  const plain = variant === "plain";
  const listRef = useRef<HTMLDivElement>(null);

  function focusTab(id: string) {
    onChange(id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${CSS.escape(tabId(idPrefix, id))}`)
      ?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const offset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

    if (offset === 0) {
      if (event.key === "Home") focusTab(items[0].id);
      else if (event.key === "End") focusTab(items[items.length - 1].id);
      else return;
    } else {
      const current = items.findIndex((item) => item.id === value);
      focusTab(items[(current + offset + items.length) % items.length].id);
    }

    event.preventDefault();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={
        plain
          ? "flex max-w-full flex-wrap justify-center gap-x-6 gap-y-2"
          : "inline-flex max-w-full gap-1 rounded-full border border-bone-100/8 bg-ink-800 p-1.5"
      }
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            id={tabId(idPrefix, item.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(idPrefix, item.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={plain ? cn(
              "cursor-pointer whitespace-nowrap border-none bg-transparent p-0 font-body text-xl tracking-heading",
              "transition-colors duration-160 ease-out max-sm:text-base",
              selected ? "font-bold text-ink-900" : "font-medium text-bone-400 hover:text-ink-600",
            ) : cn(
              "cursor-pointer whitespace-nowrap rounded-full border-none px-6 py-3 font-body text-base",
              "transition-colors duration-280 ease-out max-sm:px-4 max-sm:py-2.5 max-sm:text-sm",
              selected
                ? "bg-bone-100 font-bold text-ink-900"
                : "bg-transparent font-medium text-bone-300 hover:text-bone-100",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
