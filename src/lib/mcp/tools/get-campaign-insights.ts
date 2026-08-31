import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  AD_ACCOUNT_ID,
  errorResult,
  graphGet,
  jsonResult,
  requireAdmin,
  upstreamError,
} from "../meta";

const DATE_PRESETS = ["today", "yesterday", "last_7d", "last_14d", "last_30d"] as const;

const METRICS = [
  "spend",
  "impressions",
  "reach",
  "clicks",
  "inline_link_clicks",
  "ctr",
  "cpc",
  "cpm",
] as const;

export default defineTool({
  name: "get_campaign_insights",
  title: "Get Meta campaign insights",
  description:
    "Use this to read performance metrics for one campaign in the Automind Meta ad account. Requires 'campaign_id' (must belong to the account) and 'date_preset' (today, yesterday, last_7d, last_14d, last_30d). Returns spend, impressions, reach, clicks, inline_link_clicks, ctr, cpc, cpm and actions when Meta reports them. Read-only; missing metrics are returned as null and never estimated.",
  inputSchema: {
    campaign_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "campaign_id must be a numeric Meta campaign ID")
      .describe("Numeric Meta campaign ID from list_campaigns."),
    date_preset: z
      .enum(DATE_PRESETS)
      .describe("Reporting window: today, yesterday, last_7d, last_14d or last_30d."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async ({ campaign_id, date_preset }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);

    // Ownership check: the campaign must belong to the allowed ad account.
    const owner = await graphGet(campaign_id, { fields: "id,name,account_id" });
    if (!owner.data) {
      return owner.status === 400 || owner.status === 404
        ? errorResult("Campaign not found.")
        : upstreamError(owner.status);
    }
    const accountId = owner.data?.account_id ? `act_${owner.data.account_id}` : null;
    if (accountId !== AD_ACCOUNT_ID) {
      return errorResult("Campaign does not belong to the allowed ad account.");
    }

    const res = await graphGet(`${campaign_id}/insights`, {
      fields: [...METRICS, "actions"].join(","),
      date_preset,
      limit: "1",
    });
    if (!res.data) return upstreamError(res.status);

    const row = Array.isArray(res.data?.data) ? res.data.data[0] : undefined;
    if (!row) {
      return jsonResult({
        campaign_id,
        campaign_name: owner.data?.name ?? null,
        date_preset,
        has_data: false,
        metrics: null,
        actions: null,
      });
    }

    const metrics: Record<string, string | null> = {};
    for (const m of METRICS) metrics[m] = row?.[m] ?? null;

    const actions = Array.isArray(row?.actions)
      ? row.actions
          .slice(0, 25)
          .map((a: any) => ({ action_type: a?.action_type ?? null, value: a?.value ?? null }))
      : null;

    return jsonResult({
      campaign_id,
      campaign_name: owner.data?.name ?? null,
      date_preset,
      has_data: true,
      metrics,
      actions,
    });
  },
});
