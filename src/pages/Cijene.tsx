import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell, { PageHero, CtaBlock } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    tagline: "Za manje timove i lokale",
    price: "690 €",
    minutes: "1.500 min",
    description: "AI agent za manji volumen poziva i jednostavniji proces obrade upita i narudžbi.",
    features: [
      "1.500 AI minuta mjesečno",
      "AI voice agent na hrvatskom jeziku",
      "Automatski odgovori 24/7",
      "Prikupljanje podataka i upita",
      "Osnovne integracije",
      "E-mail podrška",
    ],
  },
  {
    name: "Growth",
    tagline: "Najpopularniji izbor",
    price: "1.590 €",
    minutes: "4.000 min",
    description: "Za tvrtke i lokale s većim brojem poziva, više automatizacije i povezivanjem s postojećim alatima.",
    features: [
      "4.000 AI minuta mjesečno",
      "Sve iz Starter paketa",
      "Napredniji scenariji razgovora",
      "Integracije s CRM-om i drugim alatima",
      "Automatska obrada upita i narudžbi",
      "Prioritetna podrška",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    tagline: "Za veliki volumen poziva",
    price: "2.990 €",
    minutes: "9.000 min",
    description: "Za veći promet, više lokacija i zahtjevnije procese gdje AI agent preuzima velik dio dolaznih poziva.",
    features: [
      "9.000 AI minuta mjesečno",
      "Sve iz Growth paketa",
      "Više lokacija ili timova",
      "Napredne integracije po želji",
      "Vlastiti scenariji razgovora",
      "Mjesečna optimizacija",
      "SLA podrška",
    ],
  },
];

const Cijene = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Automind",
    url: "https://myautomind.com",
    description: "Mjesečni paketi AI agenata s uključenim minutama razgovora.",
    priceRange: "€€€",
  };
  return (
    <PageShell
      path="/cijene"
      title="Cijene — Automind | AI agent paketi i minute"
      description="Starter, Growth i Pro paketi AI agenata s jasno uključenim minutama razgovora i mjesečnom cijenom."
      schema={schema}
    >
      <PageHero
        eyebrow="Cijene"
        title="Jasni paketi prema mjesečnoj potrošnji AI minuta."
        subtitle="Odaberite paket prema volumenu poziva. Sve cijene su bez PDV-a, a dodatne minute iznad paketa naplaćuju se 0,26 € + PDV po minuti."
      />

      <section className="container px-4 max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-8 rounded-3xl border ${
                p.highlighted
                  ? "border-accent bg-accent/[0.03] shadow-[0_8px_30px_rgba(59,91,219,0.12)]"
                  : "border-foreground/10 bg-white/60"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-primary-foreground text-xs font-semibold">
                  Najpopularniji
                </div>
              )}
              <h3 className="text-2xl font-bold tracking-tight mb-1">{p.name}</h3>
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-4">{p.tagline}</p>

              <div className="mb-5">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  <span className="text-sm text-muted-foreground mb-1">+ PDV / mj</span>
                </div>
                <div className="mt-2 inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-sm font-semibold text-accent">
                  Uključeno {p.minutes}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.highlighted ? "hero" : "outline"} size="lg" className="w-full">
                <Link to="/#demo">Zatraži ponudu</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Sve cijene su bez PDV-a. Dodatne minute iznad uključenog paketa naplaćuju se <strong>0,26 € + PDV po minuti</strong>.
        </p>
      </section>

      <CtaBlock title="Niste sigurni koji paket?" subtitle="Pošaljite upit i preporučit ćemo paket prema očekivanom broju poziva i mjesečnoj potrošnji minuta." />
    </PageShell>
  );
};

export default Cijene;
