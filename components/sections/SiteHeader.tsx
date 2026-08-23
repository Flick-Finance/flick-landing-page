import { navLinks } from "@/lib/content";
import { Button } from "../ui/Button";
import { Wordmark } from "../ui/Wordmark";

/**
 * The only fixed element in the system: sticky, 82%-opaque ink, 12px blur.
 * Nothing else on the page pins to the viewport.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-600 bg-ink-900/82 backdrop-blur-md">
      <div className="mx-auto flex max-w-measure items-center gap-8 px-6 py-4 max-lg:gap-4">
        <a href="#top" aria-label="Flick — home" className="inline-flex">
          <Wordmark />
        </a>

        {/* Below the measure the five links stop fitting beside the CTA. They
            are repeated in full in the footer, and the page is one scroll. */}
        <nav aria-label="Sections" className="flex gap-6 max-lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bone-300 transition-colors duration-160 ease-out hover:text-bone-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto">
          <Button href="#join">Get early access</Button>
        </div>
      </div>
    </header>
  );
}
