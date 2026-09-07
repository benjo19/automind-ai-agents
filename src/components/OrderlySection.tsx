import { ExternalLink, Check, ShoppingBag, Layers, ClipboardList } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  {
    icon: ShoppingBag,
    title: "Bez WhatsApp kaosa",
    text: "Zahtjevi osoblja više se ne gube u porukama — sve stiže kroz jedan obrazac.",
  },
  {
    icon: ClipboardList,
    title: "Sve narudžbe na jednom mjestu",
    text: "Jedinstveni pregled svih otvorenih i poslanih narudžbi, u realnom vremenu.",
  },
  {
    icon: Layers,
    title: "Artikli automatski razdvojeni po dobavljačima",
    text: "Sustav grupira stavke prema dobavljaču i priprema gotov popis za slanje.",
  },
];

// Dashboard mockup izgrađen isključivo od postojećih UI elemenata — bez novih ovisnosti.
const OrderMockup = () => (
  <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
    {/* Window chrome */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/60">
      <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
      <span className="w-2.5 h-2.5 rounded-full bg-accent/30" />
      <span className="w-2.5 h-2.5 rounded-full bg-accent/20" />
      <span className="ml-3 text-xs font-semibold text-muted-foreground tracking-wide">Orderly · Nadzorna ploća</span>
    </div>

    <div className="p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-accent font-semibold">Današnja nabava</div>
          <div className="text-sm font-semibold text-foreground">3 dobavljača · 12 artikala</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-foreground/70 bg-secondary px-3 py-1.5 rounded-full border border-border">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
          Spremljeno
        </div>
      </div>

      <div className="space-y-3">
        {/* Supplier group 1 */}
        <div className="rounded-xl border border-border bg-background/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground">Pivovara — dostava jutro</span>
            <span className="text-[10px] font-semibold text-accent">3 stavke</span>
          </div>
          <div className="space-y-1.5">
            {["Pivo 0,5l × 48", "Voda gazirana × 24", "Sok limun × 12"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-accent/60" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Supplier group 2 */}
        <div className="rounded-xl border border-border bg-background/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground">Mesnica — dostava utorak</span>
            <span className="text-[10px] font-semibold text-accent">5 stavki</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {["Junetina × 4kg", "Piletina × 6kg", "Slanina × 2kg", "Kobasica × 1.5kg", "Mljeveno × 3kg"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-accent/60" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Supplier group 3 */}
        <div className="rounded-xl border border-border bg-background/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground">Voćarna — dostava četvrtak</span>
            <span className="text-[10px] font-semibold text-accent">4 stavke</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {["Limun × 2kg", "Rajčica × 5kg", "Salata × 1kg", "Luk × 3kg"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-accent/60" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OrderlySection = () => {
  return (
    <section id="orderly" className="py-14 md:py-20 px-4 relative glow-bg scroll-mt-20">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              AutomindAI proizvod
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Orderly — <span className="gradient-text-rainbow">digitalna nabava za ugostiteljstvo</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Zahtjevi osoblja, naručivanje robe, automatsko razdvajanje artikala po dobavljačima i praćenje narudžbi —
              sve na jednom mjestu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal className="order-2 lg:order-1">
            <div className="space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="glass-card hover-lift p-5 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2">
                <a
                  href="https://bar-runner.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 rounded-lg px-8 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all"
                >
                  Otkrij Orderly <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="order-1 lg:order-2">
            <OrderMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default OrderlySection;
