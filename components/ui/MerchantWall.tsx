type MerchantWallProps = {
  names: string[];
};

/**
 * Merchant names are typed in Satoshi Black, not logo files. They rest at 40%
 * opacity and come to full strength on hover — pure CSS, no client state.
 */
export function MerchantWall({ names }: MerchantWallProps) {
  return (
    <ul className="flex flex-wrap items-center gap-8 max-md:gap-6">
      {names.map((name) => (
        <li
          key={name}
          className="font-body text-xl font-black tracking-display text-bone-100 opacity-40 transition-opacity duration-160 ease-out hover:opacity-100 max-md:text-lg"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
