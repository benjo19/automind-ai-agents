import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const INCLUDES = [
  "Po broju kanala (web, WhatsApp, mail…)",
  "Po broju razgovora mjesečno",
  "Bez vezivanja na duge ugovore",
  "Postavljanje i obuka — uključeno",
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const PricingTeaser = () => (
  <section id="pricing" className="section scroll-mt-20">
    <div className="container-page">
      <div className="mx-auto max-w-3xl card-elevated p-8 md:p-12 text-center">
        <span className="eyebrow">Cijena</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Jednostavan mjesečni paket
        </h2>
        <p className="mt-4 text-muted-foreground">
          Cijena se određuje prema broju kanala i razgovora koje AI vodi za vas. Bez skrivenih troškova.
        </p>

        <ul className="mx-auto mt-6 grid max-w-xl gap-2 text-left sm:grid-cols-2">
          {INCLUDES.map((i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
              {i}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button variant="hero" size="lg" onClick={() => scrollTo("demo")} className="group">
            Zatraži ponudu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingTeaser;
