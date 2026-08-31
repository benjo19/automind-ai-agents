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

const FIELDS = "id,name,account_id,campaign_id,status,daily_budget,lifetime_budget";

export default defineTool({
  name: "set_ad_set_daily_budget",
  title: "Set Meta ad set daily budget",
  description:
    "Use this to change the daily budget of one ad set in the private Automind Meta ad account. Requires 'ad_set_id' (numeric), 'daily_budget_eur' (minimum 1 EUR, capped by a server-side hard cap) and 'confirmed' set to true. CONSEQUENTIAL: this changes live spend — call it only after the user has explicitly confirmed the exact ad set and amount. Returns no_change=true when the budget already matches; otherwise writes integer cents, re-reads the ad set and returns before/after in cents and EUR.",
  inputSchema: {
    ad_set_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "ad_set_id must be a numeric Meta ad set ID")
      .describe("Numeric Meta ad set ID from list_ad_sets."),
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
  handler: async ({ ad_set_id, daily_budget_eur, confirmed }, ctx) => {
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

    const owned = await fetchOwnedObject(ad_set_id, FIELDS, "Ad set");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");
    const beforeCents = owned.data?.daily_budget ?? null;

    if (beforeCents !== null && Number(beforeCents) === cents) {
      return jsonResult({
        ad_set_id,
        ad_set_name: owned.data?.name ?? null,
        campaign_id: owned.data?.campaign_id ?? null,
        no_change: true,
        before_daily_budget_cents: Number(beforeCents),
        before_daily_budget_eur: centsToEur(beforeCents),
        after_daily_budget_cents: Number(beforeCents),
        after_daily_budget_eur: centsToEur(beforeCents),
        hard_cap_eur: cap,
        verified: true,
      });
    }

    const post = await graphPost(ad_set_id, { daily_budget: String(cents) });
    if (!post.data) {
      if (post.status === 400) {
        return errorResult(
          "Meta rejected the budget change. This ad set likely uses a campaign-level (CBO) or lifetime budget — change the budget at that level instead.",
        );
      }
      return upstreamError(post.status);
    }

    const check = await graphGet(ad_set_id, { fields: FIELDS });
    if (!check.data) return upstreamError(check.status);
    const afterCents = check.data?.daily_budget ?? null;

    return jsonResult({
      ad_set_id,
      ad_set_name: check.data?.name ?? owned.data?.name ?? null,
      campaign_id: check.data?.campaign_id ?? owned.data?.campaign_id ?? null,
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
