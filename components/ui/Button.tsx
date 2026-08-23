import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full " +
  "border border-transparent font-body font-bold leading-tight tracking-[.01em] no-underline " +
  "transition duration-160 ease-out " +
  "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-ink-700 " +
  "disabled:text-bone-400 disabled:translate-y-0 disabled:shadow-none";

/** Press shifts colour only — nothing shrinks or bounces in a money product. */
const VARIANT = {
  primary:
    "bg-green-500 text-ink-900 hover:bg-green-400 hover:-translate-y-px hover:shadow-action " +
    "active:bg-green-600 active:translate-y-0 active:shadow-none",
  secondary:
    "border-ink-500 text-bone-100 hover:border-green-500 hover:text-green-500 active:text-green-600",
  ghost: "text-bone-300 hover:text-bone-100 active:text-green-600",
} as const;

const SIZE = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

type Shared = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: never };

type ButtonAsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

/**
 * Hover, press and disabled states are pure CSS — the design system's states
 * are deterministic, so they don't need to cost a client bundle.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", children, className, ...rest } = props;

  const classes = cn(
    BASE,
    VARIANT[variant],
    SIZE[size],
    variant === "ghost" && "px-3",
    className,
  );

  if ("href" in rest && rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
