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
};

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/**
 * A controlled tablist with automatic activation — arrow keys move the
 * selection, which is the expected behaviour when panels are cheap to swap.
 */
export function Tabs({ items, value, onChange, label, idPrefix }: TabsProps) {
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
      className="inline-flex max-w-full gap-1 rounded-full border border-ink-600 bg-ink-800 p-1"
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
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-full border-none px-6 py-2 font-body text-sm",
              "transition-colors duration-280 ease-out hover:text-bone-100 max-sm:px-4 max-sm:text-xs",
              selected
                ? "bg-ink-600 font-bold text-bone-100"
                : "bg-transparent font-medium text-bone-300",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
