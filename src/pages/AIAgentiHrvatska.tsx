import PageShell, { PageHero, FeatureGrid, CtaBlock, QaSection, RelatedLinks, faqSchema, type QaItem } from "@/components/PageShell";

const agents = [
  { title: "Agent za dolazne upite", text: "Odgovara na web chat, e-mail i poruke, prikuplja ime, kontakt i opis potrebe te sprema upit u tablicu ili CRM." },
  { title: "Glasovni agent", text: "Javlja se na pozive na hrvatskom jeziku, vodi kratki razgovor, bilježi podatke i šalje sažetak poziva timu." },
  { title: "Agent za termine", text: "Provjerava dostupnost u kalendaru, predlaže termin i potvrđuje ga prema pravilima koja zadate." },
  { title: "Agent za ponude", text: "Iz upita složi nacrt ponude po vašem cjeniku i pošalje ga na odobrenje ili izravno klijentu." },
  { title: "Agent za follow-up", text: "Prati ponude bez odgovora i šalje podsjetnik u dogovorenom ritmu, bez ručnog vođenja popisa." },
  { title: "Agent za interne procese", text: "Prikuplja interne zahtjeve, grupira ih i priprema pregled za osobu koja odlučuje ili naručuje." },
];

const faq: QaItem[] = [
  {
    q: "Što je AI agent?",
    a: "AI agent je program koji razumije upit napisan ili izgovoren prirodnim jezikom i na temelju zadanih pravila izvodi korake — odgovara, prikuplja podatke, upisuje termin ili priprema dokument. Za razliku od običnog obrasca, može voditi razgovor i tražiti podatke koji nedostaju.",
  },
  {
    q: "Govore li AI agenti hrvatski?",
    a: "Da. Agenti se postavljaju za komunikaciju na hrvatskom jeziku, u tekstu i u glasovnom razgovoru, a po potrebi mogu odgovarati i na engleskom. Ton i formulacije podešavaju se prema načinu na koji vaša tvrtka inače komunicira.",
  },
  {
    q: "Gdje se AI agenti najčešće koriste u Hrvatskoj?",
    a: "Najčešće kod lokalnih uslužnih tvrtki koje dobivaju puno kratkih upita: saloni, ordinacije, auto servisi, praonice, ugostiteljstvo, smještaj i manje B2B tvrtke. Zajedničko im je da upiti stižu izvan radnog vremena i preko više kanala.",
  },
  {
    q: "Što ako agent ne zna odgovor?",
    a: "Agent se postavlja s jasnom granicom: kada pitanje izlazi izvan zadanog opsega, razgovor se prebacuje na osobu iz tima uz sažetak dotadašnjeg razgovora. Cilj je da nijedan upit ne ostane bez odgovora, a ne da agent nagađa.",
  },
  {
    q: "Kako stoji stvar s podacima i GDPR-om?",
    a: "Prikupljaju se samo podaci nužni za obradu upita, a pravni okvir opisan je u politici privatnosti i uvjetima korištenja. Prije uvođenja dogovara se koji se podaci bilježe, gdje se spremaju i koliko dugo se čuvaju.",
  },
  {
    q: "Koliko traje postavljanje?",
    a: "Ovisi o broju kanala i integracija. Jedan kanal s jasnim procesom postavlja se brzo, dok glasovni agent s kalendarom i ponudama traži više testiranja prije nego što ide uživo.",
  },
];

const AIAgentiHrvatska = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI agenti za tvrtke u Hrvatskoj",
      serviceType: "AI agenti i konverzacijska automatizacija",
      provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
      areaServed: { "@type": "Country", name: "Hrvatska" },
      url: "https://myautomind.com/ai-agenti-hrvatska",
      availableLanguage: ["hr", "en"],
      description:
        "AI agenti na hrvatskom jeziku koji odgovaraju na upite, vode razgovor, zakazuju termine i pripremaju ponude.",
    },
    faqSchema(faq),
  ];

  return (
    <PageShell
      path="/ai-agenti-hrvatska"
      title="AI agenti u Hrvatskoj — Automind | Upiti, pozivi i termini na hrvatskom"
      description="AI agenti na hrvatskom jeziku za lokalne tvrtke: odgovaraju na upite i pozive, zakazuju termine i pripremaju ponude. Pregled vrsta agenata i čestih pitanja."
      schema={schema}
    >
      <PageHero
        eyebrow="AI agenti u Hrvatskoj"
        title="AI agenti koji rade na hrvatskom i u vašem procesu."
        subtitle="Pregled toga što AI agenti stvarno rade, gdje se koriste kod lokalnih tvrtki i kada ih ima smisla uvoditi."
      />

      <section className="container px-4 max-w-3xl mx-auto pb-4">
        <p className="text-lg text-muted-foreground leading-relaxed">
          AI agent je sustav koji razumije upit na prirodnom jeziku i po zadanim pravilima odradi sljedeći korak:
          odgovori klijentu, zabilježi podatke, provjeri kalendar ili pripremi ponudu. Automind postavlja takve agente
          za tvrtke u Hrvatskoj — na hrvatskom jeziku i povezano s alatima koje već koristite.
        </p>
      </section>

      <FeatureGrid items={agents} />

      <section className="container px-4 max-w-3xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-foreground/10 bg-white/60">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Kada ima smisla</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
              <li>Upiti stižu i izvan radnog vremena.</li>
              <li>Ista pitanja ponavljaju se svaki dan.</li>
              <li>Odgovor kasni jer je tim s klijentima.</li>
              <li>Postoji jasan proces koji se može zapisati.</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-foreground/10 bg-white/60">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Kada nema smisla</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
              <li>Svaki je upit jedinstven i traži stručnu procjenu.</li>
              <li>Nema definiranog cjenika ni pravila zakazivanja.</li>
              <li>Očekuje se da agent radi bez ikakvog nadzora.</li>
              <li>Broj upita je premali da bi se uštedjelo vrijeme.</li>
            </ul>
          </div>
        </div>
      </section>

      <QaSection title="Česta pitanja o AI agentima" items={faq} />

      <RelatedLinks
        title="Povezane stranice"
        links={[
          { to: "/ai-recepcionar", label: "AI recepcionar", text: "Najčešća primjena AI agenta kod lokalnih tvrtki." },
          { to: "/ai-automatizacija-poslovanja", label: "AI automatizacija poslovanja", text: "Kada je potreban širi zahvat od jednog agenta." },
          { to: "/ai-za-salone", label: "AI za salone", text: "Termini i poruke u beauty djelatnosti." },
          { to: "/ai-za-ordinacije", label: "AI za ordinacije", text: "Naručivanje pacijenata i podsjetnici." },
          { to: "/ai-za-auto-servise", label: "AI za auto servise", text: "Pozivi, trijaža kvarova i termini." },
          { to: "/blog/gdpr-i-ai-agenti", label: "GDPR i AI agenti", text: "Što treba posložiti prije uvođenja." },
        ]}
      />

      <CtaBlock
        title="Želite vidjeti agenta na svom primjeru?"
        subtitle="Pošaljite upit i pripremamo demo prilagođen vašoj djelatnosti — javljamo se u 24 sata."
      />
    </PageShell>
  );
};

export default AIAgentiHrvatska;
