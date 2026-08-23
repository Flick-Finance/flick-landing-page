export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialWaitlistState: WaitlistState = {
  status: "idle",
  message: "",
};

/**
 * Deliberately permissive: the point is to catch typos before a round trip,
 * not to adjudicate RFC 5322. Real verification happens on the confirmation
 * email.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
