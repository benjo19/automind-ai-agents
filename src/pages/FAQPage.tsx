import PageShell, { PageHero, CtaBlock } from "@/components/PageShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n";

const FAQPage = () => {
  const { t } = useLanguage();
  const items = t.faq.items;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <PageShell
      path="/faq"
      title="FAQ — Automind | Često postavljana pitanja"
      description="Odgovori na 20 najčešćih pitanja o Automind AI recepcionaru — kako radi, koliko traje postavljanje, sigurnost i cijene."
      schema={schema}
    >
      <PageHero
        eyebrow="FAQ"
        title="Često postavljana pitanja."
        subtitle="Sve što biste pitali prije nego što javite — odgovori na 20 najčešćih pitanja o Automindu."
      />

      <section className="container px-4 max-w-3xl mx-auto py-8">
        <div className="rounded-2xl border border-foreground/10 bg-white/60 p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map(([q, a], i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  <span className="flex items-start gap-3">
                    <span className="text-accent text-xs font-mono mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container px-4 max-w-3xl mx-auto py-10">
        <div className="p-8 rounded-2xl border border-foreground/10 bg-white/60">
          <h2 className="text-2xl font-bold tracking-tight mb-3">O Automindu</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Automind postavlja AI recepcionara i automatizaciju upita za lokalne uslužne tvrtke u Hrvatskoj. Radimo na
            hrvatskom jeziku, s alatima koje tvrtke već koriste — kalendar, e-mail, tablice i CRM — i s procesima koji
            se prije uvođenja zapišu, testiraju i tek onda puste uživo.
          </p>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
            <li>Sjedište i rad: Zagreb, Hrvatska.</li>
            <li>Jezici komunikacije: hrvatski i engleski.</li>
            <li>Kontakt: auto.mind.ai2025@gmail.com, +385 99 508 5933.</li>
            <li>Obrada podataka opisana je u politici privatnosti i uvjetima korištenja.</li>
          </ul>
        </div>
      </section>

      <RelatedLinks
        title="Povezane stranice"
        links={[
          { to: "/ai-recepcionar", label: "AI recepcionar", text: "Kratki odgovori o radu sustava." },
          { to: "/ai-automatizacija-poslovanja", label: "AI automatizacija poslovanja", text: "Širi zahvat od jednog kanala." },
          { to: "/ai-agenti-hrvatska", label: "AI agenti u Hrvatskoj", text: "Vrste agenata i njihove granice." },
          { to: "/primjeri", label: "Primjeri", text: "Scenariji i projektni primjer." },
          { to: "/cijene", label: "Cijene", text: "Paketi i opseg." },
          { to: "/blog", label: "Blog", text: "Vodiči i objašnjenja." },
        ]}
      />

      <CtaBlock />
    </PageShell>
  );
};

export default FAQPage;
