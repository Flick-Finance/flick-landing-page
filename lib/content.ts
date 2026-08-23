/**
 * Every string on the landing page lives here so copy changes never require
 * touching a component. Voice rules (sentence case, no exclamation marks,
 * numbers instead of adjectives) come from the design system readme.
 */

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "#how", label: "How it works" },
  { href: "#fees", label: "Fees" },
  { href: "#who", label: "Who it's for" },
  { href: "#faq", label: "FAQ" },
  { href: "#join", label: "Early access" },
];

export const heroStats = ["0.80% FEE", "2–5 MIN TO FUND", "150M+ MERCHANTS"];

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

/** Typed wordmarks, not third-party logo files. */
export const merchants = [
  "Netflix",
  "Figma",
  "Apple",
  "Amazon",
  "Steam",
  "Notion",
  "Google Ads",
  "Spotify",
  "Coursera",
  "Adobe",
  "Shopify",
  "OpenAI",
];

export type Step = { step: string; title: string; body: string; depth: number };

export const steps: Step[] = [
  {
    step: "01",
    title: "Fund with Naira",
    body: "Bank transfer or mobile money. The live rate is shown before you confirm.",
    depth: 0.34,
  },
  {
    step: "02",
    title: "Get your card",
    body: "Issued instantly after verification. Number, expiry and CVV in-app.",
    depth: 0.52,
  },
  {
    step: "03",
    title: "Spend anywhere",
    body: "Any online checkout that takes Visa. 150M+ merchants.",
    depth: 0.7,
  },
];

export type PersonaId = "naira" | "usdc";

export type Persona = {
  id: PersonaId;
  label: string;
  title: string;
  body: string;
  facts: string[];
  note: string;
};

/** Tab two is the only place crypto vocabulary is allowed. */
export const personas: Persona[] = [
  {
    id: "naira",
    label: "I hold Naira",
    title: "Transfer Naira, spend dollars.",
    body: "Send Naira from any Nigerian bank or mobile money app. You see the live rate and the fee before you confirm — nothing moves until you tap. Your balance lands in dollars, ready at checkout.",
    facts: ["Bank transfer", "Live rate shown", "2–5 min to fund"],
    note: "The rate you see is the rate you get. If it moves while you are confirming, we show you the new one instead of quietly repricing.",
  },
  {
    id: "usdc",
    label: "I already hold USDC",
    title: "Bring your USDC, get a Visa card.",
    body: "Deposit USDC from an exchange or an external address and it credits as spendable dollars. Same card, same fee, no conversion step. Withdraw back out whenever you want.",
    facts: ["USDC deposit", "Instant credit", "Withdraw anytime"],
    note: "USDC is the rail underneath every Flick balance — including Naira funding. Holding it yourself just skips a step.",
  },
];

export const feeColumns = ["Route", "Cost to send $500", "Time"];

export const feeRows = [
  { cells: ["Flick", "0.80%", "2–5 min"], highlight: true },
  { cells: ["Bank dollar card", "~3.50%", "2–6 weeks"] },
  { cells: ["Bureau de Change", "5–10%", "Same day"] },
  { cells: ["International transfer", "4–7%", "1–3 days"] },
];

export type Audience = { title: string; body: string };

export const audiences: Audience[] = [
  {
    title: "Freelancers paid in dollars",
    body: "Invoice abroad, keep the balance in dollars, spend it without a round trip through Naira and back.",
  },
  {
    title: "Shoppers tired of declines",
    body: "One card that behaves the same at a US checkout as it does at a UK one. No limit letters.",
  },
  {
    title: "Students paying abroad",
    body: "Tuition portals, exam fees, subscriptions on a school licence — paid on the deadline, not after it.",
  },
  {
    title: "Small businesses buying tools",
    body: "Ad spend, SaaS seats, hosting. Recurring charges that cannot fail in the middle of a campaign.",
  },
  {
    title: "Families sending money home",
    body: "Fund a card, share the balance, let the spend happen where the person actually is.",
  },
];

export type LedgerRow = { merchant: string; amount: string; credit?: boolean };

export const appBalance = "$1,284.60";

export const appLedger: LedgerRow[] = [
  { merchant: "FIGMA", amount: "−$15.00" },
  { merchant: "NETFLIX", amount: "−$6.99" },
  { merchant: "FUNDED", amount: "+$200.00", credit: true },
];

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

export type Faq = { q: string; a: string };

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

export type FooterColumn = { heading: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#fees", label: "Fees" },
      { href: "#app", label: "Get the app" },
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
  "A dollar card that works at any online checkout in the world. Nigeria first.";

export const footerLegal =
  "FLICK · CARDS ISSUED UNDER LICENCE ON THE VISA NETWORK · © 2026";
