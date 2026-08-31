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

const FIELDS = "id,name,account_id,campaign_id,status,effective_status";

export default defineTool({
  name: "set_ad_set_status",
  title: "Set Meta ad set status",
  description:
    "Use this to activate or pause one ad set in the private Automind Meta ad account. Requires 'ad_set_id' (numeric), 'status' (ACTIVE or PAUSED) and 'confirmed' set to true. CONSEQUENTIAL: this changes live ad delivery and spend — call it only after the user has explicitly confirmed this exact ad set and status. Returns no_change=true when the configured status already matches; otherwise writes, re-reads and returns before/after status with verified=true.",
  inputSchema: {
    ad_set_id: z
      .string()
      .trim()
      .regex(/^\d{5,25}$/, "ad_set_id must be a numeric Meta ad set ID")
      .describe("Numeric Meta ad set ID from list_ad_sets."),
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
  handler: async ({ ad_set_id, status, confirmed }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);
    if (confirmed !== true) return errorResult("Explicit user confirmation is required.");

    const owned = await fetchOwnedObject(ad_set_id, FIELDS, "Ad set");
    if (!owned.ok) return owned.result ?? errorResult("Ownership check failed.");
    const before = owned.data?.status ?? null;

    if (before === status) {
      return jsonResult({
        ad_set_id,
        ad_set_name: owned.data?.name ?? null,
        campaign_id: owned.data?.campaign_id ?? null,
        no_change: true,
        before_status: before,
        after_status: before,
        verified: true,
      });
    }

    const post = await graphPost(ad_set_id, { status });
    if (!post.data) return upstreamError(post.status);

    const check = await graphGet(ad_set_id, { fields: FIELDS });
    if (!check.data) return upstreamError(check.status);
    const after = check.data?.status ?? null;

    return jsonResult({
      ad_set_id,
      ad_set_name: check.data?.name ?? owned.data?.name ?? null,
      campaign_id: check.data?.campaign_id ?? owned.data?.campaign_id ?? null,
      no_change: false,
      before_status: before,
      after_status: after,
      effective_status: check.data?.effective_status ?? null,
      verified: after === status,
    });
  },
});
