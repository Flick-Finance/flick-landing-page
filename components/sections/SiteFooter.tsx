import { footerBlurb, footerColumns, footerLegal } from "@/lib/content";
import { Wordmark } from "../ui/Wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-600">
      <div className="mx-auto grid max-w-measure grid-cols-[1.4fr_repeat(3,1fr)] gap-8 px-6 py-16 max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-12 max-sm:grid-cols-1">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-[32ch] text-sm text-bone-400">{footerBlurb}</p>
        </div>

        {footerColumns.map((column) => (
          <nav
            key={column.heading}
            aria-label={column.heading}
            className="grid content-start gap-3"
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-legal text-bone-400">
              {column.heading}
            </span>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-bone-300 transition-colors duration-160 ease-out hover:text-bone-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <p className="mx-auto max-w-measure px-6 pb-16 font-mono text-xs tracking-mono text-bone-400">
        {footerLegal}
      </p>
    </footer>
  );
}
