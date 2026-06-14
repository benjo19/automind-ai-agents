import PageShell, { PageHero, FeatureGrid, CtaBlock } from "@/components/PageShell";

const features = [
  { title: "Naručivanje pacijenata", text: "AI dogovara pregled, kontrolu ili tretman prema dostupnosti liječnika i vrsti usluge." },
  { title: "Trijaža upita", text: "Razvrstava upite po hitnosti i tipu — što može čekati, a što zahtijeva hitnu reakciju." },
  { title: "Podsjetnici za pregled", text: "Šalje SMS ili WhatsApp podsjetnik s uputama prije pregleda — manje propuštenih termina." },
  { title: "Informacije o uslugama", text: "Odgovara na pitanja o cijenama, trajanju zahvata, pripremi i dokumentaciji." },
  { title: "GDPR i medicinska tajna", text: "Podaci pacijenata šifrirani su i u EU; pristup samo ovlaštenom osoblju." },
  { title: "Praćenje terapije", text: "Automatski šalje upitnik nakon pregleda i podsjeća na kontrolni termin." },
];

const AIZaOrdinacije = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agent za ordinacije",
    serviceType: "AI recepcionar za zdravstvene ordinacije",
    provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
    areaServed: { "@type": "Country", name: "Hrvatska" },
  };
  return (
    <PageShell
      path="/ai-za-ordinacije"
      title="AI agent za ordinacije — Automind | Naručivanje i trijaža"
      description="AI recepcionar za zdravstvene ordinacije. Naručuje pacijente, šalje podsjetnike, trijažira upite — sve uz GDPR i medicinsku tajnu."
      schema={schema}
    >
      <PageHero
        eyebrow="AI za ordinacije"
        title="Telefon više ne zvoni cijeli dan."
        subtitle="AI agent za ordinacije naručuje pacijente, šalje podsjetnike i odgovara na česta pitanja — osoblje se vraća svom poslu."
      />
      <FeatureGrid items={features} />
      <CtaBlock title="Demo za vašu ordinaciju" subtitle="Postavimo demo s vašim uslugama, terapijama i radnim vremenom liječnika." />
    </PageShell>
  );
};

export default AIZaOrdinacije;
