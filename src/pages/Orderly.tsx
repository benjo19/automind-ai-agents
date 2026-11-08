import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ClipboardList, CheckCircle2, Layers, Send, PackageCheck, ExternalLink, Users, Store, BookOpen, Truck, Warehouse, ShieldCheck, ListChecks } from "lucide-react";
import PageShell, { faqSchema } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import DemoForm from "@/components/DemoForm";

const steps = [
  { icon: ClipboardList, title: "Osoblje kreira zahtjev", text: "Potrebe kuhinje i šanka prikupljaju se na jednom mjestu." },
  { icon: CheckCircle2, title: "Voditelj odobrava", text: "Zahtjevi prolaze pregled prije naručivanja." },
  { icon: Layers, title: "Grupiranje po dobavljačima", text: "Artikli se razdvajaju u pregledne narudžbe po dobavljaču." },
  { icon: Send, title: "Slanje narudžbe", text: "Pripremljene narudžbe odlaze dobavljačima prema dogovorenom načinu slanja." },
  { icon: PackageCheck, title: "Zaprimanje robe", text: "Dostavljena roba povezuje se s narudžbom." },
];
const core = [
  { icon: BookOpen, title: "Katalog", text: "Polazište za organizaciju artikala koji se naručuju. Artikli su organizirani u katalogu kako bi osoblje lakše pronašlo ono što treba." },
  { icon: Store, title: "Lokacije i uloge", text: "Organizirajte naručivanje za jedan ili više restorana i odredite tko podnosi, a tko odobrava zahtjeve. Osoblje, voditelji i administratori imaju različite odgovornosti i pristup." },
  { icon: ClipboardList, title: "Nabava", text: "Zahtjevi osoblja, odobravanje i narudžbenice u povezanom procesu." },
  { icon: Truck, title: "Dobavljači", text: "Grupiranje stavki prema dobavljaču umjesto ručnog sastavljanja više popisa." },
  { icon: PackageCheck, title: "Zaprimanje", text: "Kad roba stigne, osoblje može evidentirati što je zaprimljeno." },
];
const additional = [
  { icon: Warehouse, title: "Skladište", text: "Praćenje zaliha i skladišnih kretanja: provjerimo treba li vam taj opseg i što je dostupno za vaše lokacije." },
  { icon: ShieldCheck, title: "HACCP", text: "Evidencije povezane sa sigurnošću hrane: opseg i dostupnost treba potvrditi. Ne predstavlja jamstvo usklađenosti ni zamjenu za vaše procedure." },
  { icon: ListChecks, title: "QC zadaci", text: "Zadaci kontrole kvalitete: prije uključivanja treba potvrditi podržane zadatke, odgovornosti i način evidencije." },
];
const faqs = [
  { q: "Što je Orderly?", a: "Orderly je AutomindAI aplikacija za digitalnu nabavu u ugostiteljstvu. Povezuje zahtjeve osoblja, pregled i odobravanje, narudžbe po dobavljačima te zaprimanje robe." },
  { q: "Kome je namijenjen?", a: "Vlasnicima restorana i timovima koji organiziraju nabavu za više lokacija. Prikladnost za vaš način rada provjeravamo na konkretnom procesu, bez pretpostavke da sve tvrtke trebaju isti opseg." },
  { q: "Šalje li se svaka narudžba automatski?", a: "Ne obećavamo slanje bez pregleda ili bilo koju nepotvrđenu automatizaciju. Na demonstraciji provjeravamo odobravanje i podržani način slanja prema vašim dobavljačima." },
  { q: "Jesu li skladište, HACCP i QC uključeni?", a: "Ovdje su odvojeni od osnovnog toka nabave. Njihova dostupnost, detaljne mogućnosti i uključivanje nisu potvrđeni ovom stranicom; provjeravamo ih prije dogovora. Ne obećavamo HACCP certifikaciju ili automatsku usklađenost." },
  { q: "Kako mogu vidjeti aplikaciju ili zatražiti demo?", a: "Otvorite postojeću Orderly aplikaciju ili prijavu i registraciju. Za razgovor o svom procesu koristite kontaktni obrazac na ovoj stranici i u poruci navedite Orderly, lokacije i način na koji danas naručujete." },
  { q: "Koliko košta?", a: "Ne navodimo javne cijene. Opseg i ponudu dogovaramo nakon pregleda vašeg procesa i potrebnih modula." },
];

