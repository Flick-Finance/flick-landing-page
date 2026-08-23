"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist } from "@/app/actions";
import { cn } from "@/lib/cn";
import { initialWaitlistState } from "@/lib/waitlist";
import { Badge } from "./Badge";
import { Button } from "./Button";

type EmailCaptureProps = {
  /** Submit label. "Join the waitlist" in the hero, "Join" in the closing band. */
  action?: string;
  placeholder?: string;
  className?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Joining…" : label}
    </Button>
  );
}

export function EmailCapture({
  action = "Join",
  placeholder = "you@example.com",
  className,
}: EmailCaptureProps) {
  const [state, formAction] = useActionState(joinWaitlist, initialWaitlistState);
  const inputId = useId();
  const messageId = `${inputId}-message`;

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn("flex flex-wrap items-center gap-3", className)}
      >
        <Badge tone="accent">You&rsquo;re on the list</Badge>
        <span className="text-sm text-bone-300">{state.message}</span>
      </p>
    );
  }

  return (
    <div className={cn("w-full max-w-115", className)}>
      <form
        action={formAction}
        noValidate
        className="flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800 py-2 pl-6 pr-2 transition-colors duration-160 ease-out focus-within:border-green-500 max-sm:pl-4"
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? messageId : undefined}
          className="min-w-0 flex-1 border-none bg-transparent font-body text-base text-bone-100 outline-none placeholder:text-bone-400 max-sm:text-sm"
        />
        <SubmitButton label={action} />
      </form>

      {state.status === "error" ? (
        <p id={messageId} role="alert" className="mt-3 px-6 text-sm text-signal-red">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
