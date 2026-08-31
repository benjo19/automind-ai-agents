import { defineTool } from "@lovable.dev/mcp-js";
import {
  AD_ACCOUNT_ID,
  errorResult,
  graphGet,
  jsonResult,
  requireAdmin,
  upstreamError,
} from "../meta";

export default defineTool({
  name: "get_ad_account",
  title: "Get Meta ad account",
  description:
    "Use this to read basic status of the Automind Meta ad account. Returns id, name, account_status, currency and timezone_name. Read-only, no inputs.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (_input, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return errorResult(denied);

    const res = await graphGet(AD_ACCOUNT_ID, {
      fields: "id,name,account_status,currency,timezone_name",
    });
    if (!res.data) return upstreamError(res.status);

    const d = res.data ?? {};
    return jsonResult({
      id: d.id ?? null,
      name: d.name ?? null,
      account_status: d.account_status ?? null,
      currency: d.currency ?? null,
      timezone_name: d.timezone_name ?? null,
    });
  },
});
