import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  centsToEur,
  errorResult,
  fetchOwnedObject,
  jsonResult,
  requireAdmin,
} from "../meta";

const FIELDS =
  "id,name,status,effective_status,objective,bid_strategy,daily_budget,lifetime_budget,budget_remaining,spend_cap,account_id";

export default defineTool({
  name: "get_campaign_details",
  title: "Get Meta campaign details",
  description:
    "Use this to read the full configuration of one campaign in the private Automind Meta ad account. Requires 'campaign_id' (numeric, must belong to the account). Returns id, name, status, effective_status, objective, bid_strategy, daily_budget, lifetime_budget, budget_remaining, spend_cap and account_id, plus *_eur values for monetary fields. Read-only.",
  inputSchema: {
    campaign_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "campaign_id must be a numeric Meta campaign ID")
      .describe("Numeric Meta campaign ID from list_campaigns."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async ({ campaign_id }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);

    const owned = await fetchOwnedObject(campaign_id, FIELDS, "Campaign");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");
    const c = owned.data ?? {};

    return jsonResult({
      id: c.id ?? null,
      name: c.name ?? null,
      status: c.status ?? null,
      effective_status: c.effective_status ?? null,
      objective: c.objective ?? null,
      bid_strategy: c.bid_strategy ?? null,
      account_id: c.account_id ? `act_${c.account_id}` : null,
      daily_budget: c.daily_budget ?? null,
      daily_budget_eur: centsToEur(c.daily_budget),
      lifetime_budget: c.lifetime_budget ?? null,
      lifetime_budget_eur: centsToEur(c.lifetime_budget),
      budget_remaining: c.budget_remaining ?? null,
      budget_remaining_eur: centsToEur(c.budget_remaining),
      spend_cap: c.spend_cap ?? null,
      spend_cap_eur: centsToEur(c.spend_cap),
    });
  },
});
