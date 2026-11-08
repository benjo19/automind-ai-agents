import { ExternalLink, ShoppingBag, Layers, ClipboardList } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

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
  <div className="orderly-preview rounded-lg border border-border bg-card shadow-elegant overflow-hidden">
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
    <section id="orderly" className="py-12 md:py-16 px-4 relative border-y border-border bg-secondary/50 scroll-mt-20">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <ScrollReveal>
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-semibold text-primary mb-2">Naša aplikacija za digitalnu nabavu</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Orderly <span className="text-muted-foreground">— za ugostiteljstvo</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Zahtjevi osoblja, naručivanje robe, automatsko razdvajanje artikala po dobavljačima i praćenje narudžbi —
              sve na jednom mjestu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex items-start gap-3 py-2"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-card border border-border flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Button variant="hero" asChild className="h-12 px-5">
                <a
                  href="https://bar-runner.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Otkrij Orderly <ExternalLink className="h-4 w-4" />
                </a>
                </Button>
                <Button variant="hero-outline" asChild className="h-12 px-5">
                <a
                  href="https://automindorderly.com/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prijavi se ili registriraj <ExternalLink className="h-4 w-4" />
                </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="min-w-0">
            <OrderMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default OrderlySection;
