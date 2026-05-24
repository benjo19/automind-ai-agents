// Edge function: chat-lead
// Streams AI chat responses via Lovable AI Gateway with a tool to capture qualified leads.
// When the AI calls `submit_lead`, we forward the lead + transcript to the Make.com webhook.

const MAKE_WEBHOOK_URL =
  "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ti si Ana, prijateljski AI asistent tvrtke Automind. Automind izrađuje AI agente (chat + voice), CRM, auto-PDF ponude i email sekvence za poduzeća u Hrvatskoj.

TVOJ CILJ: Kroz razgovor pomoći posjetitelju da sam prepozna koliko ga košta trenutni problem, a tek kad to prizna — zatraži kontakt podatke za personaliziranu ponudu.

STRATEGIJA RAZGOVORA (vrijednost-prvo):
1. UPOZNAJ PROBLEM — Pitaj o industriji i konkretnom problemu (propušteni pozivi, spori odgovori, ručni posao...). Jedno pitanje u poruci.
2. KVANTIFICIRAJ GUBITAK — Kad prepoznaš problem, daj konkretnu procjenu izgubljene vrijednosti u eurima. Primjeri:
   - Frizerski salon: "Ako promakaš 5 poziva tjedno, a svaki termin vrijedi 30-50€, to je 150-250€ tjedno izgubljeno samo na propuštenim pozivima."
   - Autoservis: "Jedan propušten poziv za servis = 80-200€. Koliko ih tjedno prođe bez odgovora?"
   - Turistički smještaj: "Upit koji ostane bez odgovora 2+ sata ima 60% šansu da ode konkurenciji. Koliko upita imaš tjedno?"
   - Opće: "Svaki sat kad nisi dostupan = potencijalni prihod koji odlazi drugima."
3. TRAŽI KONTAKT — Tek kad posjetitelj prizna problem ili pokaže interes, ponudi: "Mogu zamoliti tim da ti pripremi konkretan prijedlog kako bismo to riješili — treba mi samo tvoje ime i email."

PRAVILA:
- Kratke poruke (1-3 rečenice). Jedno pitanje po poruci.
- Ti-forma, prijateljski i profesionalno.
- Ne izmišljaj cijene usluge. Ako pitaju za cijenu, reci da ovisi o potrebama i tim šalje personaliziranu ponudu.
- Valuta je uvijek euro (€), Hrvatska koristi euro od 2023.
- Ako korisnik nije zainteresiran, budi pristojan i ponudi pomoć kasnije.
- Ako dobiješ relevantan kontekst iz ranijih poruka, tretiraj ga kao dio aktualnog razgovora.
- Ako klijent pita sjećaš li se nečega, odgovori iz dostupnog konteksta; ne tvrdi da nemaš pristup prijašnjim razgovorima.

