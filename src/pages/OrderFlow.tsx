import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Bot, Building2, CalendarCheck, Check, MessageSquare, PhoneCall, ShieldCheck, Workflow } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", price: "690 €", minutes: "1.500 min", overage: "0,26 €/min", note: "Za manje tvrtke i niži volumen poziva." },
  { name: "Growth", price: "1.590 €", minutes: "4.000 min", overage: "0,26 €/min", note: "Za tvrtke s redovitim telefonskim upitima i većim volumenom poziva.", featured: true },
  { name: "Pro", price: "2.990 €", minutes: "9.000 min", overage: "0,26 €/min", note: "Za veće tvrtke, više lokacija i visok volumen poziva." },
];

const features = [
  [PhoneCall, "AI telefonski agent", "Javlja se na dolazne pozive, razgovara prirodno i vodi poziv prema pravilima vaše tvrtke."],
  [MessageSquare, "Odgovori i kvalifikacija upita", "Odgovara na česta pitanja, prikuplja ključne podatke i prepoznaje što klijentu treba."],
  [CalendarCheck, "Termini, rezervacije i narudžbe", "Može zakazivati termine i rezervacije, primati narudžbe ili pokrenuti drugi poslovni proces."],
  [Workflow, "CRM i poslovne integracije", "Podatke iz poziva šalje u CRM, kalendar, e-mail, Make ili drugi sustav koji već koristite."],
  [Building2, "Prilagođen vašoj djelatnosti", "Isti proizvod može se konfigurirati za restorane, salone, ordinacije, servise, hotele, prodaju i druge djelatnosti."],
  [ShieldCheck, "Kontrola i skaliranje", "Svaka tvrtka ima vlastita pravila, znanje i integracije, uz centralizirano održavanje i podršku."],
] as const;

const OrderFlow = () => {
  const goToDemo = () => {
    window.location.href = "/#demo";
  };

  return (
    <>
      <Helmet>
        <title>AI Voice Agent — AI telefonski agent za tvrtke | AutomindAI</title>
        <meta name="description" content="Automind AI Voice Agent prima telefonske pozive, odgovara na upite, zakazuje termine, prima narudžbe i povezuje se s poslovnim sustavima za različite djelatnosti." />
        <link rel="canonical" href="https://myautomind.com/proizvodi/orderflow" />
        <meta property="og:url" content="https://myautomind.com/proizvodi/orderflow" />
        <meta property="og:title" content="AI Voice Agent — AI telefonski agent za sve djelatnosti" />
        <meta property="og:description" content="AI agent koji prima pozive, obrađuje upite i pokreće poslovne procese 24/7." />
      </Helmet>
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="px-4 py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm font-semibold text-accent mb-5">
                <Bot className="w-4 h-4" /> Automind AI Voice Agent
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                AI Voice Agent prima pozive dok vaš tim radi svoj posao.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
                AI telefonski agent za sve djelatnosti. Odgovara na pozive, razumije potrebe klijenta, zakazuje termine i rezervacije, prima narudžbe, kvalificira upite i povezuje se s vašim poslovnim sustavima.
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Od poziva do izvršenog zadatka, bez ručnog prepisivanja.</h2>
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
              <p className="text-muted-foreground">Sve cijene su bez PDV-a. Jednokratni setup ovisi o integracijama, telefonskom broju, pravilima razgovora i poslovnim sustavima koje treba povezati.</p>
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
                    <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /><span>AI Voice Agent platforma i podrška</span></div>
                  </div>
                  <Button variant={plan.featured ? "hero" : "outline"} className="w-full" onClick={goToDemo}>Zatraži ponudu</Button>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-foreground/10 p-5 md:p-6 text-sm text-muted-foreground">
              <strong className="text-foreground">Setup:</strong> cijena ovisi o složenosti implementacije, integracijama i broju poslovnih procesa. Za više lokacija i napredne integracije radi se prilagođena ponuda.
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20 bg-foreground/[0.025] border-t border-foreground/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Želite vidjeti kako bi AI Voice Agent radio u vašoj tvrtki?</h2>
            <p className="text-muted-foreground mb-7 max-w-2xl mx-auto">Prođemo kroz vaše pozive, najčešće upite, pravila i sustave koje koristite te složimo konkretan demo za vašu djelatnost.</p>
            <Button variant="hero" size="lg" onClick={goToDemo}>Dogovori demo</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrderFlow;
