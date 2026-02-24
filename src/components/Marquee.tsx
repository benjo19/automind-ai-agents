const tools = [
  "OpenAI", "Stripe", "Make.com", "Supabase", "Slack", "WhatsApp", "Telegram", "Google Docs",
  "OpenAI", "Stripe", "Make.com", "Supabase", "Slack", "WhatsApp", "Telegram", "Google Docs",
];

const Marquee = () => {
  return (
    <section className="py-10 overflow-hidden border-y border-border/50">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="mx-8 text-sm font-medium tracking-wide text-muted-foreground/50 uppercase select-none"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
