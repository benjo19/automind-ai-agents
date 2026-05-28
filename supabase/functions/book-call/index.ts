import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CAL_GATEWAY = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const GMAIL_GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function jsonRes(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function b64url(s: string) {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendConfirmationEmail(opts: {
  to: string;
  name: string;
  startISO: string;
  meetLink: string;
}) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const GMAIL_KEY = Deno.env.get("GOOGLE_MAIL_API_KEY");
  if (!LOVABLE_API_KEY || !GMAIL_KEY) return;

  const from = Deno.env.get("GMAIL_FROM_ADDRESS") || "auto.mind.ai2025@gmail.com";
  const when = new Date(opts.startISO).toLocaleString("hr-HR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Zagreb",
  });

  const subject = `Potvrda termina — Automind (${when})`;
  const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#0f172a;max-width:560px;margin:0 auto;padding:24px">
    <h2 style="margin:0 0 12px">Bok ${opts.name}, vidimo se uskoro 👋</h2>
    <p>Hvala što ste rezervirali besplatan razgovor s Automind timom.</p>
    <p><strong>Termin:</strong> ${when} (Europe/Zagreb)<br/>
    <strong>Google Meet:</strong> <a href="${opts.meetLink}">${opts.meetLink}</a></p>
    <p>Pripremit ćemo prijedlog AI recepcionara prilagođen vašem biznisu. Ako trebate pomaknuti termin, samo odgovorite na ovaj e-mail.</p>
    <p style="margin-top:24px">Vidimo se,<br/>Benjamin — Automind</p>
  </body></html>`;

  const mime = [
    `From: Automind <${from}>`,
    `To: ${opts.to}`,
    `Subject: =?UTF-8?B?${b64url(subject)}?=`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
  ].join("\r\n");

  try {
    await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GMAIL_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: b64url(mime) }),
    });
  } catch (e) {
    console.error("book-call: confirmation email failed", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonRes({ error: "Method not allowed" }, 405);

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const CAL_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
  if (!LOVABLE_API_KEY) return jsonRes({ error: "LOVABLE_API_KEY missing" }, 500);
  if (!CAL_KEY) return jsonRes({ error: "GOOGLE_CALENDAR_API_KEY missing" }, 500);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonRes({ error: "Invalid JSON" }, 400);
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const notes = String(body?.notes ?? "").trim();
  const startISO = String(body?.start ?? "").trim();

  if (!name || name.length < 2) return jsonRes({ error: "Ime je obavezno" }, 400);
  if (!isValidEmail(email)) return jsonRes({ error: "Neispravan e-mail" }, 400);
  if (!startISO) return jsonRes({ error: "Termin je obavezan" }, 400);

  const start = new Date(startISO);
  if (isNaN(start.getTime())) return jsonRes({ error: "Neispravan datum" }, 400);
  if (start.getTime() < Date.now() + 30 * 60_000)
    return jsonRes({ error: "Odaberite termin barem 30 min unaprijed" }, 400);

  const end = new Date(start.getTime() + 30 * 60_000);

  const event = {
    summary: `Automind razgovor — ${name}${company ? ` (${company})` : ""}`,
    description:
      `Rezervacija s Automind landinga.\n\n` +
      `Ime: ${name}\nE-mail: ${email}${phone ? `\nTelefon: ${phone}` : ""}` +
      `${company ? `\nTvrtka: ${company}` : ""}` +
      `${notes ? `\n\nNapomena:\n${notes}` : ""}`,
    start: { dateTime: start.toISOString(), timeZone: "Europe/Zagreb" },
    end: { dateTime: end.toISOString(), timeZone: "Europe/Zagreb" },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: { useDefault: true },
  };

  const url = `${CAL_GATEWAY}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": CAL_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    console.error("book-call: calendar error", resp.status, data);
    return jsonRes(
      { error: "Greška kod rezervacije. Pokušajte ponovno.", details: data },
      502,
    );
  }

  const meetLink =
    data?.hangoutLink ||
    data?.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === "video")?.uri ||
    "";

  // fire-and-forget confirmation
  sendConfirmationEmail({ to: email, name, startISO: start.toISOString(), meetLink }).catch(
    (e) => console.error(e),
  );

  return jsonRes({
    success: true,
    eventId: data?.id,
    meetLink,
    htmlLink: data?.htmlLink,
    start: start.toISOString(),
    end: end.toISOString(),
  });
});
