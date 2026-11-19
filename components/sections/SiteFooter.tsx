import { footerBlurb, footerColumns, footerLegal } from "@/lib/content";
import { Wordmark } from "../ui/Wordmark";

/**
 * Link columns on the left under small tracked headings; the wordmark and
 * the regulatory line on the right, behind a hairline divider.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink-600 bg-ink-850">
      <div className="mx-auto grid max-w-measure grid-cols-[1.5fr_1fr] gap-12 px-6 py-20 max-lg:grid-cols-1">
        <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2">
          {footerColumns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="grid content-start gap-4"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-legal text-green-500">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-bone-300 transition-colors duration-160 ease-out hover:text-bone-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="border-l border-ink-600 pl-12 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-10">
          <Wordmark />
          <p className="mt-4 max-w-[44ch] text-sm text-bone-400">{footerBlurb}</p>
        </div>
      </div>

      <p className="mx-auto max-w-measure px-6 pb-14 font-mono text-xs tracking-mono text-bone-400">
        {footerLegal}
      </p>
    </footer>
  );
}
