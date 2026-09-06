import PageShell, { PageHero, FeatureGrid, CtaBlock, QaSection, RelatedLinks, faqSchema, type QaItem } from "@/components/PageShell";

const useCases = [
  { title: "Obrada dolaznih upita", text: "Upiti s weba, e-maila, WhatsAppa i telefona skupljaju se na jedno mjesto, dobivaju odgovor i završavaju u vašoj evidenciji umjesto u nizu nepovezanih poruka." },
  { title: "Zakazivanje i podsjetnici", text: "Sustav provjerava kalendar, predlaže slobodne termine i šalje podsjetnik prije termina. Otkazivanja i pomicanja obrađuju se bez ručnog dopisivanja." },
  { title: "Priprema ponuda", text: "Iz podataka u upitu složi se nacrt ponude po vašem cjeniku i pravilima. Vi ga odobrite ili pošaljete izravno klijentu." },
  { title: "Narudžbe i nabava", text: "Interni zahtjevi za nabavu prikupljaju se kroz jedan obrazac i grupiraju po dobavljaču, pa naručivanje postaje jedan pregled umjesto niza poziva." },
  { title: "Follow-up i podsjetnici prodaji", text: "Ponude koje su ostale bez odgovora automatski se vraćaju na popis i dobivaju podsjetnik u dogovorenom ritmu." },
  { title: "Izvještaji i evidencija", text: "Svaki upit, termin i ponuda bilježe se u tablicu ili CRM, pa na kraju mjeseca imate pregled bez ručnog prepisivanja." },
];

const faq: QaItem[] = [
  {
    q: "Što je AI automatizacija poslovanja?",
    a: "To je povezivanje koraka koje danas radite ručno — odgovaranje na upite, unos podataka, zakazivanje, slanje ponuda — u jedan sustav koji dio tih koraka odrađuje sam. AI se koristi tamo gdje treba razumjeti tekst ili razgovor, a ostatak su klasične integracije među alatima koje već koristite.",
  },
  {
    q: "Kako izgleda uvođenje?",
    a: "Prvo se popiše proces onakav kakav stvarno je, pa se odabere jedan korak s najviše ručnog rada. Taj dio se postavi, testira na stvarnim upitima i tek onda proširuje. Rad u malim koracima znači da sustav možete zaustaviti ili promijeniti bez velikog troška.",
  },
  {
    q: "Mora li se mijenjati postojeći softver?",
    a: "Najčešće ne. Automatizacija se nadograđuje na alate koje već koristite — kalendar, e-mail, tablice, CRM — kroz njihove postojeće veze. Zamjena softvera predlaže se samo ako trenutni alat objektivno ne podržava potreban korak.",
  },
  {
    q: "Za koga automatizacija nema smisla?",
    a: "Ako imate mali broj upita mjesečno, proces koji se svaki put odvija drukčije ili nedefiniran cjenik, automatizacija najčešće samo ubrzava nered. U tom slučaju prvo treba posložiti proces, pa tek onda razmišljati o alatima.",
  },
  {
    q: "Koliko košta?",
    a: "Cijena ovisi o broju kanala, integracijama i složenosti procesa, pa se određuje nakon kratkog razgovora i pregleda postojećeg tijeka rada. Na stranici Cijene opisani su paketi i što svaki obuhvaća.",
  },
];

const AIAutomatizacijaPoslovanja = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI automatizacija poslovanja",
      serviceType: "Poslovna automatizacija i AI integracije",
      provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
      areaServed: { "@type": "Country", name: "Hrvatska" },
      url: "https://myautomind.com/ai-automatizacija-poslovanja",
      availableLanguage: ["hr", "en"],
      description:
        "Automatizacija dolaznih upita, zakazivanja, ponuda, narudžbi i evidencije za male i srednje tvrtke u Hrvatskoj.",
    },
    faqSchema(faq),
  ];

  return (
    <PageShell
      path="/ai-automatizacija-poslovanja"
      title="AI automatizacija poslovanja — Automind | Upiti, termini i ponude"
      description="Automatizacija upita, zakazivanja, ponuda i evidencije za male i srednje tvrtke u Hrvatskoj. Nadogradnja na alate koje već koristite, na hrvatskom jeziku."
      schema={schema}
    >
      <PageHero
        eyebrow="AI automatizacija poslovanja"
        title="Manje ručnog rada između upita i naplaćenog posla."
        subtitle="Automind povezuje korake koje danas radite ručno — od dolaznog upita do zakazanog termina, poslane ponude i uredne evidencije."
      />

      <section className="container px-4 max-w-3xl mx-auto pb-4">
        <p className="text-lg text-muted-foreground leading-relaxed">
          AI automatizacija poslovanja znači da se ponavljajući koraci u vašem procesu odrađuju bez ručnog prepisivanja
          i dopisivanja. Upit stiže, dobiva odgovor, podaci završe na pravom mjestu, termin se upiše u kalendar, a
          ponuda se pripremi po vašem cjeniku. AI preuzima dijelove gdje treba razumjeti tekst ili razgovor; ostatak su
          integracije s alatima koje već koristite.
        </p>
      </section>

      <FeatureGrid items={useCases} />

      <section className="container px-4 max-w-3xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-foreground/10 bg-white/60">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Za koga je</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
              <li>Tvrtke koje dnevno primaju upite na više kanala.</li>
              <li>Timovi gdje ista osoba prodaje, zakazuje i administrira.</li>
              <li>Procesi s puno ponavljajućeg unosa podataka.</li>
              <li>Poslovanja s jasnim cjenikom i pravilima rada.</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-foreground/10 bg-white/60">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Za koga nije</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
              <li>Mali broj upita mjesečno — ušteda ne pokriva postavljanje.</li>
              <li>Proces koji se svaki put odvija drukčije i nije zapisan.</li>
              <li>Očekivanje da alat riješi nejasnu ponudu ili cjenik.</li>
              <li>Nespremnost na pregled i korekcije u prvim tjednima.</li>
            </ul>
          </div>
        </div>
      </section>

      <QaSection title="Česta pitanja o automatizaciji poslovanja" items={faq} />

      <RelatedLinks
        title="Nastavite dalje"
        links={[
          { to: "/ai-recepcionar", label: "AI recepcionar", text: "Odgovaranje na pozive, poruke i web upite." },
          { to: "/ai-agenti-hrvatska", label: "AI agenti u Hrvatskoj", text: "Što AI agenti rade i gdje se koriste." },
          { to: "/primjeri", label: "Primjeri", text: "Konkretni scenariji i projekti." },
          { to: "/cijene", label: "Cijene", text: "Paketi i što svaki obuhvaća." },
          { to: "/faq", label: "FAQ", text: "Odgovori na najčešća pitanja." },
          { to: "/blog/koliko-kosta-ne-automatizirati", label: "Koliko košta ne automatizirati", text: "Trošak ručnog rada u brojkama." },
        ]}
      />

      <CtaBlock
        title="Pogledajmo vaš proces zajedno"
        subtitle="Pošaljite upit i pripremamo prijedlog automatizacije za vašu djelatnost — javljamo se u 24 sata."
      />
    </PageShell>
  );
};

export default AIAutomatizacijaPoslovanja;