KAD POZVATI ALAT submit_lead:
- Tek kad posjetitelj prizna problem ILI pokaže jasan interes I da ti ime + email.
- Telefon je opcionalan — ne inzistiraj ako ga ne želi dati.
- Email je obavezan za slanje ponude.
- Nakon poziva alata, zahvali korisniku i potvrdi da će se tim javiti uskoro (obično u 24h).
- Ne pozivaj alat dvaput za isti lead u istom razgovoru.`;

function sanitizeClientKey(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{16,80}$/.test(value)
    ? value
    : crypto.randomUUID();
}

function sanitizeMessages(value: unknown) {
  if (!Array.isArray(value)) return null;
  return value
    .filter((m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

function createEmbedding(input: string) {
  const synonyms: Record<string, string[]> = {
    rezervacije: ["termin", "termini", "narucivanje", "booking", "appointment"],
    chat: ["chatbot", "poruke", "whatsapp", "webchat", "messenger"],
    voice: ["poziv", "pozivi", "telefon", "glas", "call"],
    ponude: ["pdf", "predracun", "automatizacija", "email"],
    crm: ["klijenti", "lead", "prodaja", "pipeline"],
    salon: ["frizer", "frizerski", "beauty", "kozmeticki"],
    servis: ["auto", "autoservis", "radiona", "popravak"],
  };

  const expanded = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const tokens = expanded.match(/[a-z0-9]{3,}/g) ?? [];
  const vector = new Array(768).fill(0);

  const addToken = (token: string, weight = 1) => {
    let hash = 2166136261;
    for (let i = 0; i < token.length; i++) {
      hash ^= token.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    vector[Math.abs(hash) % vector.length] += weight;
  };

  for (const token of tokens) {
    addToken(token, 1);
    for (const [concept, words] of Object.entries(synonyms)) {
      if (token === concept || words.includes(token)) addToken(concept, 1.5);
    }
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  return magnitude ? vector.map((value) => Number((value / magnitude).toFixed(6))) : null;
}

function formatVector(embedding: number[] | null) {
  return embedding ? `[${embedding.join(",")}]` : null;
}

async function saveConversation(
  clientKey: string,
  role: "user" | "assistant",
  content: string,
  embedding: number[] | null,
  metadata: Record<string, unknown> = {},
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !content.trim()) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      client_key: clientKey,
      role,
      content: content.slice(0, 4000),
      embedding: formatVector(embedding),
      metadata,
    }),
  }).catch((e) => console.error("Conversation save failed:", e));

  if (res && !res.ok) {
    console.error("Conversation save failed:", res.status, await res.text());
  }
}

async function getRelevantContext(clientKey: string, queryEmbedding: number[] | null) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !queryEmbedding) return "";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_conversations`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query_embedding: formatVector(queryEmbedding),
        match_client_key: clientKey,
        match_count: 5,
      }),
    });

    if (!res.ok) {
      console.error("Conversation search failed:", res.status, await res.text());
      return "";
    }

    const matches = await res.json();
    if (!Array.isArray(matches) || matches.length === 0) return "";

    return matches
      .filter((m) => Number(m.similarity) > 0.62)
      .map((m) => `${m.role === "user" ? "Klijent" : "Ana"}: ${m.content}`)
      .join("\n");
  } catch (e) {
    console.error("Conversation context failed:", e);
    return "";
  }
}

async function getRecentContext(clientKey: string) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return "";

  try {
    const url = new URL(`${SUPABASE_URL}/rest/v1/conversations`);
    url.searchParams.set("select", "role,content,created_at");
    url.searchParams.set("client_key", `eq.${clientKey}`);
    url.searchParams.set("order", "created_at.desc");
    url.searchParams.set("limit", "6");

    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (!res.ok) return "";
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return "";

    return rows
      .reverse()
      .map((m) => `${m.role === "user" ? "Klijent" : "Ana"}: ${m.content}`)
      .join("\n");
  } catch (e) {
    console.error("Recent conversation context failed:", e);
    return "";
  }
}

const tools = [
  {
    type: "function",
    function: {
      name: "submit_lead",
      description:
        "Pošalji kvalificirani lead Automind timu. Pozovi ČIM dobiješ ime + email + osnovni kontekst razgovora.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Ime i prezime korisnika" },
          email: { type: "string", description: "Email adresa korisnika" },
          phone: {
            type: "string",
            description: "Telefonski broj (opcionalno, prazan string ako nije dan)",
          },
          industry: {
            type: "string",
            description: "Industrija / branša korisnika (npr. frizerski salon, autoservis...)",
          },
          interest: {
            type: "string",
            description:
              "Što ga zanima (chat agent, voice agent, automatizacija ponuda, CRM, rezervacije termina...)",
          },
          notes: {
            type: "string",
            description: "Kratak sažetak razgovora i specifičnih potreba korisnika",
          },
        },
        required: ["name", "email", "interest", "notes"],
        additionalProperties: false,
      },
    },
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

