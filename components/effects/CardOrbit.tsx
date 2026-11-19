"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { OrbitChip } from "@/lib/content";
import { cn } from "@/lib/cn";
import { prefersReducedMotion, subscribeToPointer } from "./pointer-engine";

type CardOrbitProps = {
  chips: OrbitChip[];
  children: ReactNode;
};

/** One lap, in ms. Slow enough to read the chips as they pass. */
const ORBIT_PERIOD_MS = 38000;
/** Ellipse radii as a fraction of the stage, and the orbit's tilt. */
const RADIUS_X = 0.47;
/** Narrow stages pull the orbit in so chips are not clipped at the gutter. */
const RADIUS_X_NARROW = 0.36;
const NARROW_PX = 520;
const RADIUS_Y = 0.17;
const TILT_RAD = -0.2;

const DOT_TONE = {
  green: "bg-green-500 text-ink-900",
  bone: "bg-bone-100 text-ink-900",
  amber: "bg-signal-amber text-ink-900",
} as const;

/**
 * A tilted elliptical orbit around the 3D card, with chips for the money it
 * moves. Chips in the far half pass behind the card (lower z-index, smaller,
 * dimmer); chips in the near half pass in front.
 *
 * Positions are computed on the shared pointer-engine frame rather than in a
 * loop of their own, so the whole hero still runs on one rAF.
 */
export function CardOrbit({ chips, children }: CardOrbitProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const ellipseRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = prefersReducedMotion();
    const start = performance.now();
    let width = 0;
    let height = 0;
    let radiusX = RADIUS_X;

    // The path is drawn in real pixels, at the same radii and tilt the chips
    // use, so they ride the line exactly whatever the stage's aspect ratio.
    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      radiusX = width < NARROW_PX ? RADIUS_X_NARROW : RADIUS_X;
      const svg = svgRef.current;
      const ellipse = ellipseRef.current;
      if (!svg || !ellipse) return;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      ellipse.setAttribute("cx", String(width / 2));
      ellipse.setAttribute("cy", String(height / 2));
      ellipse.setAttribute("rx", String(width * radiusX));
      ellipse.setAttribute("ry", String(height * RADIUS_Y));
      ellipse.setAttribute(
        "transform",
        `rotate(${(TILT_RAD * 180) / Math.PI} ${width / 2} ${height / 2})`,
      );
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);

    const cos = Math.cos(TILT_RAD);
    const sin = Math.sin(TILT_RAD);

    const unsubscribe = subscribeToPointer(({ tiltX, tiltY }) => {
      const turns = reduced ? 0 : (performance.now() - start) / ORBIT_PERIOD_MS;

      chips.forEach((chip, index) => {
        const element = chipRefs.current[index];
        if (!element) return;

        const angle = (chip.phase + turns) * Math.PI * 2;
        const ex = Math.cos(angle) * width * radiusX;
        const ey = Math.sin(angle) * height * RADIUS_Y;
        // sin(angle) > 0 is the near half of the ellipse.
        const depth = Math.sin(angle);

        const x = ex * cos - ey * sin + tiltX * 10;
        const y = ex * sin + ey * cos + tiltY * 6;
        const scale = 0.86 + (depth + 1) * 0.09;

        element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        element.style.opacity = (0.45 + (depth + 1) * 0.275).toFixed(3);
        element.style.zIndex = depth > 0 ? "3" : "1";
      });
    });

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
    };
  }, [chips]);

  return (
    <div ref={stageRef} className="relative size-full">
      {/* The orbit path. Geometry is set by `measure()` above. */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible"
      >
        <ellipse
          ref={ellipseRef}
          fill="none"
          stroke="url(#orbit-stroke)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="orbit-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#00c48c" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#3fe0ae" stopOpacity="0.55" />
            <stop offset="1" stopColor="#00c48c" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 z-2">{children}</div>

      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
        {chips.map((chip, index) => (
          <span
            key={chip.label}
            ref={(node) => {
              chipRefs.current[index] = node;
            }}
            className="absolute left-0 top-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-bone-100/10 bg-ink-850/85 py-1 pl-1 pr-3 font-mono text-[0.6875rem] tracking-mono text-bone-200 opacity-0 shadow-receipt backdrop-blur-sm will-change-transform"
          >
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full font-body text-[0.6875rem] font-bold",
                DOT_TONE[chip.tone],
              )}
            >
              {chip.glyph}
            </span>
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  );
}
