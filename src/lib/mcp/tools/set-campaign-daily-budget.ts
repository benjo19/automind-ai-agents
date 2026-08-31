import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  centsToEur,
  errorResult,
  eurToCents,
  fetchOwnedObject,
  graphGet,
  graphPost,
  jsonResult,
  maxDailyBudgetEur,
  requireAdmin,
  upstreamError,
} from "../meta";

const FIELDS = "id,name,account_id,status,daily_budget,lifetime_budget";

export default defineTool({
  name: "set_campaign_daily_budget",
  title: "Set Meta campaign daily budget",
  description:
    "Use this to change the daily budget of one campaign in the private Automind Meta ad account. Requires 'campaign_id' (numeric), 'daily_budget_eur' (minimum 1 EUR, capped by a server-side hard cap) and 'confirmed' set to true. CONSEQUENTIAL: this changes live spend — call it only after the user has explicitly confirmed the exact campaign and amount. Returns no_change=true when the budget already matches; otherwise writes the amount in integer cents, re-reads the campaign and returns before/after in cents and EUR.",
  inputSchema: {
    campaign_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "campaign_id must be a numeric Meta campaign ID")
      .describe("Numeric Meta campaign ID from list_campaigns."),
    daily_budget_eur: z
      .number()
      .min(1)
      .describe("New daily budget in EUR (minimum 1, limited by the server hard cap)."),
    confirmed: z
      .literal(true)
      .describe("Must be true and only after the user explicitly confirmed this change."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async ({ campaign_id, daily_budget_eur, confirmed }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);
    if (confirmed !== true) return errorResult("Explicit user confirmation is required.");

    const cap = maxDailyBudgetEur();
    const cents = eurToCents(daily_budget_eur);
    if (cents === null) return errorResult("daily_budget_eur must be a valid positive number.");
    if (daily_budget_eur < 1) return errorResult("daily_budget_eur must be at least 1 EUR.");
    if (daily_budget_eur > cap) {
      return errorResult(`daily_budget_eur exceeds the server hard cap of ${cap} EUR.`);
    }

    const owned = await fetchOwnedObject(campaign_id, FIELDS, "Campaign");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");
    const beforeCents = owned.data?.daily_budget ?? null;

    if (beforeCents !== null && Number(beforeCents) === cents) {
      return jsonResult({
        campaign_id,
        campaign_name: owned.data?.name ?? null,
        no_change: true,
        before_daily_budget_cents: Number(beforeCents),
        before_daily_budget_eur: centsToEur(beforeCents),
        after_daily_budget_cents: Number(beforeCents),
        after_daily_budget_eur: centsToEur(beforeCents),
        hard_cap_eur: cap,
        verified: true,
      });
    }

    const post = await graphPost(campaign_id, { daily_budget: String(cents) });
    if (!post.data) {
      if (post.status === 400) {
        return errorResult(
          "Meta rejected the budget change. This campaign likely uses ad-set level budgets — set the daily budget on the ad set instead.",
        );
      }
      return upstreamError(post.status);
    }

    const check = await graphGet(campaign_id, { fields: FIELDS });
    if (!check.data) return upstreamError(check.status);
    const afterCents = check.data?.daily_budget ?? null;

    return jsonResult({
      campaign_id,
      campaign_name: check.data?.name ?? owned.data?.name ?? null,
      no_change: false,
      before_daily_budget_cents: beforeCents === null ? null : Number(beforeCents),
      before_daily_budget_eur: centsToEur(beforeCents),
      after_daily_budget_cents: afterCents === null ? null : Number(afterCents),
      after_daily_budget_eur: centsToEur(afterCents),
      hard_cap_eur: cap,
      verified: afterCents !== null && Number(afterCents) === cents,
    });
  },
});
