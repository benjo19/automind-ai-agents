import PageShell, { PageHero, FeatureGrid, CtaBlock } from "@/components/PageShell";

const features = [
  { title: "Preuzimanje narudžbe", text: "AI prima zahtjev za pranje, glačanje ili kemijsko čišćenje preko poruke ili poziva." },
  { title: "Procjena cijene i roka", text: "Klijent odmah dobije okvirnu cijenu i predviđeno vrijeme gotovosti narudžbe." },
  { title: "Dostava i preuzimanje", text: "Dogovara termin dostave ili dolaska klijenta u praonicu — bez čekanja na telefon." },
  { title: "Obavijest kad je gotovo", text: "Automatski javlja klijentu da je rublje spremno za preuzimanje ili dostavu." },
  { title: "Lojalnost i pretplate", text: "Predlaže mjesečne pakete stalnim klijentima i automatski ih obnavlja." },
  { title: "Reklamacije i pitanja", text: "Odgovara na pitanja o mrljama, materijalima i sigurnosti pranja osjetljivih komada." },
];

const AIZaPraonice = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agent za praonice rublja",
    serviceType: "AI recepcionar za praonice rublja",
    provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
    areaServed: { "@type": "Country", name: "Hrvatska" },
  };
  return (
    <PageShell
      path="/ai-za-praonice"
      title="AI agent za praonice rublja — Automind | Narudžbe i dostava"
      description="AI recepcionar za praonice rublja. Prima narudžbe, dogovara dostavu i preuzimanje, obavještava klijenta kada je rublje gotovo."
      schema={schema}
    >
      <PageHero
        eyebrow="AI za praonice"
        title="Strojevi peru. AI prima narudžbe."
        subtitle="AI agent za praonice rublja preuzima poruke i pozive, dogovara dostavu i obavještava klijenta kada je rublje spremno."
      />
      <FeatureGrid items={features} />
      <CtaBlock title="Demo za vašu praonicu" subtitle="Postavimo demo s vašim cjenikom usluga, područjem dostave i radnim vremenom." />
    </PageShell>
  );
};

export default AIZaPraonice;
