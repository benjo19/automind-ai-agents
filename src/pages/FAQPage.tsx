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

      <CtaBlock />
    </PageShell>
  );
};

export default FAQPage;
