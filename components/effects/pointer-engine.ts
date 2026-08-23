/**
 * A single pointer listener and a single `requestAnimationFrame` loop shared by
 * every motion component on the page.
 *
 * The design calls for one orchestrated page-load and a slow parallax, not
 * scattered micro-interactions — so the cursor ring, the card stage and the
 * dozen tilting panels all read from one eased source instead of each running
 * their own loop and each measuring the DOM on every pointer move.
 */

export type PointerFrame = {
  /** Raw pointer position, in px. */
  x: number;
  y: number;
  /** Eased pointer position, in px. Trails the dot. */
  ringX: number;
  ringY: number;
  /** Eased offset from the viewport centre, −1…1. Drives every tilt. */
  tiltX: number;
  tiltY: number;
  /** False before the first move and while the pointer is outside the window. */
  active: boolean;
  /** True over an interactive target — the ring opens up over these. */
  hot: boolean;
};

type Subscriber = (frame: PointerFrame) => void;

const HOT_SELECTOR = 'a,button,input,summary,[role="tab"]';
const RING_EASING = 0.14;
const TILT_EASING = 0.06;

const subscribers = new Set<Subscriber>();

const frame: PointerFrame = {
  x: 0,
  y: 0,
  ringX: 0,
  ringY: 0,
  tiltX: 0,
  tiltY: 0,
  active: false,
  hot: false,
};

const target = { tiltX: 0, tiltY: 0 };

let raf = 0;
let reducedMotion = false;

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

function handleMove(event: PointerEvent) {
  frame.x = event.clientX;
  frame.y = event.clientY;

  if (!frame.active) {
    // Snap on the first move so the ring doesn't fly in from the origin.
    frame.active = true;
    frame.ringX = event.clientX;
    frame.ringY = event.clientY;
  }

  target.tiltX = clamp((event.clientX - innerWidth / 2) / (innerWidth / 2));
  target.tiltY = clamp((event.clientY - innerHeight / 2) / (innerHeight / 2));

  frame.hot =
    event.target instanceof Element && event.target.closest(HOT_SELECTOR) !== null;
}

function handleLeave() {
  frame.active = false;
  frame.hot = false;
}

function tick() {
  frame.ringX += (frame.x - frame.ringX) * RING_EASING;
  frame.ringY += (frame.y - frame.ringY) * RING_EASING;

  if (reducedMotion) {
    frame.tiltX = 0;
    frame.tiltY = 0;
  } else {
    frame.tiltX += (target.tiltX - frame.tiltX) * TILT_EASING;
    frame.tiltY += (target.tiltY - frame.tiltY) * TILT_EASING;
  }

  for (const subscriber of subscribers) subscriber(frame);

  raf = requestAnimationFrame(tick);
}

function start() {
  reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  frame.x = innerWidth / 2;
  frame.y = innerHeight / 2;
  frame.ringX = frame.x;
  frame.ringY = frame.y;

  addEventListener("pointermove", handleMove, { passive: true });
  addEventListener("pointerleave", handleLeave);
  raf = requestAnimationFrame(tick);
}

function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
  removeEventListener("pointermove", handleMove);
  removeEventListener("pointerleave", handleLeave);
}

/** Registers a per-frame callback. Returns an unsubscribe function. */
export function subscribeToPointer(subscriber: Subscriber): () => void {
  if (subscribers.size === 0) start();
  subscribers.add(subscriber);

  // Give the new subscriber a frame immediately so it paints its resting state.
  subscriber(frame);

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) stop();
  };
}

export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
