// Read-only Meta Marketing API connectivity check.
// Requires an authenticated admin user. Never exposes the system-user token.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const AD_ACCOUNT_ID = "act_336967666";
const GRAPH_VERSION = "v21.0";
const FIELDS = "id,name,account_status,currency,timezone_name";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET" && req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "unauthorized" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    if (!supabaseUrl || !anonKey) return json({ error: "server_misconfigured" }, 500);

    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) return json({ error: "unauthorized" }, 401);

    // Admin authorization: requires public.has_role(uuid, app_role) to exist.
    const { data: isAdmin, error: roleErr } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleErr || isAdmin !== true) {
      console.error("meta-account-status: admin authorization denied");
      return json({ error: "forbidden" }, 403);
    }

    const token = Deno.env.get("META_SYSTEM_USER_TOKEN");
    if (!token) return json({ error: "server_misconfigured" }, 500);

    const resp = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${AD_ACCOUNT_ID}?fields=${encodeURIComponent(FIELDS)}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!resp.ok) {
      // Log only a coarse status; never the URL, token, headers or payload.
      console.error("meta-account-status: upstream error", resp.status);
      return json({ error: "upstream_error", code: resp.status }, 502);
    }

    const data = await resp.json();
    return json(
      {
        id: data?.id ?? null,
        name: data?.name ?? null,
        account_status: data?.account_status ?? null,
        currency: data?.currency ?? null,
        timezone_name: data?.timezone_name ?? null,
      },
      200,
    );
  } catch {
    console.error("meta-account-status: unexpected error");
    return json({ error: "internal_error" }, 500);
  }
});