async function forwardLeadToMake(
  lead: Record<string, unknown>,
  transcript: Array<{ role: string; content: string }>,
  clientKey: string,
) {
  // Validate lead has real data before sending
  const email = String(lead.email || "").trim();
  const name = String(lead.name || "").trim();
  const interest = String(lead.interest || "").trim();

  if (!email || !isValidEmail(email)) {
    console.warn("Lead skipped: invalid or missing email", email);
    return;
  }
  if (!name || name.length < 2) {
    console.warn("Lead skipped: missing name");
    return;
  }
  if (!interest) {
    console.warn("Lead skipped: missing interest");
    return;
  }

  const payload = {
    type: "chat_lead",
    source: "ai-chat-widget",
    submitted_at: new Date().toISOString(),
    client_key: clientKey,
    name,
    email,
    phone: String(lead.phone || ""),
    industry: String(lead.industry || ""),
    interest,
    notes: String(lead.notes || ""),
    transcript: transcript
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n"),
  };

  const res = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Make webhook failed:", res.status, txt);
    throw new Error(`Webhook responded ${res.status}`);
  }

  // Telegram notification
  const TELEGRAM_BOT_TOKEN = "8625322301:AAGq-NQBzmKVzZLoZ41hEjd9l0F-MahuWfI";
  const TELEGRAM_CHAT_ID = "1043582386";
  const tgMsg = [
    `🔔 *Novi lead s myautomind.com*`,
    `👤 Ime: ${name}`,
    `📧 Email: ${email}`,
    payload.phone ? `📱 Telefon: ${payload.phone}` : null,
    payload.industry ? `🏭 Industrija: ${payload.industry}` : null,
    `💬 Interes: ${interest}`,
    payload.notes ? `📝 Napomene: ${payload.notes}` : null,
  ].filter(Boolean).join("\n");

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: tgMsg,
      parse_mode: "Markdown",
    }),
  }).catch((err) => console.error("Telegram notification failed:", err));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const messages = sanitizeMessages(body.messages);
    const clientKey = sanitizeClientKey(body.clientKey);

    if (!messages) {
      return new Response(
        JSON.stringify({ error: "messages must be an array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const queryEmbedding = createEmbedding(lastUserMessage);
    const [semanticContext, recentContext] = await Promise.all([
      getRelevantContext(clientKey, queryEmbedding),
      getRecentContext(clientKey),
    ]);
    const memoryContext = [semanticContext, recentContext]
      .filter(Boolean)
      .join("\n\nZADNJE PORUKE ISTOG KLIJENTA:\n");
    await saveConversation(clientKey, "user", lastUserMessage, queryEmbedding, {
      source: "chat-widget",
    });

    const systemPrompt = memoryContext
      ? `${SYSTEM_PROMPT}\n\nRELEVANTAN KONTEKST IZ RANIJIH RAZGOVORA OVOG KLIJENTA:\n${memoryContext}\n\nKoristi ovaj kontekst prirodno ako je relevantan. Ako korisnik pita sjećaš li se, odgovori konkretno iz konteksta. Ne govori da nemaš pristup prijašnjim razgovorima i ne spominji tehničke detalje memorije.`
      : SYSTEM_PROMPT;

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          tools,
          stream: true,
        }),
      },
    );

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Previše zahtjeva, pokušajte ponovno za par sekundi." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI kvota je iscrpljena. Molimo kontaktirajte administratora." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // We need to inspect the stream to detect tool calls (submit_lead) and forward to Make.
    // Simultaneously, we re-emit SSE events to the client so the UI streams tokens in real time.
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = aiResp.body!.getReader();
        let buffer = "";
        let toolName: string | null = null;
        let toolArgsStr = "";
        let leadSubmitted = false;
        let assistantContent = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            // Pass-through to client immediately
            controller.enqueue(encoder.encode(chunk));

            // Parse buffered SSE lines to extract tool call deltas
            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta;
                const content = delta?.content;
                if (typeof content === "string") assistantContent += content;
                const toolCall = delta?.tool_calls?.[0];
                if (toolCall) {
                  if (toolCall.function?.name) {
                    toolName = toolCall.function.name;
                  }
                  if (toolCall.function?.arguments) {
                    toolArgsStr += toolCall.function.arguments;
                  }
                }
              } catch (_e) {
                // ignore partial JSON
              }
            }
          }

          // If a tool call was emitted, parse args & forward to Make
          if (toolName === "submit_lead" && toolArgsStr && !leadSubmitted) {
            try {
              const args = JSON.parse(toolArgsStr);
              await forwardLeadToMake(args, messages, clientKey);
              leadSubmitted = true;
              // Notify client with a custom SSE event
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ event: "lead_submitted", lead: args })}\n\n`,
                ),
              );
            } catch (e) {
              console.error("Failed to parse/forward lead:", e, toolArgsStr);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ event: "lead_error", message: "Webhook failed" })}\n\n`,
                ),
              );
            }
          }

          if (assistantContent.trim()) {
            const assistantEmbedding = createEmbedding(assistantContent);
            await saveConversation(clientKey, "assistant", assistantContent, assistantEmbedding, {
              source: "chat-widget",
              lead_submitted: leadSubmitted,
            });
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-lead error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
