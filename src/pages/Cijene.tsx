import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell, { PageHero, CtaBlock } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    tagline: "Za male obrte i pojedince",
    description: "Osnovni AI recepcionar na jednom kanalu — web ili WhatsApp.",
    features: [
      "Web chat ili WhatsApp",
      "Zakazivanje u kalendaru",
      "Automatski odgovori 24/7",
      "Hrvatski jezik",
      "E-mail podrška",
    ],
  },
  {
    name: "Growth",
    tagline: "Najpopularniji izbor",
    description: "AI recepcionar na više kanala s integracijom u vaše alate i CRM.",
    features: [
      "Sve iz Starter paketa",
      "Voice agent (pozivi)",
      "Instagram i Messenger",
      "Slanje ponuda na e-mail",
      "Integracija s CRM-om",
      "Prioritetna podrška",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    tagline: "Za zahtjevnije tvrtke",
    description: "Potpuno prilagođeno rješenje s naprednim integracijama i SLA podrškom.",
    features: [
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
    description: "Jednostavan mjesečni paket prilagođen veličini vaše tvrtke.",
    priceRange: "$$",
  };
  return (
    <PageShell
      path="/cijene"
      title="Cijene — Automind | Jednostavan mjesečni paket"
      description="Tri jasna paketa — Starter, Growth, Pro. Personaliziranu ponudu pripremamo nakon kratkog razgovora o vašim potrebama."
      schema={schema}
    >
      <PageHero
        eyebrow="Cijene"
        title="Jednostavan mjesečni paket prilagođen vašoj tvrtki."
        subtitle="Tri jasne razine. Konkretnu ponudu dobivate nakon kratkog razgovora — bez dugoročnih obveza i skrivenih troškova."
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
          Konačna cijena ovisi o broju kanala, integracijama i opsegu. Bez skrivenih troškova.
        </p>
      </section>

      <CtaBlock title="Niste sigurni koji paket?" subtitle="Pošaljite upit i predložit ćemo paket prilagođen veličini i potrebama vaše tvrtke." />
    </PageShell>
  );
};

export default Cijene;
