"use client";

import { useEffect, useRef } from "react";
import { kinetic } from "@/lib/content";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "../effects/pointer-engine";

/** Mini card faces for the drifting side columns. Pure CSS, no assets. */
function MiniCard({ variant }: { variant: "front" | "back" | "edge" }) {
  return (
    <div
      className={cn(
        "relative aspect-[0.63] w-full overflow-hidden rounded-xl border border-bone-100/10 shadow-card",
        variant === "edge" ? "bg-ink-850" : "bg-card-object",
      )}
    >
      {variant === "front" ? (
        <>
          <span className="absolute left-4 top-4 font-display text-2xl text-bone-100">
            Flick
          </span>
          <span className="absolute left-4 top-16 h-6 w-8 rounded-sm bg-bone-300/50" />
          <span className="absolute bottom-4 right-4 font-body text-lg font-black italic tracking-display text-bone-100">
            VISA
          </span>
        </>
      ) : null}
      {variant === "back" ? (
        <>
          <span className="absolute inset-x-0 top-8 h-8 bg-ink-900" />
          <span className="absolute bottom-6 left-4 font-mono text-[0.625rem] tracking-mono text-bone-400">
            4823 •••• 7719
          </span>
        </>
      ) : null}
      {variant === "edge" ? (
        <span className="absolute inset-y-0 right-0 w-0.5 bg-green-500/70 shadow-[0_0_24px_var(--color-green-glow)]" />
      ) : null}
    </div>
  );
}

const LEFT = ["front", "edge", "back"] as const;
const RIGHT = ["back", "front", "edge"] as const;

/**
 * The verb stack. The section is several viewports tall; its inner frame
 * sticks while you scroll through it, and each verb lights up in turn. The
 * side columns of mini cards drift at two different speeds.
 *
 * One scroll listener writes inline styles on six elements, throttled to a
 * frame. With reduced motion every verb is simply lit and nothing drifts.
 */
export function KineticVerbs() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const closeRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = wordRefs.current;
    const count = kinetic.verbs.length;

    if (prefersReducedMotion()) {
      for (const word of words) word?.style.setProperty("color", "var(--color-bone-100)");
      closeRef.current?.style.setProperty("opacity", "1");
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));

      words.forEach((word, index) => {
        if (!word) return;
        // Each verb owns an equal slice of the first 85% of the scroll.
        const lit = Math.min(1, Math.max(0, progress * (count / 0.85) - index));
        word.style.color = `color-mix(in srgb, var(--color-bone-100) ${(lit * 100).toFixed(1)}%, var(--color-ink-700))`;
        word.style.transform = `translateY(${((1 - lit) * 10).toFixed(1)}px)`;
      });

      const close = Math.min(1, Math.max(0, (progress - 0.82) / 0.12));
      if (closeRef.current) {
        closeRef.current.style.opacity = close.toFixed(3);
        closeRef.current.style.transform = `translateY(${((1 - close) * 14).toFixed(1)}px)`;
      }

      leftRef.current?.style.setProperty("transform", `translateY(${(progress * -38).toFixed(2)}%)`);
      rightRef.current?.style.setProperty("transform", `translateY(${(-20 + progress * 30).toFixed(2)}%)`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="What Flick does with your money"
      className="relative h-[260vh] bg-ink-900 max-md:h-[200vh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div className="mx-auto grid w-full max-w-measure grid-cols-[8rem_1fr_8rem] items-center gap-8 px-6 max-lg:grid-cols-1">
          <div className="mask-fade-y h-[70svh] overflow-hidden max-lg:hidden">
            <div ref={leftRef} className="grid gap-5 will-change-transform">
              {[...LEFT, ...LEFT].map((variant, index) => (
                <MiniCard key={index} variant={variant} />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="mb-6 font-mono text-sm uppercase tracking-eyebrow text-bone-300 max-sm:text-xs">
              {kinetic.eyebrow}
            </p>
            <p className="grid text-[clamp(3rem,9vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
              {kinetic.verbs.map((verb, index) => (
                <span
                  key={verb}
                  ref={(node) => {
                    wordRefs.current[index] = node;
                  }}
                  className="block text-ink-700 will-change-transform"
                >
                  {verb}
                </span>
              ))}
            </p>
            <p
              ref={closeRef}
              className="mt-8 font-display text-statement italic text-green-400 opacity-0"
            >
              {kinetic.close}
            </p>
          </div>

          <div className="mask-fade-y h-[70svh] overflow-hidden max-lg:hidden">
            <div ref={rightRef} className="grid gap-5 will-change-transform">
              {[...RIGHT, ...RIGHT].map((variant, index) => (
                <MiniCard key={index} variant={variant} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
