import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type Msg = { from: "client" | "ai"; text: string };

const SCRIPT: Msg[] = [
  { from: "client", text: "Pozdrav, treba mi termin za pranje i feniranje." },
  { from: "ai", text: "Bok 😊 Naravno! Za koji dan vam odgovara — danas, sutra ili kasnije?" },
  { from: "client", text: "Sutra ako može, popodne." },
  { from: "ai", text: "Imamo slobodno u 16:00 ili 17:30. Što vam više odgovara?" },
  { from: "client", text: "16:00." },
  { from: "ai", text: "Super! Trebam vaše ime i broj mobitela za potvrdu rezervacije." },
  { from: "client", text: "Ana, 091 123 4567." },
  { from: "ai", text: "Rezervirano ✅ Vidimo se sutra u 16:00. Šaljem vam podsjetnik ujutro." },
];

const DemoConversation = () => {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= SCRIPT.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : 900);
    return () => clearTimeout(t);
  }, [started, shown]);

  const done = shown >= SCRIPT.length;

  return (
    <section id="demo-chat" className="section surface-muted">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Primjer razgovora</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Klijent pita. AI dogovara. Vi dobijete rezervaciju.
          </h2>
        </div>

        <div ref={ref} className="mx-auto mt-10 max-w-xl card-elevated overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-sm font-semibold text-white">A</div>
            <div>
              <div className="text-sm font-semibold text-foreground">AutoMind · Salon Bella</div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> uživo
              </div>
            </div>
          </div>
          <div className="space-y-2 bg-white px-4 py-5 min-h-[360px]">
            {SCRIPT.slice(0, shown).map((m, i) => (
              <div key={i} className={`flex animate-fade-in ${m.from === "client" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.from === "client"
                      ? "rounded-bl-sm bg-[hsl(var(--surface-muted))] text-foreground"
                      : "rounded-br-sm bg-[hsl(var(--accent))] text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {done && (
              <div className="flex justify-center pt-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <Check className="h-3 w-3" /> Rezervacija poslana na mail
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoConversation;
