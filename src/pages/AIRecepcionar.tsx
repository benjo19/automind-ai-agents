import PageShell, { PageHero, FeatureGrid, CtaBlock, QaSection, RelatedLinks, faqSchema, type QaItem } from "@/components/PageShell";

const features = [
  { title: "Odgovara na pozive", text: "AI voice recepcionar javlja se na propuštene pozive, razgovara na hrvatskom i hvata podatke klijenta." },
  { title: "Web chat 24/7", text: "Razgovor s klijentom na vašoj stranici u realnom vremenu — bez čekanja i bez ljudske intervencije." },
  { title: "WhatsApp i Instagram", text: "Jedan agent koji jednako brzo odgovara na svim kanalima gdje vam klijenti pišu." },
  { title: "Zakazivanje termina", text: "Provjerava slobodne termine u kalendaru i potvrđuje rezervaciju u par sekundi." },
  { title: "Slanje ponuda", text: "Generira osnovnu ponudu iz upita i šalje ju klijentu — automatski ili na vaše odobrenje." },
  { title: "Predaja čovjeku", text: "Kada je potrebno, urednim sažetkom prebacuje razgovor na vas ili kolegu." },
];

const faq: QaItem[] = [
  {
    q: "Što je AI recepcionar?",
    a: "AI recepcionar je sustav koji umjesto vas prima dolazne upite — pozive, poruke, e-mailove i upite s weba — te na njih odgovara u prirodnom razgovoru. Prikuplja podatke o klijentu i njegovoj potrebi, može zakazati termin ili pripremiti nacrt ponude, a složenije slučajeve prebacuje osobi iz tima.",
  },
  {
    q: "Kako radi AI recepcionar?",
    a: "Prvo se zapišu pravila: što nudite, kako izgleda cjenik, koja pitanja treba postaviti i kada razgovor ide čovjeku. Agent se zatim poveže s kanalima na kojima stižu upiti te s kalendarom, e-mailom ili CRM-om. Kad stigne upit, agent vodi razgovor prema tim pravilima i bilježi ishod na dogovoreno mjesto.",
  },
  {
    q: "Može li AI recepcionar govoriti hrvatski?",
    a: "Da. Agent je namijenjen hrvatskom tržištu i komunicira na hrvatskom jeziku, u tekstu i u glasovnom razgovoru. Ton i rječnik podešavaju se prema načinu na koji vaša tvrtka inače razgovara s klijentima, a po potrebi može odgovarati i na engleskom.",
  },
  {
    q: "Može li odgovarati na WhatsApp poruke?",
    a: "Da. WhatsApp se postavlja kao još jedan kanal uz web chat, e-mail i telefon, s istim pravilima i istim mjestom gdje završavaju podaci. Klijent tako dobiva isti odgovor bez obzira na to gdje je pisao.",
  },
  {
    q: "Može li zakazivati termine?",
    a: "Da, uz povezivanje s kalendarom koji već koristite. Agent provjerava slobodne termine, predlaže ih klijentu i upisuje potvrđeni termin prema vašim pravilima — trajanje, pauze, radno vrijeme i vrste usluga. Otkazivanja i pomicanja mogu se obraditi na isti način.",
  },
  {
    q: "Može li pripremati ponude?",
    a: "Da, kada postoji cjenik ili jasna pravila izračuna. Agent iz razgovora izvuče potrebne podatke, složi nacrt ponude i pošalje ga vama na pregled ili izravno klijentu, ovisno o tome kako želite raditi. Za nestandardne slučajeve agent samo priprema sažetak, a ponudu radi čovjek.",
  },
  {
    q: "Koliko košta AI recepcionar?",
    a: "Cijena ovisi o broju kanala, potrebnim integracijama i složenosti procesa, pa se određuje nakon kratkog razgovora. Na stranici Cijene opisani su paketi i što svaki obuhvaća, a konkretan iznos šaljemo u ponudi za vašu situaciju.",
  },
  {
    q: "Je li AI recepcionar GDPR usklađen?",
    a: "Postavljanje kreće od dogovora koji se podaci prikupljaju, gdje se spremaju i koliko dugo se čuvaju, uz načelo da se traži samo ono što je nužno za obradu upita. Obrada podataka na ovoj stranici opisana je u politici privatnosti i uvjetima korištenja. Usklađenost je zajednička odgovornost: mi postavljamo sustav prema dogovorenim pravilima, a vi kao voditelj obrade određujete svrhu obrade.",
  },
  {
    q: "AI recepcionar ili zaposlenik — kada što ima smisla?",
    a: "AI recepcionar je smislen za velik broj kratkih, ponavljajućih upita, za rad izvan radnog vremena i za brz prvi odgovor. Zaposlenik je i dalje potreban za pregovore, osjetljive situacije, stručnu procjenu i sve što traži prosudbu. U praksi se najčešće kombiniraju: agent hvata i priprema upite, čovjek preuzima one koji nose odluku.",
  },
];

const AIRecepcionar = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI recepcionar",
      serviceType: "AI recepcionar i obrada dolaznih upita",
      url: "https://myautomind.com/ai-recepcionar",
      provider: { "@type": "Organization", name: "Automind", url: "https://myautomind.com" },
      areaServed: { "@type": "Country", name: "Hrvatska" },
      availableLanguage: ["hr", "en"],
      description: "AI recepcionar koji odgovara na pozive, poruke i web upite te zakazuje termine i šalje ponude 24/7.",
    },
    faqSchema(faq),
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

      <QaSection
        title="AI recepcionar — kratki odgovori"
        intro="Najčešća pitanja prije uvođenja, s odgovorima bez marketinških obećanja."
        items={faq}
      />

      <RelatedLinks
        title="Povezane stranice"
        links={[
          { to: "/ai-agenti-hrvatska", label: "AI agenti u Hrvatskoj", text: "Vrste agenata i gdje se koriste." },
          { to: "/ai-automatizacija-poslovanja", label: "AI automatizacija poslovanja", text: "Kada treba posložiti cijeli proces." },
          { to: "/primjeri", label: "Primjeri", text: "Scenariji po djelatnostima i projekti." },
          { to: "/cijene", label: "Cijene", text: "Paketi i opseg svakog paketa." },
          { to: "/faq", label: "FAQ", text: "Dvadeset odgovora o radu sustava." },
          { to: "/blog/automatizacija-zakazivanja-termina", label: "Automatizacija zakazivanja", text: "Kako termini prestaju biti telefonski pingpong." },
        ]}
      />

      <CtaBlock />
    </PageShell>
  );
};

export default AIRecepcionar;
