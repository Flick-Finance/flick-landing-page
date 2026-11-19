import { Instrument_Serif, Martian_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * The three Flick families, self-hosted through `next/font` so no request
 * leaves the deployment at runtime.
 *
 * Each exposes a CSS variable that `app/globals.css` folds into the
 * `--font-display` / `--font-body` / `--font-mono` tokens. Nothing outside
 * this file should reference a family by name.
 */

/**
 * Emotional statements only. Never bold, never below 24px. The italic cut is
 * the lead word that opens a display headline ("Spend" / "dollars anywhere").
 */
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

/** Every number a user might check. Paired with `tabular-nums`. */
export const martianMono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-martian-mono",
});

/**
 * Everything functional. Fontshare ships no variable cut, so the four weights
 * the system uses (400 copy, 500 tabs, 700 headings, 900 merchant wall) are
 * declared individually.
 */
export const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

export const fontVariables = [
  instrumentSerif.variable,
  martianMono.variable,
  satoshi.variable,
].join(" ");
