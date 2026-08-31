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

export default defineTool({
  name: "list_campaigns",
  title: "List Meta campaigns",
  description:
    "Use this to list campaigns in the Automind Meta ad account. Optional 'limit' between 1 and 50 (default 20). Returns id, name, status, effective_status, objective, created_time and updated_time for each campaign. Read-only.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("Maximum campaigns to return (1-50, default 20)."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async ({ limit }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);

    const bounded = Math.min(Math.max(limit ?? 20, 1), 50);
    const res = await graphGet(`${AD_ACCOUNT_ID}/campaigns`, {
      fields: "id,name,status,effective_status,objective,created_time,updated_time",
      limit: String(bounded),
    });
    if (!res.data) return upstreamError(res.status);

    const rows = Array.isArray(res.data?.data) ? res.data.data : [];
    const campaigns = rows.slice(0, bounded).map((c: any) => ({
      id: c?.id ?? null,
      name: c?.name ?? null,
      status: c?.status ?? null,
      effective_status: c?.effective_status ?? null,
      objective: c?.objective ?? null,
      created_time: c?.created_time ?? null,
      updated_time: c?.updated_time ?? null,
    }));

    return jsonResult({ count: campaigns.length, limit: bounded, campaigns });
  },
});
