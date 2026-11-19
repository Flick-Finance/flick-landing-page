"use client";

import { useState } from "react";
import { merchantGroups } from "@/lib/content";
import { Tabs, panelId, tabId } from "../ui/Tabs";

const ID_PREFIX = "merchants";

/**
 * Category tabs over a centred wall of merchant chips. Names are typed, and
 * the round mark is the first letter in Satoshi Black — never a logo file.
 */
export function MerchantBrowser() {
  const [selected, setSelected] = useState(merchantGroups[0].id);
  const group = merchantGroups.find((item) => item.id === selected) ?? merchantGroups[0];

  return (
    <>
      <div className="mb-10">
        <Tabs
          variant="plain"
          idPrefix={ID_PREFIX}
          label="Merchant category"
          items={merchantGroups.map(({ id, label }) => ({ id, label }))}
          value={selected}
          onChange={setSelected}
        />
      </div>

      <ul
        key={group.id}
        id={panelId(ID_PREFIX, group.id)}
        role="tabpanel"
        aria-labelledby={tabId(ID_PREFIX, group.id)}
        tabIndex={0}
        className="mx-auto flex max-w-[64rem] animate-reveal flex-wrap justify-center gap-3"
      >
        {group.names.map((name) => (
          <li
            key={name}
            className="inline-flex items-center gap-3 rounded-full border border-ink-900/10 bg-white/70 py-2 pl-2 pr-5 text-lg font-medium text-ink-900 shadow-[0_1px_0_rgba(7,14,20,0.04)] transition-colors duration-160 ease-out hover:border-green-600 max-sm:text-base"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full bg-ink-900 text-sm font-black text-bone-100"
            >
              {name.charAt(0)}
            </span>
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}
