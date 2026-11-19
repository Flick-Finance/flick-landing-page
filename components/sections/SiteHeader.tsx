import { navLinks } from "@/lib/content";
import { Button } from "../ui/Button";
import { Wordmark } from "../ui/Wordmark";

/**
 * The only fixed element in the system: sticky, 72%-opaque ink, 12px blur.
 * Links sit to the right, divided from the one call to action by a hairline.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-bone-100/6 bg-ink-900/72 backdrop-blur-md">
      <div className="mx-auto flex max-w-measure items-center gap-8 px-6 py-3.5">
        <a href="#top" aria-label="Flick — home" className="inline-flex">
          <Wordmark />
        </a>

        {/* Below lg the links stop fitting beside the CTA. They are repeated
            in full in the footer, and the page is one scroll. */}
        <nav
          aria-label="Sections"
          className="ml-auto flex items-center gap-8 max-lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bone-300 transition-colors duration-160 ease-out hover:text-bone-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span aria-hidden="true" className="h-6 w-px bg-ink-600 max-lg:hidden" />

        <div className="max-lg:ml-auto">
          <Button href="#join" variant="secondary" className="border-bone-100/20 bg-bone-100/5 py-2.5">
            Get early access
          </Button>
        </div>
      </div>
    </header>
  );
}
