import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Bot, Check, ChefHat, MapPin, PhoneCall, ShieldCheck, Store, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Start", price: "590 €", minutes: "1.500 min", overage: "0,30 €/min", note: "Za manji restoran i niži volumen poziva." },
  { name: "Growth", price: "990 €", minutes: "4.000 min", overage: "0,27 €/min", note: "Za restorane s redovitim telefonskim narudžbama.", featured: true },
  { name: "Pro", price: "1.750 €", minutes: "9.000 min", overage: "0,25 €/min", note: "Za velike restorane i visok volumen poziva." },
];

const features = [
  [PhoneCall, "AI telefonski agent", "Prima više poziva, razgovara prirodno i vodi gosta kroz narudžbu."],
  [Store, "Meni i cijene iz sustava", "Agent koristi aktualne artikle, cijene i dostupnost — bez ručnog prepisivanja."],
  [MapPin, "Geofencing dostave", "Automatski provjerava je li adresa unutar dostavne zone konkretnog restorana."],
  [ChefHat, "Narudžba ide u kuhinju", "Potvrđena narudžba odmah se prikazuje kuhinji sa stavkama i napomenama."],
  [Truck, "Dostava i preuzimanje", "Podržava osobno preuzimanje i workflow za dostavljače i status isporuke."],
  [ShieldCheck, "Kontrola i skaliranje", "Svaki restoran ima svoj agent, konfiguraciju i podatke, dok platforma ostaje centralizirana."],
] as const;

const OrderFlow = () => {
  const goToDemo = () => {
    window.location.href = "/#demo";
  };

  return (
    <>
      <Helmet>
        <title>OrderFlow — AI telefonski agent za restorane | AutomindAI</title>
        <meta name="description" content="OrderFlow je AI telefonski agent za restorane koji prima narudžbe, provjerava zonu dostave i šalje narudžbe direktno u kuhinju i dostavu." />
        <link rel="canonical" href="https://myautomind.com/proizvodi/orderflow" />
        <meta property="og:url" content="https://myautomind.com/proizvodi/orderflow" />
        <meta property="og:title" content="OrderFlow — AI telefonski agent za restorane" />
        <meta property="og:description" content="Poziv, narudžba, geofencing, kuhinja i dostava u jednom sustavu." />
      </Helmet>
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="px-4 py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm font-semibold text-accent mb-5">
                <Bot className="w-4 h-4" /> Automind proizvod za restorane
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                OrderFlow prima telefonske narudžbe dok vaš tim radi svoj posao.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
                AI agent odgovara na poziv, koristi stvarni meni i cijene, provjerava adresu i zonu dostave te šalje potvrđenu narudžbu direktno u kuhinju i workflow dostave.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" onClick={goToDemo}>Zatraži demo</Button>
                <Button variant="outline" size="lg" asChild><Link to="/">Povratak na AutomindAI</Link></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20 border-y border-foreground/10 bg-foreground/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">Kako radi</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Od poziva do kuhinje, bez ručnog prepisivanja.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(([Icon, title, desc]) => (
                <article key={title} className="rounded-2xl border border-foreground/10 bg-background p-5 md:p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-accent" /></div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">Paketi</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Cijena prati stvarni volumen poziva.</h2>
              <p className="text-muted-foreground">Sve cijene su bez PDV-a. Jednokratni setup ovisi o integraciji, meniju, telefonskom broju i postojećem sustavu restorana.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <article key={plan.name} className={`rounded-3xl border p-6 md:p-7 ${plan.featured ? "border-accent/40 bg-accent/[0.07] shadow-[0_0_40px_rgba(124,58,237,0.08)]" : "border-foreground/10 bg-foreground/[0.02]"}`}>
                  {plan.featured && <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">Najpopularniji</span>}
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-4 mb-1"><span className="text-4xl font-bold text-foreground">{plan.price}</span><span className="text-muted-foreground"> / mj</span></div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.note}</p>
                  <div className="space-y-3 text-sm mb-7">
                    <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /><span>{plan.minutes} uključeno</span></div>
                    <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /><span>{plan.overage} iznad paketa</span></div>
                    <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /><span>OrderFlow platforma i podrška</span></div>
                  </div>
                  <Button variant={plan.featured ? "hero" : "outline"} className="w-full" onClick={goToDemo}>Zatraži ponudu</Button>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-foreground/10 p-5 md:p-6 text-sm text-muted-foreground">
              <strong className="text-foreground">Setup:</strong> okvirno od 1.500 € + PDV, ovisno o složenosti. Za lance i više lokacija radi se prilagođena Enterprise ponuda.
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20 bg-foreground/[0.025] border-t border-foreground/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Želite vidjeti kako bi OrderFlow radio za vaš restoran?</h2>
            <p className="text-muted-foreground mb-7 max-w-2xl mx-auto">Prođemo kroz vaš meni, broj poziva, zonu dostave i način rada kuhinje pa složimo konkretan demo.</p>
            <Button variant="hero" size="lg" onClick={goToDemo}>Dogovori demo</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrderFlow;
