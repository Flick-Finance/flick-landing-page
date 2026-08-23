"use server";

import { EMAIL_PATTERN, type WaitlistState } from "@/lib/waitlist";

/**
 * Early access opens in batches, so the only thing the form has to do is hold
 * a place. No store is wired up yet — swap the `console.info` for the real
 * write and the rest of the flow stays the same.
 */
export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Enter an email address we can reach you at.",
    };
  }

  console.info("[waitlist] joined:", email);

  return {
    status: "success",
    message: "We'll email when your card is ready to issue.",
  };
}
