const baseTools = [
  { name: "OpenAI", slug: "openai" },
  { name: "Stripe", slug: "stripe" },
  { name: "Make.com", slug: "make" },
  { name: "Supabase", slug: "supabase" },
  { name: "Slack", slug: "slack" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Telegram", slug: "telegram" },
  { name: "Google Docs", slug: "googledocs" },
];

const tools = [...baseTools, ...baseTools];

const Marquee = () => {
  return (
    <section className="py-10 overflow-hidden border-y border-border/50">
      <div className="container px-4">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/40 mb-6">
          Integriramo se s alatima koje već koristite
        </p>
      </div>
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 mx-8 select-none"
            >
              <img
                src={`https://cdn.simpleicons.org/${tool.slug}/6b7280`}
                className="h-5 w-5 opacity-60"
                alt={tool.name}
                loading="lazy"
              />
              <span className="text-sm font-medium text-muted-foreground/60">
                {tool.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
