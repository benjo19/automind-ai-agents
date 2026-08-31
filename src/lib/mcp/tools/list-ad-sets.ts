import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  centsToEur,
  errorResult,
  fetchOwnedObject,
  graphGet,
  jsonResult,
  requireAdmin,
  upstreamError,
} from "../meta";

const AD_SET_FIELDS =
  "id,name,status,effective_status,daily_budget,lifetime_budget,budget_remaining,optimization_goal,billing_event,start_time,end_time,campaign_id";

export default defineTool({
  name: "list_ad_sets",
  title: "List Meta ad sets",
  description:
    "Use this to list ad sets of one campaign in the private Automind Meta ad account. Requires 'campaign_id' (numeric) and accepts optional 'limit' (1-50, default 20). Returns id, name, status, effective_status, daily_budget, lifetime_budget, budget_remaining, optimization_goal, billing_event, start_time, end_time and campaign_id, plus *_eur values for monetary fields. Read-only.",
  inputSchema: {
    campaign_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "campaign_id must be a numeric Meta campaign ID")
      .describe("Numeric Meta campaign ID from list_campaigns."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("Maximum ad sets to return (1-50, default 20)."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async ({ campaign_id, limit }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);

    const owned = await fetchOwnedObject(campaign_id, "id,name,account_id", "Campaign");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");

    const bounded = Math.min(Math.max(limit ?? 20, 1), 50);
    const res = await graphGet(`${campaign_id}/adsets`, {
      fields: AD_SET_FIELDS,
      limit: String(bounded),
    });
    if (!res.data) return upstreamError(res.status);

    const rows = Array.isArray(res.data?.data) ? res.data.data : [];
    const ad_sets = rows.slice(0, bounded).map((a: any) => ({
      id: a?.id ?? null,
      name: a?.name ?? null,
      status: a?.status ?? null,
      effective_status: a?.effective_status ?? null,
      daily_budget: a?.daily_budget ?? null,
      daily_budget_eur: centsToEur(a?.daily_budget),
      lifetime_budget: a?.lifetime_budget ?? null,
      lifetime_budget_eur: centsToEur(a?.lifetime_budget),
      budget_remaining: a?.budget_remaining ?? null,
      budget_remaining_eur: centsToEur(a?.budget_remaining),
      optimization_goal: a?.optimization_goal ?? null,
      billing_event: a?.billing_event ?? null,
      start_time: a?.start_time ?? null,
      end_time: a?.end_time ?? null,
      campaign_id: a?.campaign_id ?? campaign_id,
    }));

    return jsonResult({
      campaign_id,
      campaign_name: owned.data?.name ?? null,
      count: ad_sets.length,
      limit: bounded,
      ad_sets,
    });
  },
});
