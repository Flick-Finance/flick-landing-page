"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { subscribeToPointer } from "./pointer-engine";

type TiltProps = {
  children: ReactNode;
  /** 0–1. Higher reads as closer to the viewer. */
  depth?: number;
  /** Resting rotation in degrees, kept even when motion is reduced. */
  base?: number;
  className?: string;
};

const TRANSLATE_X = 26;
const TRANSLATE_Y = 16;
const ROTATE_Y = 12;
const ROTATE_X = 10;

/**
 * Parallax wrapper. Needs a `perspective` on an ancestor to read as depth —
 * the sections that use it set one. `grid` so a single child stretches to the
 * row height in a card grid.
 */
export function Tilt({ children, depth = 1, base = 0, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeToPointer(({ tiltX, tiltY }) => {
        const element = ref.current;
        if (!element) return;

        element.style.transform =
          `translate3d(${(tiltX * TRANSLATE_X * depth).toFixed(2)}px,` +
          `${(tiltY * TRANSLATE_Y * depth).toFixed(2)}px,0)` +
          ` rotateY(${(tiltX * ROTATE_Y * depth).toFixed(2)}deg)` +
          ` rotateX(${(-tiltY * ROTATE_X * depth).toFixed(2)}deg)` +
          ` rotate(${base}deg)`;
      }),
    [depth, base],
  );

  return (
    <div
      ref={ref}
      className={cn("grid will-change-transform", className)}
      style={{ transform: `rotate(${base}deg)` }}
    >
      {children}
    </div>
  );
}
