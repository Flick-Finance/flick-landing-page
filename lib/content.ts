/**
 * Every string on the landing page lives here so copy changes never require
 * touching a component. Voice rules (sentence case, no exclamation marks,
 * numbers instead of adjectives) come from the design system readme.
 *
 * The page structure borrows its rhythm from orbitxpay.com — kinetic verb
 * stack, pillar cards, bento, segmented panel, a single light band, corridor
 * stories, closing stack — but every word, number and shape here is Flick's.
 */

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "#how", label: "How it works" },
  { href: "#merchants", label: "Where it works" },
  { href: "#fees", label: "Fees" },
  { href: "#faq", label: "FAQ" },
];

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const hero = {
  badge: "Dollar card · Nigeria first",
  lead: "Spend",
  headline: ["dollars", "anywhere."],
  lede: "Fund in Naira. Get a Visa card that works at any online checkout in the world. No branch visit, no limit letter, no declined screen.",
  action: "Join the waitlist",
  stats: ["0.80% FEE", "2–5 MIN TO FUND", "150M+ MERCHANTS"],
  hint: "Click the card to flip it",
};

export type OrbitChip = {
  label: string;
  /** Single glyph inside the coloured dot. */
  glyph: string;
  /** Starting angle on the orbit, in turns (0–1). */
  phase: number;
  tone: "green" | "bone" | "amber";
};

/** The chips that circle the card — the money it moves, in both directions. */
export const orbitChips: OrbitChip[] = [
  { label: "₦250,000", glyph: "₦", phase: 0.05, tone: "bone" },
  { label: "$162.40", glyph: "$", phase: 0.38, tone: "green" },
  { label: "USDC", glyph: "◎", phase: 0.62, tone: "bone" },
  { label: "−$15.00 FIGMA", glyph: "✓", phase: 0.84, tone: "green" },
];

/* ── Kinetic verb stack ────────────────────────────────────────────────── */

export const kinetic = {
  eyebrow: "With Flick your money is",
  verbs: ["FUNDED", "CONVERTED", "SPENT", "WITHDRAWN"],
  close: "Without asking your bank.",
};

/* ── Pillars ───────────────────────────────────────────────────────────── */

export type Pillar = { title: string[]; body: string; figure: string };

export const pillars: Pillar[] = [
  {
    title: ["One fee.", "Shown first."],
    figure: "0.80%",
    body: "The live rate and the fee are on screen before you confirm. Nothing moves until you tap, and nothing is repriced after.",
  },
  {
    title: ["Funded before", "the kettle boils."],
    figure: "2–5 min",
    body: "Bank transfer or mobile money from any Nigerian bank. The balance lands in dollars, ready at checkout.",
  },
  {
    title: ["Works where", "Visa works."],
    figure: "150M+",
    body: "Subscriptions, tuition portals, ad spend, hosting. One card that behaves the same in every currency.",
  },
];

/* ── Declined moment ───────────────────────────────────────────────────── */

export type DeclineRow = {
  label: string;
  approved?: boolean;
  /** Parallax depth, 0–1. Later rows sit closer to the viewer. */
  depth: number;
  /** Resting rotation in degrees. */
  base: number;
};

export const declineRows: DeclineRow[] = [
  { label: "DECLINED — ISSUER LIMIT · $84.00", depth: 0.5, base: -1.5 },
  {
    label: "DECLINED — CURRENCY NOT SUPPORTED · $19.99",
    depth: 0.72,
    base: 1,
  },
  { label: "APPROVED — FLICK USD · $19.99", approved: true, depth: 1, base: -0.5 },
];

/* ── Bento: who it's for ───────────────────────────────────────────────── */

export type IconName =
  | "briefcase"
  | "bag"
  | "cap"
  | "store"
  | "bolt"
  | "globe"
  | "shield"
  | "card"
  | "swap"
  | "arrow-down";

export type Audience = { title: string; body: string; icon: IconName };

export const bento = {
  title: ["For the Nigerian", "who works with", "the world."],
  lede: "Different reasons, one problem: a dollar payment that has to go through without a phone call.",
};

export const audiences: Audience[] = [
  {
    title: "Paid in dollars",
    body: "Invoice abroad, keep the balance in dollars, spend it without a round trip through Naira.",
    icon: "briefcase",
  },
  {
    title: "Tired of declines",
    body: "One card that behaves the same at a US checkout as it does at a UK one. No limit letters.",
    icon: "bag",
  },
  {
    title: "Paying fees abroad",
    body: "Tuition portals, exam fees, school licences — paid on the deadline, not after it.",
    icon: "cap",
  },
  {
    title: "Buying tools for work",
    body: "Ad spend, SaaS seats, hosting. Recurring charges that cannot fail mid-campaign.",
    icon: "store",
  },
];

export type LedgerRow = { merchant: string; amount: string; credit?: boolean };

export const appBalance = "$1,284.60";

export const appLedger: LedgerRow[] = [
  { merchant: "FIGMA", amount: "−$15.00" },
  { merchant: "NETFLIX", amount: "−$6.99" },
  { merchant: "FUNDED", amount: "+$200.00", credit: true },
];

