import PageShell, { PageHero, FeatureGrid, CtaBlock } from "@/components/PageShell";

const features = [
  { title: "Dogovor servisa po marki i modelu", text: "AI prepoznaje vozilo, predlaže slobodan termin i procjenu trajanja zahvata." },
  { title: "Procjena cijene", text: "Šalje okvirnu cijenu redovnog servisa ili popravka na temelju vašeg cjenika." },
  { title: "Naručivanje dijelova", text: "Zapisuje VIN i potrebne dijelove te šalje listu nabavi — bez prepisivanja s papira." },
  { title: "Obavijesti o gotovom autu", text: "Klijent dobiva poruku čim je auto spreman za preuzimanje, s računom u privitku." },
  { title: "Sezonski podsjetnici", text: "Automatski podsjeća na izmjenu guma, klima servis ili registraciju." },
  { title: "Pozivi 24/7", text: "Vikend i nakon radnog vremena — AI prima poziv, hvata podatke i dogovara termin za ponedjeljak." },
];

const AIZaAutoServise = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agent za auto servise",
    serviceType: "AI recepcionar za automehaničarske servise",
    provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
    areaServed: { "@type": "Country", name: "Hrvatska" },
  };
  return (
    <PageShell
      path="/ai-za-auto-servise"
      title="AI agent za auto servise — Automind | Termini i procjene"
      description="AI recepcionar za auto servise. Dogovara termine po marki vozila, šalje procjene i obavještava klijenta kada je auto gotov."
      schema={schema}
    >
      <PageHero
        eyebrow="AI za auto servise"
        title="Servis radi punom parom. Telefon se javlja sam."
        subtitle="AI agent za auto servise preuzima pozive i poruke, dogovara termine po marki vozila i šalje procjene — vi pod haubom, on na recepciji."
      />
      <FeatureGrid items={features} />
      <CtaBlock title="Demo za vaš servis" subtitle="Postavimo demo s vašim cjenikom, marka-model bazom i radnim vremenom radionice." />
    </PageShell>
  );
};

export default AIZaAutoServise;
