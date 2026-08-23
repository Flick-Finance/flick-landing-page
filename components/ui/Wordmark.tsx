/**
 * No logo file was supplied with the design system, and none should be drawn.
 * The mark is "Flick" set in Instrument Serif 400 at -.02em.
 */
export function Wordmark({ as: Tag = "span" }: { as?: "span" | "div" }) {
  return (
    <Tag className="font-display text-2xl leading-none tracking-display text-bone-100">
      Flick
    </Tag>
  );
}
