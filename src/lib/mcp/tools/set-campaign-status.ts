import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  errorResult,
  fetchOwnedObject,
  graphGet,
  graphPost,
  jsonResult,
  requireAdmin,
  upstreamError,
} from "../meta";

const FIELDS = "id,name,account_id,status,effective_status";

export default defineTool({
  name: "set_campaign_status",
  title: "Set Meta campaign status",
  description:
    "Use this to activate or pause one campaign in the private Automind Meta ad account. Requires 'campaign_id' (numeric), 'status' (ACTIVE or PAUSED) and 'confirmed' set to true. CONSEQUENTIAL: this changes live ad delivery and spend — call it only after the user has explicitly confirmed this exact campaign and status in the conversation. If the campaign is already in the requested configured status it returns no_change=true without writing. Otherwise it writes and re-reads the campaign, returning before/after status and verified=true.",
  inputSchema: {
    campaign_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "campaign_id must be a numeric Meta campaign ID")
      .describe("Numeric Meta campaign ID from list_campaigns."),
    status: z.enum(["ACTIVE", "PAUSED"]).describe("Target configured status: ACTIVE or PAUSED."),
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
  handler: async ({ campaign_id, status, confirmed }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);
    if (confirmed !== true) return errorResult("Explicit user confirmation is required.");

    const owned = await fetchOwnedObject(campaign_id, FIELDS, "Campaign");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");
    const before = owned.data?.status ?? null;

    if (before === status) {
      return jsonResult({
        campaign_id,
        campaign_name: owned.data?.name ?? null,
        no_change: true,
        before_status: before,
        after_status: before,
        verified: true,
      });
    }

    const post = await graphPost(campaign_id, { status });
    if (!post.data) return upstreamError(post.status);

    const check = await graphGet(campaign_id, { fields: FIELDS });
    if (!check.data) return upstreamError(check.status);
    const after = check.data?.status ?? null;

    return jsonResult({
      campaign_id,
      campaign_name: check.data?.name ?? owned.data?.name ?? null,
      no_change: false,
      before_status: before,
      after_status: after,
      effective_status: check.data?.effective_status ?? null,
      verified: after === status,
    });
  },
});
