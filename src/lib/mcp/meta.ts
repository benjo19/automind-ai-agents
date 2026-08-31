import type { ToolContext } from "@lovable.dev/mcp-js";
import { runtimeEnv, supabaseForUser } from "./supabase";

/** Single server-side constant for the Graph API version. */
export const GRAPH_VERSION = "v21.0";
/** The only ad account this MCP server may ever read. */
export const AD_ACCOUNT_ID = "act_336967666";

/** Returns null when authorized, otherwise a caller-safe reason string. */

/**
 * Verified-token identity + server-side admin allowlist check.
 * Never trusts tool input for identity.
 */
export async function requireAdmin(ctx: ToolContext): Promise<string | null> {
  if (!ctx.isAuthenticated?.() || !ctx.getUserId?.()) {
    return "Not authenticated.";
  }
  try {
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.rpc("is_mcp_admin", {
      _user_id: ctx.getUserId(),
    });
    if (error || data !== true) {
      return "Forbidden: account is not an Automind MCP admin.";
    }
    return null;
  } catch {
    return "Authorization check failed.";
  }
}

export function errorResult(text: string) {
  return { content: [{ type: "text" as const, text }], isError: true as const };
}

export function jsonResult<T extends Record<string, unknown>>(payload: T) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload) }],
    structuredContent: payload,
  };
}

/**
 * Read-only Graph API GET. The system-user token stays server-side and is never
 * returned or logged; upstream error bodies are never surfaced to the caller.
 */
export async function graphGet(
  path: string,
  params: Record<string, string>,
): Promise<{ data: any | null; status: number }> {
  const token = runtimeEnv("META_SYSTEM_USER_TOKEN");
  if (!token) return { data: null, status: 500 };

  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!resp.ok) {
    console.error("meta graph request failed", resp.status);
    return { data: null, status: resp.status };
  }
  return { data: await resp.json(), status: 200 };
}

export function upstreamError(status: number) {
  return errorResult(
    status === 500
      ? "Meta credentials are not configured on the server."
      : `Meta API request failed (status ${status}).`,
  );
}