/* ── Funding routes (segmented panel) ──────────────────────────────────── */

export type PersonaId = "naira" | "usdc";

export type RouteStep = { title: string; body: string };

export type Persona = {
  id: PersonaId;
  label: string;
  title: string;
  /** The three nodes of the route diagram, left to right. */
  route: [string, string, string];
  steps: RouteStep[];
  note: string;
};

export const routesHead = {
  title: ["Two ways in.", "One card out."],
  lede: "Pick the one that matches how you already hold money. Every step happens in the app — nothing to sign, nobody to call.",
};

/** Tab two is the only place crypto vocabulary is allowed. */
export const personas: Persona[] = [
  {
    id: "naira",
    label: "I hold Naira",
    title: "Transfer Naira, spend dollars.",
    route: ["₦ NAIRA", "LIVE RATE", "$ CARD"],
    steps: [
      {
        title: "Fund with Naira",
        body: "Bank transfer or mobile money from any Nigerian bank.",
      },
      {
        title: "See the rate first",
        body: "The live rate and the 0.80% fee, before you confirm.",
      },
      {
        title: "Get your card",
        body: "Issued instantly after verification. Number, expiry and CVV in-app.",
      },
      {
        title: "Spend anywhere",
        body: "Any online checkout that takes Visa. 150M+ merchants.",
      },
    ],
    note: "The rate you see is the rate you get. If it moves while you are confirming, we show you the new one instead of quietly repricing.",
  },
  {
    id: "usdc",
    label: "I already hold USDC",
    title: "Bring your USDC, get a Visa card.",
    route: ["◎ USDC", "INSTANT CREDIT", "$ CARD"],
    steps: [
      {
        title: "Deposit USDC",
        body: "From an exchange or an external address you control.",
      },
      {
        title: "Credited instantly",
        body: "Lands as spendable dollars on confirmation. No conversion step.",
      },
      {
        title: "Same card, same fee",
        body: "One Visa card, whichever way you funded it.",
      },
      {
        title: "Withdraw anytime",
        body: "Back out as USDC, or to your Nigerian bank in Naira.",
      },
    ],
    note: "USDC is the rail underneath every Flick balance — including Naira funding. Holding it yourself just skips a step.",
  },
];

/* ── Merchants (the light band) ────────────────────────────────────────── */

export const merchantsHead = {
  title: "Works where you already shop.",
  lede: "If the checkout takes Visa, it takes Flick — including the subscriptions, tools and fees a Naira card so often fails on.",
};

export type MerchantGroup = { id: string; label: string; names: string[] };

/** Typed wordmarks, not third-party logo files. */
export const merchantGroups: MerchantGroup[] = [
  {
    id: "subscriptions",
    label: "Subscriptions",
    names: [
      "Netflix",
      "Spotify",
      "Apple",
      "YouTube Premium",
      "Disney+",
      "Audible",
      "Duolingo",
      "iCloud",
      "Prime Video",
      "Canva",
      "Headspace",
      "Xbox",
    ],
  },
  {
    id: "work",
    label: "Work tools",
    names: [
      "Figma",
      "Notion",
      "OpenAI",
      "Adobe",
      "GitHub",
      "Slack",
      "Zoom",
      "Linear",
      "Framer",
      "Webflow",
      "Loom",
      "Miro",
    ],
  },
  {
    id: "shopping",
    label: "Shopping & travel",
    names: [
      "Amazon",
      "AliExpress",
      "Shein",
      "eBay",
      "Etsy",
      "Steam",
      "Booking.com",
      "Airbnb",
      "Temu",
      "Nike",
      "PlayStation",
      "Uber",
    ],
  },
  {
    id: "learning",
    label: "Learning",
    names: [
      "Coursera",
      "Udemy",
      "edX",
      "Skillshare",
      "MasterClass",
      "ETS · GRE",
      "IELTS",
      "Common App",
      "DataCamp",
      "Brilliant",
      "Pearson VUE",
      "LinkedIn Learning",
    ],
  },
  {
    id: "ads",
    label: "Ads & hosting",
    names: [
      "Google Ads",
      "Meta Ads",
      "Shopify",
      "AWS",
      "Vercel",
      "DigitalOcean",
      "Namecheap",
      "Cloudflare",
      "TikTok Ads",
      "Mailchimp",
      "Hostinger",
      "Squarespace",
    ],
  },
];

/* ── Corridor stories ──────────────────────────────────────────────────── */

export type Corridor = { from: string; to: string; story: string; amount: string };

export const corridorsHead = {
  eyebrow: "Real checkouts",
  title: "Money moves out, the way it was meant to.",
  lede: "Every charge is a small story about something that used to fail.",
  close: "One card. Every checkout that takes Visa.",
};

