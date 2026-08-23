"use client";

import { useState } from "react";
import { personas, type PersonaId } from "@/lib/content";
import { Note } from "../ui/Note";
import { Tabs, panelId, tabId } from "../ui/Tabs";

const ID_PREFIX = "persona";

export function PersonaSwitcher() {
  const [selected, setSelected] = useState<PersonaId>("naira");
  const persona = personas.find((item) => item.id === selected) ?? personas[0];

  return (
    <>
      <Tabs
        idPrefix={ID_PREFIX}
        label="Funding route"
        items={personas.map(({ id, label }) => ({ id, label }))}
        value={selected}
        onChange={(id) => setSelected(id as PersonaId)}
      />

      <div
        // Re-keyed on tab change so the reveal replays.
        key={persona.id}
        id={panelId(ID_PREFIX, persona.id)}
        role="tabpanel"
        aria-labelledby={tabId(ID_PREFIX, persona.id)}
        tabIndex={0}
        className="mt-8 grid animate-reveal grid-cols-[1.1fr_0.9fr] items-start gap-8 max-lg:grid-cols-1"
      >
        <div>
          <p className="mb-4 font-display text-persona">{persona.title}</p>
          <p className="mb-6 max-w-[56ch] text-bone-300">{persona.body}</p>

          <ul className="flex flex-wrap gap-3">
            {persona.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-ink-600 px-4 py-2 font-mono text-xs uppercase tracking-column text-bone-300"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <Note>{persona.note}</Note>
      </div>
    </>
  );
}