const Orderly = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const goToDemo = () => document.getElementById("demo")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  return (
    <PageShell path="/orderly" title="Orderly – aplikacija za naručivanje robe u restoranima | AutomindAI" description="Orderly pojednostavljuje naručivanje robe u restoranu: osoblje šalje zahtjeve, voditelj ih odobrava, a nabava priprema narudžbe dobavljačima. Pogledajte kako radi." schema={faqSchema(faqs)}>
      <div className="orderly-page">
        <section className="container px-4 max-w-6xl mx-auto pt-6 pb-10 md:pt-10 md:pb-14">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">AutomindAI / Naše aplikacije</Link>
          <p className="text-primary font-semibold text-sm mt-6 mb-3">Naša aplikacija za digitalnu nabavu</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">Narudžbe za restoran bez WhatsApp poruka i Excel tablica</h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mt-5 leading-relaxed">Orderly je aplikacija u kojoj kuhinja i šank upisuju što im treba, voditelj pregledava zahtjeve, a osoba zadužena za nabavu priprema narudžbe po dobavljačima. Sve je pregledno — i kada imate više restorana.</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-7">
            <Button asChild variant="hero" size="lg" className="px-6"><a href="https://bar-runner.lovable.app" target="_blank" rel="noopener noreferrer">Otvori Orderly <ExternalLink /></a></Button>
            <Button variant="hero-outline" size="lg" className="px-6" onClick={goToDemo}>Zatraži Orderly demo <ArrowDown /></Button>
          </div>
          <Button asChild variant="link" className="mt-3 px-0 h-auto whitespace-normal"><a href="https://automindorderly.com/auth" target="_blank" rel="noopener noreferrer">Prijavi se ili registriraj <ExternalLink /></a></Button>
          <div className="mt-9 border-y border-border py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Zahtjevi na jednom mjestu", "Pregled prije naručivanja", "Narudžbe po dobavljačima"].map(text => <div key={text} className="flex gap-2 items-center text-sm font-semibold"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{text}</div>)}
          </div>
        </section>

        <section className="bg-secondary/60 border-y border-border py-10 md:py-14">
          <div className="container px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-7">Poznato? Svaki dan netko nešto treba naručiti.</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div><p className="text-sm font-semibold text-muted-foreground mb-3">PRIJE</p><h3 className="text-xl font-semibold mb-3">Poruke stižu sa svih strana</h3><ul className="space-y-3 text-muted-foreground list-disc pl-5"><li>Zahtjevi stižu kroz poruke, pozive i bilješke.</li><li>Osoba koja naručuje ručno spaja stavke.</li><li>Teško je povezati zahtjev, narudžbu i dostavu.</li></ul></div>
              <div><p className="text-sm font-semibold text-primary mb-3">S ORDERLYJEM</p><h3 className="text-xl font-semibold mb-3">Svi zahtjevi na jednom mjestu</h3><ul className="space-y-3 text-muted-foreground list-disc pl-5"><li>Zahtjevi osoblja prikupljeni su na jednom mjestu.</li><li>Voditelj pregledava prije naručivanja.</li><li>Pregled po dobavljačima vodi prema slanju i zaprimanju.</li></ul></div>
            </div>
          </div>
        </section>

        <section className="container px-4 max-w-6xl mx-auto py-10 md:py-14" aria-labelledby="orderly-example">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-9">
            <p className="text-sm font-semibold text-primary mb-2">Primjer iz restorana</p>
            <h2 id="orderly-example" className="text-2xl md:text-3xl font-bold mb-4">Kuhinji treba piletina. Šanku treba voda.</h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">Umjesto dvije poruke na WhatsAppu, zaposlenici unose zahtjeve u Orderly. Voditelj ih pregledava, a nabava vidi što treba naručiti od mesnice i što od dobavljača pića.</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[["1. Kuhinja", "Unosi 6 kg piletine."], ["2. Šank", "Unosi 24 boce vode."], ["3. Nabava", "Priprema odvojene narudžbe za dva dobavljača."]].map(([title, text]) => <div key={title} className="rounded-xl bg-secondary/60 p-4"><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-muted-foreground">{text}</p></div>)}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Ilustrativan primjer tijeka rada, ne stvarna narudžba ili prikaz podataka korisnika.</p>
          </div>
        </section>

        <section className="container px-4 max-w-6xl mx-auto py-10 md:py-14" aria-labelledby="orderly-flow">
          <p className="text-sm font-semibold text-primary mb-2">Jednostavno, u pet koraka</p><h2 id="orderly-flow" className="text-2xl md:text-3xl font-bold mb-7">Kako Orderly radi u praksi</h2>
          <ol className="grid md:grid-cols-5 gap-5">
            {steps.map(({icon:Icon,title,text},i) => <li key={title} className="relative border-t-2 border-primary/30 pt-5"><div className="flex items-center gap-3 mb-4"><Icon className="h-6 w-6 text-primary"/><span className="text-sm text-muted-foreground">{String(i+1).padStart(2,"0")}</span>{i<4&&<ArrowRight className="hidden md:block h-4 w-4 text-accent ml-auto"/>}</div><h3 className="font-semibold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></li>)}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">Na demonstraciji prolazimo vaš stvarni način naručivanja i pokazujemo koje korake aplikacija podržava.</p>
        </section>

        <section className="container px-4 max-w-6xl mx-auto py-10 md:py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Što možete raditi u Orderlyju?</h2><p className="text-muted-foreground mb-7 max-w-3xl">Umjesto da svaki dan skupljate poruke i prepisujete artikle, tim radi u jednom sustavu. Ovo su ključni dijelovi nabave.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{core.map(({icon:Icon,title,text})=><article key={title} className="rounded-lg border border-border bg-card p-5"><Icon className="h-6 w-6 text-primary mb-4"/><h3 className="text-lg font-semibold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></article>)}</div>
          <div className="mt-10 border-t border-border pt-8"><h2 className="text-2xl font-bold mb-3">Kad vam treba više od same nabave</h2><p className="text-muted-foreground mb-6 max-w-3xl">Skladište, HACCP i zadaci kontrole kvalitete zasebni su dijelovi sustava. Na demonstraciji pokazujemo što je dostupno i koji modul ima smisla za vaš posao.</p><div className="grid md:grid-cols-3 gap-6">{additional.map(({icon:Icon,title,text})=><article key={title}><Icon className="h-6 w-6 text-accent mb-3"/><h3 className="font-semibold text-lg mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></article>)}</div></div>
        </section>

        <section className="bg-secondary/60 py-10 md:py-14"><div className="container px-4 max-w-6xl mx-auto"><h2 className="text-2xl md:text-3xl font-bold mb-7">Svatko vidi ono što mu treba</h2><div className="grid md:grid-cols-3 gap-7">{[["Vlasnik","Pregled procesa nabave na više lokacija bez sastavljanja slike iz nepovezanih poruka."],["Voditelj lokacije","Mjesto za pregled zahtjeva, odobravanje i organizaciju naručivanja."],["Osoblje","Jedan način prijave potreba kuhinje i šanka, umjesto više odvojenih razgovora."]].map(([title,text])=><div key={title}><Users className="h-5 w-5 text-primary mb-3"/><h3 className="font-semibold text-xl mb-2">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>

        <section className="container px-4 max-w-3xl mx-auto py-10 md:py-14"><h2 className="text-2xl md:text-3xl font-bold mb-5">Česta pitanja</h2><Accordion type="single" collapsible>{faqs.map(({q,a},i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent></AccordionItem>)}</Accordion></section>
        <section className="container px-4 max-w-3xl mx-auto text-center py-8"><h2 className="text-2xl md:text-3xl font-bold mb-3">Želite vidjeti kako bi to radilo u vašem restoranu?</h2><p className="text-muted-foreground leading-relaxed">Pošaljite upit za kratku demonstraciju. Pokazat ćemo vam kako osoblje naručuje, kako voditelj odobrava i kako nastaje narudžba za dobavljača.</p></section>
        <DemoForm />
        <div className="container px-4 max-w-3xl mx-auto flex flex-wrap justify-center gap-5 text-sm"><Link to="/" className="text-primary underline underline-offset-4">AutomindAI usluge</Link><Link to="/ai-automatizacija-poslovanja" className="text-primary underline underline-offset-4">Automatizacija poslovanja</Link></div>
      </div>
    </PageShell>
  );
};
export default Orderly;