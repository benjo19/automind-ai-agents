import PageShell, { PageHero, FeatureGrid, CtaBlock } from "@/components/PageShell";

const features = [
  { title: "Zakazivanje frizera i kozmetike", text: "AI rezervira termin za šišanje, bojanje, manikuru ili tretman u sekundi, 24/7." },
  { title: "Pamti omiljenu uslugu i frizera", text: "Prepoznaje stalne klijente i predlaže im njihovu uobičajenu uslugu i termin." },
  { title: "Podsjetnici i potvrde", text: "Automatski šalje podsjetnik dan prije termina — manje no-show situacija, više prihoda." },
  { title: "Cjenik i trajanje usluge", text: "Klijent odmah dobije informaciju o cijeni, trajanju i dostupnosti — bez vašeg odgovora." },
  { title: "Otkazivanje i pomicanje", text: "Klijent može sam pomaknuti ili otkazati termin — slot se odmah oslobađa za sljedećeg." },
  { title: "Promo poruke", text: "Šalje promocije i pakete stalnim klijentima u tihim terminima i puni slobodne sate." },
];

const AIZaSalone = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agent za salone",
    serviceType: "AI recepcionar za frizerske i beauty salone",
    provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
    areaServed: { "@type": "Country", name: "Hrvatska" },
  };
  return (
    <PageShell
      path="/ai-za-salone"
      title="AI agent za salone — Automind | Zakazivanje 24/7"
      description="AI recepcionar za frizerske i beauty salone. Zakazuje termine, šalje podsjetnike i puni slobodne slotove — automatski, na hrvatskom."
      schema={schema}
    >
      <PageHero
        eyebrow="AI za salone"
        title="Termini se popunjavaju i dok šišate."
        subtitle="AI agent za salone preuzima Instagram poruke, pozive i web upite, predlaže termine i potvrđuje rezervacije bez prekidanja vašeg rada."
      />
      <FeatureGrid items={features} />
      <CtaBlock title="Demo za vaš salon" subtitle="Pripremamo prilagođen demo s vašim uslugama, cijenama i radnim vremenom." />
    </PageShell>
  );
};

export default AIZaSalone;
