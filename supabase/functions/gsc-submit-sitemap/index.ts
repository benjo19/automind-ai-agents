// Submits the project sitemap to Google Search Console.
// Called manually or by a daily pg_cron job so the sitemap stays fresh.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const SITE_URL = "https://myautomind.com/";
const SITEMAP_URL = "https://myautomind.com/sitemap.xml";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GSC_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY is not configured");

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
    };

    const siteEnc = encodeURIComponent(SITE_URL);
    const sitemapEnc = encodeURIComponent(SITEMAP_URL);

    // Re-submit (idempotent: also acts as "ping for recrawl")
    const submit = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapEnc}`,
      { method: "PUT", headers },
    );

    if (!submit.ok && submit.status !== 204) {
      const text = await submit.text();
      throw new Error(`GSC submit failed (${submit.status}): ${text}`);
    }

    // Fetch status so we can return useful info to the caller / cron logs
    const statusResp = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapEnc}`,
      { headers },
    );
    const status = statusResp.ok ? await statusResp.json() : null;

    console.log("Sitemap submitted to GSC", { SITEMAP_URL, status });

    return new Response(
      JSON.stringify({ ok: true, submitted_at: new Date().toISOString(), sitemap: SITEMAP_URL, status }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("gsc-submit-sitemap error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
