/**
 * Paints the two faces of the card object onto canvases, which become the
 * textures on the 3D mesh.
 *
 * Font families are read back out of the design tokens rather than written
 * here: `next/font` renames every family at build time, so a hard-coded
 * `'Instrument Serif'` in a canvas font string would silently fall back to
 * Georgia. The token layer owns the names; this file just asks it.
 */

export type FontStacks = {
  display: string;
  body: string;
  mono: string;
};

const FALLBACKS: FontStacks = {
  display: "Georgia, serif",
  body: "sans-serif",
  mono: "monospace",
};

export const FACE_WIDTH = 1712;
export const FACE_HEIGHT = 1080;

export function readFontStacks(): FontStacks {
  const computed = getComputedStyle(document.documentElement);
  const read = (name: keyof FontStacks, token: string) =>
    computed.getPropertyValue(token).trim() || FALLBACKS[name];

  return {
    display: read("display", "--font-display"),
    body: read("body", "--font-body"),
    mono: read("mono", "--font-mono"),
  };
}

/**
 * Fonts load lazily, and a face painted before they arrive is painted in the
 * fallback for good — a canvas texture never repaints itself.
 */
export async function waitForFaceFonts(fonts: FontStacks): Promise<void> {
  if (!("fonts" in document)) return;

  await Promise.all([
    document.fonts.load(`400 108px ${fonts.display}`),
    document.fonts.load(`400 56px ${fonts.mono}`),
    document.fonts.load(`900 96px ${fonts.body}`),
  ]).catch(() => undefined);
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function paintFront(ctx: CanvasRenderingContext2D, fonts: FontStacks) {
  const chipX = 96;
  const chipY = 430;
  const chipWidth = 168;
  const chipHeight = 128;

  const chipFill = ctx.createLinearGradient(
    chipX,
    chipY,
    chipX + chipWidth,
    chipY + chipHeight,
  );
  chipFill.addColorStop(0, "rgba(244,241,234,.42)");
  chipFill.addColorStop(1, "rgba(244,241,234,.14)");

  roundedRect(ctx, chipX, chipY, chipWidth, chipHeight, 18);
  ctx.fillStyle = chipFill;
  ctx.fill();
  ctx.strokeStyle = "rgba(244,241,234,.22)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  for (let i = 1; i < 3; i += 1) {
    ctx.moveTo(chipX, chipY + (chipHeight / 3) * i);
    ctx.lineTo(chipX + chipWidth, chipY + (chipHeight / 3) * i);
  }
  ctx.moveTo(chipX + chipWidth / 2, chipY);
  ctx.lineTo(chipX + chipWidth / 2, chipY + chipHeight);
  ctx.strokeStyle = "rgba(6,12,18,.35)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "rgba(244,241,234,.82)";
  ctx.font = `400 56px ${fonts.mono}`;
  ctx.fillText("4823  ••••  ••••  7719", 96, 830);

  ctx.fillStyle = "rgba(244,241,234,.45)";
  ctx.font = `400 34px ${fonts.mono}`;
  ctx.fillText("USD · NIGERIA", 96, 940);

  // The network name is type, not a logo file.
  ctx.fillStyle = "#F4F1EA";
  ctx.font = `italic 900 96px ${fonts.body}`;
  ctx.textAlign = "right";
  ctx.fillText("VISA", FACE_WIDTH - 96, 950);
  ctx.textAlign = "left";
}

function paintBack(ctx: CanvasRenderingContext2D, fonts: FontStacks) {
  ctx.fillStyle = "#060C12";
  ctx.fillRect(0, 250, FACE_WIDTH, 200);

  roundedRect(ctx, 96, 560, FACE_WIDTH - 400, 120, 12);
  ctx.fillStyle = "rgba(244,241,234,.88)";
  ctx.fill();

  ctx.fillStyle = "#0D1A26";
  ctx.font = `400 48px ${fonts.mono}`;
  ctx.fillText("CVV  ***", 130, 640);

  ctx.fillStyle = "rgba(244,241,234,.45)";
  ctx.font = `400 32px ${fonts.mono}`;
  ctx.fillText("ISSUED UNDER LICENCE ON THE VISA NETWORK", 96, 800);
}

export function paintCardFace(
  side: "front" | "back",
  fonts: FontStacks,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_WIDTH;
  canvas.height = FACE_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  roundedRect(ctx, 0, 0, FACE_WIDTH, FACE_HEIGHT, 68);
  ctx.save();
  ctx.clip();

  // The one gradient in the system belongs to the card object.
  const base = ctx.createLinearGradient(0, 0, FACE_WIDTH, FACE_HEIGHT);
  if (side === "front") {
    base.addColorStop(0, "#1A2C3A");
    base.addColorStop(0.55, "#0D1A26");
    base.addColorStop(1, "#060C12");
  } else {
    base.addColorStop(0, "#12212E");
    base.addColorStop(0.6, "#0A141D");
    base.addColorStop(1, "#060C12");
  }
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, FACE_WIDTH, FACE_HEIGHT);

  // Oversized ghosted wordmark bleeding off the edge.
  ctx.fillStyle = "rgba(244,241,234,.055)";
  ctx.font = `400 380px ${fonts.display}`;
  ctx.textBaseline = "alphabetic";
  if (side === "front") {
    ctx.textAlign = "right";
    ctx.fillText("Flick", FACE_WIDTH - 70, 700);
    ctx.textAlign = "left";
  } else {
    ctx.fillText("Flick", -40, 700);
  }

  ctx.fillStyle = "#F4F1EA";
  ctx.font = `400 108px ${fonts.display}`;
  ctx.fillText("Flick", 96, 190);

  if (side === "front") paintFront(ctx, fonts);
  else paintBack(ctx, fonts);

  // Green rim light bleeding off the right edge.
  const rim = ctx.createLinearGradient(FACE_WIDTH - 26, 0, FACE_WIDTH, 0);
  rim.addColorStop(0, "rgba(0,196,140,0)");
  rim.addColorStop(1, "rgba(0,196,140,.85)");
  ctx.fillStyle = rim;
  ctx.fillRect(FACE_WIDTH - 26, 0, 26, FACE_HEIGHT);

  ctx.restore();
  return canvas;
}
