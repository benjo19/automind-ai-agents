// Edge function: chat-lead
// Streams AI chat responses via Lovable AI Gateway with a tool to capture qualified leads.
// When the AI calls `submit_lead`, we forward the lead + transcript to the Make.com webhook.

const MAKE_WEBHOOK_URL =
  "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ti si Ana, prijateljski AI asistent tvrtke Automind. Automind izrađuje AI agente (chat + voice), CRM, auto-PDF ponude i email sekvence za poduzeća u Hrvatskoj.

TVOJ CILJ: U razgovoru kvalificirati posjetitelja i prikupiti njegove kontakt podatke kako bi tim Autominda mogao poslati personaliziranu ponudu.

PRAVILA RAZGOVORA:
- Govori isključivo na hrvatskom jeziku, prijateljski i profesionalno (ti-forma).
- Kratke poruke (1-3 rečenice). Postavljaj jedno pitanje u jednoj poruci.
- Prvo upoznaj potrebu (industrija, problem, što ih zanima — chat agent, voice agent, automatizacija ponuda...).
- Tek nakon 2-3 izmjene, kad imaš kontekst, zatraži kontakt podatke (ime, email, telefon).
- Ne izmišljaj cijene. Ako pitaju za cijenu, reci da tim šalje personaliziranu ponudu nakon kratkog razgovora.
- Ako korisnik nije zainteresiran, budi pristojan i ponudi pomoć kasnije.

KAD POZVATI ALAT submit_lead:
- ČIM imaš ime, email i (opcionalno) telefon te osnovni kontekst (industrija ili interes).
- Telefon je opcionalan — ne inzistiraj ako ga ne želi dati.
- Email je obavezan za slanje ponude.
- Nakon poziva alata, zahvali korisniku i potvrdi da će se tim javiti uskoro (obično u 24h).
- Ne pozivaj alat dvaput za isti lead u istom razgovoru.`;

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

async function forwardLeadToMake(
  lead: Record<string, unknown>,
  transcript: Array<{ role: string; content: string }>,
) {
  const payload = {
    source: "ai-chat-widget",
    submitted_at: new Date().toISOString(),
    ...lead,
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
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages must be an array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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
            { role: "system", content: SYSTEM_PROMPT },
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
              await forwardLeadToMake(args, messages);
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
