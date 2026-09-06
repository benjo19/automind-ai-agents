import PageShell, { PageHero, CtaBlock, RelatedLinks } from "@/components/PageShell";

const cases = [
  {
    industry: "Frizerski salon",
    title: "Instagram poruke pretvorene u termine",
    text: "Salon dobiva desetke Instagram poruka dnevno. AI odgovara odmah, predlaže slobodan termin i potvrđuje rezervaciju — osoblje ne prekida rad s klijentom zbog telefona.",
    outcome: "Upit dobiva odgovor i termin bez prekidanja rada u salonu.",
  },
  {
    industry: "Auto servis",
    title: "Pozivi izvan radnog vremena",
    text: "Servis gubi klijente koji zovu navečer i vikendom. Glasovni agent javlja se izvan radnog vremena, bilježi podatke o vozilu i kvaru te dogovara termin za prvi radni dan.",
    outcome: "Poziv izvan radnog vremena završava kao zabilježen upit s terminom.",
  },
  {
    industry: "Stomatološka ordinacija",
    title: "Podsjetnici na kontrole",
    text: "Pacijenti zaboravljaju termine kontrole. Agent šalje podsjetnik dan prije i nudi pomicanje termina, pa se slobodna mjesta popunjavaju umjesto da propadnu.",
    outcome: "Otkazani termin vraća se u ponudu umjesto da ostane prazan.",
  },
  {
    industry: "Praonica rublja",
    title: "Narudžbe preko WhatsAppa",
    text: "Praonica s dostavom prima narudžbe porukama. Agent preuzima narudžbu, provjeri opseg posla prema cjeniku i dogovori dostavu.",
    outcome: "Narudžbe se prikupljaju u jednoj evidenciji, bez večernjeg dopisivanja.",
  },
  {
    industry: "Kozmetički salon",
    title: "Priprema ponude za paket tretmana",
    text: "Iz upita za paket tretmana agent složi nacrt ponude prema cjeniku i pošalje ga klijentici na e-mail, odmah ili nakon vašeg odobrenja.",
    outcome: "Ponuda odlazi istog dana, bez ručnog prepisivanja cjenika.",
  },
  {
    industry: "Servis bijele tehnike",
    title: "Trijaža kvarova",
    text: "Agent kroz razgovor prepoznaje vrstu uređaja i opis kvara, predlaže termin majstora i priprema listu vjerojatno potrebnih dijelova.",
    outcome: "Majstor na teren ide s pripremljenim podacima o kvaru.",
  },
];

const orderly = {
  label: "Projekt / interni proizvod",
  title: "Orderly — nabava u ugostiteljstvu na jednom mjestu",
  intro:
    "Orderly je rješenje koje Automind razvija za restorane i ugostiteljske objekte. Primjer je opisan kao projekt, a ne kao rezultat kod klijenta — bez brojki i bez imena naručitelja.",
  blocks: [
    {
      h: "Problem",
      p: "U restoranu zahtjevi za nabavu stižu od više ljudi i kroz više kanala: poruka šefu kuhinje, bilješka na papiru, usmena napomena. Do trenutka naručivanja podaci su rasuti, a jedan dobavljač dobije nekoliko odvojenih poziva.",
    },
    {
      h: "Rješenje",
      p: "Orderly prikuplja sve interne zahtjeve kroz jedan obrazac, spaja ih u jedinstveni popis i grupira stavke po dobavljaču. Osoba koja naručuje dobiva pripremljen pregled po dobavljaču umjesto skupa nepovezanih poruka.",
    },
    {
      h: "Kako radi",
      p: "Zahtjev se unosi u nekoliko sekundi, sustav ga svrstava prema artiklu i pripadajućem dobavljaču, a pred narudžbu se generira popis po dobavljaču. Popis se može pregledati i korigirati prije slanja.",
    },
    {
      h: "Zašto je primjer relevantan",
      p: "Isti obrazac — razbacani zahtjevi, grupiranje i jedan pregled prije akcije — ponavlja se u mnogim malim tvrtkama, od servisa do trgovina. Orderly pokazuje kako izgleda kad se taj korak posloži do kraja.",
    },
  ],
};

const PrimjeriKoristenja = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Primjeri korištenja — Automind",
    url: "https://myautomind.com/primjeri",
    description:
      "Scenariji primjene AI recepcionara i automatizacije po djelatnostima te projektni primjer Orderly za nabavu u ugostiteljstvu.",
    isPartOf: { "@type": "WebSite", name: "Automind", url: "https://myautomind.com" },
  };

  return (
    <PageShell
      path="/primjeri"
      title="Primjeri korištenja — Automind | AI recepcionar u praksi"
      description="Scenariji primjene AI recepcionara u salonima, ordinacijama, servisima i praonicama te projektni primjer Orderly za nabavu u ugostiteljstvu."
      schema={schema}
    >
      <PageHero
        eyebrow="Primjeri korištenja"
        title="Kako AI recepcionar radi u praksi."
        subtitle="Tipični scenariji po djelatnostima i jedan projektni primjer — što sustav preuzima i gdje počinje ljudski dio posla."
      />

      <section className="container px-4 max-w-5xl mx-auto py-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Scenariji po djelatnostima</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <article key={i} className="p-7 rounded-2xl border border-foreground/10 bg-white/60 hover:border-accent/40 transition-colors">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{c.industry}</div>
              <h3 className="text-xl font-bold tracking-tight mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.text}</p>
              <div className="text-sm font-semibold text-foreground border-t border-foreground/10 pt-3">{c.outcome}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="container px-4 max-w-4xl mx-auto py-10">
        <article className="p-8 md:p-10 rounded-3xl border border-foreground/10 bg-gradient-to-br from-accent/5 to-transparent">
          <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{orderly.label}</div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{orderly.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{orderly.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderly.blocks.map((b) => (
              <div key={b.h}>
                <h3 className="font-semibold tracking-tight mb-2">{b.h}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.p}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <RelatedLinks
        title="Povezane stranice"
        links={[
          { to: "/ai-recepcionar", label: "AI recepcionar", text: "Što sustav radi s dolaznim upitima." },
          { to: "/ai-automatizacija-poslovanja", label: "AI automatizacija poslovanja", text: "Kada treba posložiti cijeli proces." },
          { to: "/ai-agenti-hrvatska", label: "AI agenti u Hrvatskoj", text: "Vrste agenata i njihove granice." },
          { to: "/cijene", label: "Cijene", text: "Paketi i opseg svakog paketa." },
        ]}
      />

      <CtaBlock />
    </PageShell>
  );
};

export default PrimjeriKoristenja;
