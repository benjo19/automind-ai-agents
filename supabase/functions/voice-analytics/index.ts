import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";

interface Payload {
  event: "start" | "end";
  session_id: string;
  agent_id?: string;
  lead_id?: string;
  stop_cause?: string;
  duration_seconds?: number;
  utm?: Record<string, string | undefined>;
  referrer?: string;
  page_url?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    if (!body?.event || !body?.session_id) {
      return new Response(JSON.stringify({ error: "Missing event or session_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const utm = body.utm ?? {};
    const nowIso = new Date().toISOString();

    if (body.event === "start") {
      const { error } = await supabase.from("voice_demo_sessions").upsert(
        {
          session_id: body.session_id,
          agent_id: body.agent_id ?? null,
          lead_id: body.lead_id ?? null,
          started_at: nowIso,
          utm_source: utm.utm_source ?? null,
          utm_medium: utm.utm_medium ?? null,
          utm_campaign: utm.utm_campaign ?? null,
          utm_term: utm.utm_term ?? null,
          utm_content: utm.utm_content ?? null,
          referrer: body.referrer ?? null,
          page_url: body.page_url ?? null,
          user_agent: body.user_agent ?? null,
          metadata: body.metadata ?? {},
        },
        { onConflict: "session_id" },
      );
      if (error) console.error("insert start error", error);
    } else if (body.event === "end") {
      const { error } = await supabase
        .from("voice_demo_sessions")
        .update({
          ended_at: nowIso,
          duration_seconds: body.duration_seconds ?? null,
          stop_cause: body.stop_cause ?? null,
          updated_at: nowIso,
          metadata: body.metadata ?? {},
        })
        .eq("session_id", body.session_id);
      if (error) console.error("update end error", error);
    }

    // Forward to Make.com report webhook (fire-and-forget but awaited briefly)
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "voice_demo",
          event: body.event,
          timestamp: nowIso,
          session_id: body.session_id,
          agent_id: body.agent_id ?? null,
          lead_id: body.lead_id ?? null,
          duration_seconds: body.duration_seconds ?? null,
          stop_cause: body.stop_cause ?? null,
          utm_source: utm.utm_source ?? null,
          utm_medium: utm.utm_medium ?? null,
          utm_campaign: utm.utm_campaign ?? null,
          utm_term: utm.utm_term ?? null,
          utm_content: utm.utm_content ?? null,
          referrer: body.referrer ?? null,
          page_url: body.page_url ?? null,
          user_agent: body.user_agent ?? null,
        }),
      });
    } catch (e) {
      console.error("make webhook error", e);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
