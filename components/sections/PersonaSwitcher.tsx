"use client";

import { Fragment, useState } from "react";
import { personas, type PersonaId } from "@/lib/content";
import { Note } from "../ui/Note";
import { Tabs, panelId, tabId } from "../ui/Tabs";

const ID_PREFIX = "persona";

export function PersonaSwitcher() {
  const [selected, setSelected] = useState<PersonaId>("naira");
  const persona = personas.find((item) => item.id === selected) ?? personas[0];

  return (
    <>
      <div className="mb-8 flex justify-center">
        <Tabs
          idPrefix={ID_PREFIX}
          label="Funding route"
          items={personas.map(({ id, label }) => ({ id, label }))}
          value={selected}
          onChange={(id) => setSelected(id as PersonaId)}
        />
      </div>

      <div
        // Re-keyed on tab change so the reveal replays.
        key={persona.id}
        id={panelId(ID_PREFIX, persona.id)}
        role="tabpanel"
        aria-labelledby={tabId(ID_PREFIX, persona.id)}
        tabIndex={0}
        className="grid animate-reveal grid-cols-[1.05fr_0.95fr] gap-6 rounded-2xl border border-bone-100/8 bg-panel p-8 max-lg:grid-cols-1 max-sm:p-5"
      >
        <div>
          <h3 className="mb-6 text-[1.875rem] font-bold leading-tight tracking-[-0.025em] text-bone-100">
            {persona.title}
          </h3>

          <ol className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {persona.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-bone-100/6 bg-ink-700/60 p-5"
              >
                <span className="mb-3 block font-mono text-xs text-green-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mb-1.5 block font-bold tracking-heading text-bone-100">
                  {step.title}
                </span>
                <span className="block text-sm text-bone-300">{step.body}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* The route, drawn as three nodes on a lit rail. */}
        <div className="relative flex min-h-80 flex-col justify-between overflow-hidden rounded-xl border border-bone-100/8 bg-card-object p-6">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-64 rounded-full bg-green-glow blur-3xl"
          />

          <div className="relative">
            <span className="font-mono text-[0.625rem] uppercase tracking-legal text-bone-400">
              Route
            </span>
            <div className="mt-6 flex items-center gap-2 max-sm:flex-col max-sm:items-stretch">
              {persona.route.map((node, index) => (
                <Fragment key={node}>
                  <span
                    className={
                      index === persona.route.length - 1
                        ? "rounded-full border border-green-500 bg-green-wash px-4 py-2.5 text-center font-mono text-xs tracking-mono text-green-500"
                        : "rounded-full border border-ink-500 bg-ink-850 px-4 py-2.5 text-center font-mono text-xs tracking-mono text-bone-200"
                    }
                  >
                    {node}
                  </span>
                  {index < persona.route.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-px min-w-6 flex-1 bg-linear-to-r from-ink-500 to-green-500 max-sm:mx-auto max-sm:h-5 max-sm:w-px max-sm:min-w-0 max-sm:flex-none max-sm:bg-linear-to-b"
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Where the route ends: the card itself. */}
          <div
            aria-hidden="true"
            className="relative mx-auto my-8 aspect-[1.586] w-56 -rotate-6 rounded-xl border border-bone-100/12 bg-card-object shadow-card max-sm:w-48"
          >
            <span className="absolute left-4 top-3 font-display text-xl text-bone-100">
              Flick
            </span>
            <span className="absolute bottom-3 left-4 font-mono text-[0.5625rem] tracking-mono text-bone-300">
              4823 •••• 7719
            </span>
            <span className="absolute bottom-2.5 right-4 font-black italic tracking-display text-bone-100">
              VISA
            </span>
          </div>

          <Note className="relative">{persona.note}</Note>
        </div>
      </div>
    </>
  );
}
