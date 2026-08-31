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
      : status === 403
        ? "Meta API refused the request (permission denied). The server token may lack ads_management."
        : status === 400
          ? "Meta API rejected the request (invalid parameters or not allowed for this object)."
          : `Meta API request failed (status ${status}).`,
  );
}

/**
 * Read-only Graph API POST (write). Token stays server-side; body and upstream
 * response bodies are never logged or surfaced.
 */
export async function graphPost(
  path: string,
  params: Record<string, string>,
): Promise<{ data: any | null; status: number }> {
  const token = runtimeEnv("META_SYSTEM_USER_TOKEN");
  if (!token) return { data: null, status: 500 };

  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) body.set(k, v);

  const resp = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!resp.ok) {
    console.error("meta graph write failed", resp.status);
    return { data: null, status: resp.status };
  }
  return { data: await resp.json().catch(() => ({})), status: 200 };
}

/** Money helpers: Meta returns minor units (cents) as strings. */
export function centsToEur(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.round(n) / 100;
}

export function eurToCents(value: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const cents = Math.round(value * 100);
  if (!Number.isInteger(cents) || cents <= 0) return null;
  return cents;
}

/** Server-side hard cap for any daily budget write. */
export function maxDailyBudgetEur(): number {
  const raw = runtimeEnv("META_MAX_DAILY_BUDGET_EUR");
  const n = raw ? Number(raw) : NaN;
  if (!Number.isFinite(n) || n <= 0) return 100;
  return Math.min(n, 100000);
}

export type Owned = {
  ok: boolean;
  data?: any;
  result?: ReturnType<typeof errorResult>;
};


/** Fetch an object and verify it belongs to the allowed ad account. */
export async function fetchOwnedObject(
  objectId: string,
  fields: string,
  label: "Campaign" | "Ad set",
): Promise<Owned> {
  const res = await graphGet(objectId, { fields });
  if (!res.data) {
    return {
      ok: false,
      result:
        res.status === 400 || res.status === 404
          ? errorResult(`${label} not found.`)
          : upstreamError(res.status),
    };
  }
  const raw = res.data?.account_id;
  const accountId = raw ? (String(raw).startsWith("act_") ? String(raw) : `act_${raw}`) : null;
  if (accountId !== AD_ACCOUNT_ID) {
    return {
      ok: false,
      result: errorResult(`${label} does not belong to the allowed ad account.`),
    };
  }
  return { ok: true, data: res.data };
}