export const corridors: Corridor[] = [
  {
    from: "Lagos",
    to: "Figma",
    story: "A product designer pays for two Figma seats on the 1st, every month, without a declined email.",
    amount: "−$30.00",
  },
  {
    from: "Abuja",
    to: "ETS",
    story: "A student books the GRE the day registration opens, not after the bank's monthly limit resets.",
    amount: "−$220.00",
  },
  {
    from: "Kano",
    to: "Meta Ads",
    story: "A fabric shop keeps a campaign live through Sallah instead of watching it pause on day two.",
    amount: "−$84.00",
  },
  {
    from: "Port Harcourt",
    to: "AWS",
    story: "A two-person studio keeps a client's servers up when the hosting renewal lands at 2am.",
    amount: "−$61.20",
  },
  {
    from: "Enugu",
    to: "Steam",
    story: "A gamer buys the launch-day edition in dollars, with the Naira cost shown before checkout.",
    amount: "−$59.99",
  },
  {
    from: "Ibadan",
    to: "Coursera",
    story: "A nurse finishes a certificate course abroad, paid month by month from a Naira balance.",
    amount: "−$49.00",
  },
];

/* ── Fees ──────────────────────────────────────────────────────────────── */

export const feesHead = {
  eyebrow: "What it costs",
  title: "One fee, shown before you confirm.",
  lede: "Compare it to what moving $500 into dollars costs you today. No monthly fee, no minimum balance, no charge to issue or freeze the card.",
};

export const feeColumns = ["Route", "Cost to send $500", "Time"];

export const feeRows = [
  { cells: ["Flick", "0.80%", "2–5 min"], highlight: true },
  { cells: ["Bank dollar card", "~3.50%", "2–6 weeks"] },
  { cells: ["Bureau de Change", "5–10%", "Same day"] },
  { cells: ["International transfer", "4–7%", "1–3 days"] },
];

/* ── Trust ─────────────────────────────────────────────────────────────── */

export const trustHead = {
  eyebrow: "Commitments",
  title: "What we do, and what we don't.",
};

export const weDo = [
  "Show the live rate and the fee before you confirm",
  "Issue the card in minutes after verification",
  "Let you freeze, unfreeze or replace it yourself",
  "Settle merchants in their own currency",
];

export const weDont = [
  "Hold a Naira balance you cannot spend abroad",
  "Charge a monthly fee or a minimum balance",
  "Reprice a transfer after you confirm it",
  "Ask you to call anyone to raise a limit",
];

export const trustNote =
  "Cards are issued by a licensed partner on the Visa network. Balances are held in USDC and settle to merchants in their own currency.";

/* ── FAQ ───────────────────────────────────────────────────────────────── */

export type Faq = { q: string; a: string };

export const faqHead = {
  eyebrow: "Questions",
  title: "Questions we get asked.",
};

export const faqs: Faq[] = [
  {
    q: "Is this a crypto product?",
    a: "No. You fund in Naira, you spend in dollars on a Visa card. Dollar balances are held in USDC behind the scenes — you never touch it.",
  },
  {
    q: "Where does the card work?",
    a: "Any online checkout that accepts Visa — around 150 million merchants. Physical card support comes later.",
  },
  {
    q: "What does it cost?",
    a: "0.80% on funding. No monthly fee, no minimum balance, no charge to issue or freeze the card.",
  },
  {
    q: "How long does funding take?",
    a: "Two to five minutes for a bank transfer during banking hours. USDC deposits credit on confirmation.",
  },
  {
    q: "What do I need to sign up?",
    a: "A Nigerian phone number, a BVN or NIN, and a photo of a government ID. Verification is usually done in under ten minutes.",
  },
  {
    q: "Can I get my money back out?",
    a: "Yes. Withdraw to your Nigerian bank account in Naira, or out as USDC to an address you control.",
  },
];

/* ── Closing ───────────────────────────────────────────────────────────── */

export type ClosingCard = { title: string; body: string; icon: IconName };

export const closing = {
  title: ["A dollar card", "for the way you", "actually live."],
  lede: "Fund in Naira, spend in dollars, withdraw whenever you want. Early access opens in batches — join once and we'll hold your place.",
  action: "Join",
  tagline: "Flick — your card is waiting for an address.",
};

export const closingCards: ClosingCard[] = [
  {
    title: "Spend globally",
    body: "At any online checkout that takes Visa",
    icon: "card",
  },
  {
    title: "Fund like a local",
    body: "Bank transfer or mobile money, in Naira",
    icon: "swap",
  },
  {
    title: "Withdraw anytime",
    body: "Back to your bank in Naira, or out as USDC",
    icon: "arrow-down",
  },
];

/* ── Footer ────────────────────────────────────────────────────────────── */

export type FooterColumn = { heading: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#merchants", label: "Where it works" },
      { href: "#fees", label: "Fees" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#trust", label: "What we do" },
      { href: "#faq", label: "FAQ" },
      { href: "#join", label: "Press" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "#trust", label: "Terms" },
      { href: "#trust", label: "Privacy" },
      { href: "#trust", label: "Licensing" },
    ],
  },
];

export const footerBlurb =
  "Flick is a financial technology company, not a bank. Cards are issued by a licensed partner on the Visa network. A dollar card that works at any online checkout in the world. Nigeria first.";

export const footerLegal =
  "FLICK · CARDS ISSUED UNDER LICENCE ON THE VISA NETWORK · © 2026";
