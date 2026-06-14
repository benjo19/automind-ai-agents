import PageShell, { PageHero, FeatureGrid, CtaBlock } from "@/components/PageShell";

const features = [
  { title: "Odgovara na pozive", text: "AI voice recepcionar javlja se na propuštene pozive, razgovara na hrvatskom i hvata podatke klijenta." },
  { title: "Web chat 24/7", text: "Razgovor s klijentom na vašoj stranici u realnom vremenu — bez čekanja i bez ljudske intervencije." },
  { title: "WhatsApp i Instagram", text: "Jedan agent koji jednako brzo odgovara na svim kanalima gdje vam klijenti pišu." },
  { title: "Zakazivanje termina", text: "Provjerava slobodne termine u kalendaru i potvrđuje rezervaciju u par sekundi." },
  { title: "Slanje ponuda", text: "Generira osnovnu ponudu iz upita i šalje ju klijentu — automatski ili na vaše odobrenje." },
  { title: "Predaja čovjeku", text: "Kada je potrebno, urednim sažetkom prebacuje razgovor na vas ili kolegu." },
];

const AIRecepcionar = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI recepcionar",
      provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
      areaServed: { "@type": "Country", name: "Hrvatska" },
      description: "AI recepcionar koji odgovara na pozive, poruke i web upite te zakazuje termine i šalje ponude 24/7.",
    },
  ];
  return (
    <PageShell
      path="/ai-recepcionar"
      title="AI recepcionar — Automind | Odgovori, termini i ponude 24/7"
      description="Automind AI recepcionar odgovara na pozive, poruke i web upite, zakazuje termine i šalje ponude. Hrvatski jezik, GDPR, integracija s kalendarom."
      schema={schema}
    >
      <PageHero
        eyebrow="AI recepcionar"
        title="Recepcionar koji ne spava, ne odlazi na pauzu i ne propušta poziv."
        subtitle="Automind preuzima sve dolazne upite — telefon, web, WhatsApp, mail — i pretvara ih u termine i ponude bez vašeg uplitanja."
      />
      <FeatureGrid items={features} />
      <CtaBlock />
    </PageShell>
  );
};

export default AIRecepcionar;
