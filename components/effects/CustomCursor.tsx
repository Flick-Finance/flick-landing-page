"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToPointer } from "./pointer-engine";

const RING_BASE =
  "pointer-events-none fixed left-0 top-0 z-90 rounded-full border border-green-500/70 opacity-0 " +
  "transition-[opacity,width,height,margin,background-color] duration-160 ease-out";

/** Resting ring, and the wider one it opens into over anything clickable. */
const RING_REST = `${RING_BASE} size-10 -m-5 bg-transparent`;
const RING_HOT = `${RING_BASE} size-16 -m-8 bg-green-wash`;

const DOT =
  "pointer-events-none fixed left-0 top-0 z-91 -m-[3px] size-1.5 rounded-full bg-green-500 opacity-0 " +
  "transition-opacity duration-160";

/**
 * The trailing ring and dot that replace the system cursor.
 *
 * It only mounts for a fine pointer, and it is the component that hides the
 * native cursor — so a touch device or a visitor without JavaScript is never
 * left without one.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.dataset.cursor = "custom";

    const unsubscribe = subscribeToPointer(
      ({ x, y, ringX, ringY, active, hot }) => {
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!ring || !dot) return;

        dot.style.transform = `translate3d(${x}px,${y}px,0)`;
        ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;

        const opacity = active ? "1" : "0";
        dot.style.opacity = opacity;
        ring.style.opacity = opacity;

        const next = hot ? RING_HOT : RING_REST;
        if (ring.className !== next) ring.className = next;
      },
    );

    return () => {
      unsubscribe();
      delete root.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className={RING_REST} aria-hidden="true" />
      <div ref={dotRef} className={DOT} aria-hidden="true" />
    </>
  );
}
