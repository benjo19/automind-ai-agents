import PageShell, { PageHero, CtaBlock } from "@/components/PageShell";

const cases = [
  {
    industry: "Frizerski salon",
    title: "Instagram poruke pretvorene u termine",
    text: "Salon u Zagrebu primao je 40+ Instagram poruka dnevno. AI sada odgovara u sekundi, predlaže slobodan termin i potvrđuje rezervaciju — zaposlenice ne diraju telefon tijekom šišanja.",
    metric: "+35% rezervacija u prvom mjesecu",
  },
  {
    industry: "Auto servis",
    title: "Pozivi izvan radnog vremena",
    text: "Servis je gubio klijente koji su zvali navečer i vikendom. AI voice recepcionar javlja se 24/7, hvata podatke o vozilu i kvaru i dogovara termin za ponedjeljak ujutro.",
    metric: "0 propuštenih poziva",
  },
  {
    industry: "Stomatološka ordinacija",
    title: "Manje no-show termina",
    text: "Ordinacija je imala 15% propuštenih kontrola. AI automatski šalje podsjetnik dan prije i nudi pomicanje — broj propuštenih pregleda spao je na 4%.",
    metric: "-73% propuštenih termina",
  },
  {
    industry: "Praonica rublja",
    title: "Narudžbe preko WhatsAppa",
    text: "Praonica s dostavom uvela je AI agenta koji prima narudžbu, procjenjuje cijenu i dogovara dostavu — vlasnik više ne odgovara na poruke uvečer.",
    metric: "+50% narudžbi mjesečno",
  },
  {
    industry: "Kozmetički salon",
    title: "Slanje ponuda automatski",
    text: "AI iz upita za paket tretmana generira personaliziranu ponudu i šalje ju na e-mail klijentici unutar minute — bez ručnog rada.",
    metric: "Ponuda u 60 sekundi umjesto 24h",
  },
  {
    industry: "Servis bijele tehnike",
    title: "Trijaža kvarova",
    text: "AI razgovara s klijentom, prepoznaje vrstu uređaja i opis kvara, predlaže termin majstora i šalje pripremnu listu rezervnih dijelova.",
    metric: "+2 sata dnevno za majstora",
  },
];

const PrimjeriKoristenja = () => (
  <PageShell
    path="/primjeri"
    title="Primjeri korištenja — Automind | AI recepcionar u praksi"
    description="Kako AI recepcionar radi u salonima, ordinacijama, auto servisima i praonicama. Stvarni rezultati hrvatskih tvrtki."
  >
    <PageHero
      eyebrow="Primjeri korištenja"
      title="Kako AI recepcionar radi u praksi."
      subtitle="Stvarni scenariji iz hrvatskih salona, ordinacija, servisa i praonica — što AI preuzima i koliko vremena (i novca) štedi."
    />

    <section className="container px-4 max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <article key={i} className="p-7 rounded-2xl border border-foreground/10 bg-white/60 hover:border-accent/40 transition-colors">
            <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{c.industry}</div>
            <h3 className="text-xl font-bold tracking-tight mb-3">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.text}</p>
            <div className="text-sm font-semibold text-foreground border-t border-foreground/10 pt-3">{c.metric}</div>
          </article>
        ))}
      </div>
    </section>

    <CtaBlock />
  </PageShell>
);

export default PrimjeriKoristenja;
