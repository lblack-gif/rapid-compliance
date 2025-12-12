/**
 * Subscription management utilities
 */

import { createClient } from "@/lib/supabase"

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid"

export interface UpdateSubscriptionStatusParams {
  userId: string
  subscriptionId: string
  status: SubscriptionStatus
  currentPeriodEnd?: Date
  cancelAtPeriodEnd?: boolean
}

/**
 * Update subscription status in the database
 * @param params Subscription update parameters
 */
export async function updateSubscriptionStatus(
  params: UpdateSubscriptionStatusParams,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("subscriptions").upsert({
      user_id: params.userId,
      subscription_id: params.subscriptionId,
      status: params.status,
      current_period_end: params.currentPeriodEnd?.toISOString(),
      cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[v0] Failed to update subscription status:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating subscription status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Get subscription status for a user
 * @param userId User ID
 */
export async function getSubscriptionStatus(userId: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", userId).single()

    if (error) {
      console.error("[v0] Failed to get subscription status:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("[v0] Error getting subscription status:", error)
    return null
  }
}
