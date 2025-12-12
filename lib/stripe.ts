/**
 * Stripe integration utilities
 */

/**
 * Check if Stripe is enabled and configured
 * @returns true if Stripe API keys are configured
 */
export function isStripeEnabled(): boolean {
  return !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}

/**
 * Get Stripe instance (lazy loaded)
 */
export async function getStripe() {
  if (!isStripeEnabled()) {
    throw new Error(
      "Stripe is not configured. Please add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.",
    )
  }

  const Stripe = (await import("stripe")).default
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  })
}
