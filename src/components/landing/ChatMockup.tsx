import { Check } from "lucide-react";

type Bubble = { from: "client" | "ai"; text: string };

const DEFAULT_BUBBLES: Bubble[] = [
  { from: "client", text: "Bok, imate li slobodno za šišanje sutra popodne?" },
  { from: "ai", text: "Bok! Sutra imamo termine u 15:30 i 17:00. Koji vam više odgovara?" },
  { from: "client", text: "17:00 može." },
  { from: "ai", text: "Super 🙌 Trebam vaše ime i broj za potvrdu." },
];

interface Props {
  bubbles?: Bubble[];
  confirmed?: boolean;
  className?: string;
}

const ChatMockup = ({ bubbles = DEFAULT_BUBBLES, confirmed = true, className = "" }: Props) => {
  return (
    <div className={`relative mx-auto w-full max-w-[320px] ${className}`}>
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border border-border bg-[#0f172a] p-2 shadow-elevated">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0f172a]" />
        <div className="overflow-hidden rounded-[2rem] bg-white">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-[hsl(var(--surface-muted))] px-4 pb-3 pt-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-sm font-semibold text-white">
              A
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">AutoMind</div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                online · odgovara odmah
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-2 px-3 py-4 min-h-[260px] bg-white">
            {bubbles.map((b, i) => (
              <div key={i} className={`flex ${b.from === "client" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                    b.from === "client"
                      ? "rounded-bl-sm bg-[hsl(var(--surface-muted))] text-foreground"
                      : "rounded-br-sm bg-[hsl(var(--accent))] text-white"
                  }`}
                >
                  {b.text}
                </div>
              </div>
            ))}

            {confirmed && (
              <div className="flex justify-center pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <Check className="h-3 w-3" /> Termin potvrđen
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="pointer-events-none absolute -left-6 top-16 hidden rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-soft sm:block animate-float-soft">
        Odgovor za 8s
      </div>
      <div
        className="pointer-events-none absolute -right-4 top-40 hidden rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-soft sm:block animate-float-soft"
        style={{ animationDelay: "1s" }}
      >
        WhatsApp · Web · Email
      </div>
      <div
        className="pointer-events-none absolute -left-2 bottom-10 hidden rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-soft sm:block animate-float-soft"
        style={{ animationDelay: "2s" }}
      >
        24/7 · Hrvatski
      </div>
    </div>
  );
};

export default ChatMockup;
