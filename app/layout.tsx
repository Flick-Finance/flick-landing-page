import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Flick — Spend dollars without asking your bank",
    template: "%s · Flick",
  },
  description:
    "Fund in Naira. Get a Visa card that works at any online checkout in the world. No branch visit, no limit letter, no declined screen.",
  applicationName: "Flick",
  keywords: [
    "dollar card",
    "Nigeria",
    "Visa card",
    "Naira funding",
    "online checkout",
  ],
  openGraph: {
    type: "website",
    siteName: "Flick",
    title: "Flick — Spend dollars without asking your bank",
    description:
      "A dollar card that works at any online checkout in the world. Nigeria first.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070E14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
