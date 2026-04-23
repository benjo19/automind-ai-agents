import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  { question: "Kako izgleda suradnja?", answer: "Nakon kratkog razgovora pripremamo prijedlog rješenja prilagođen vašim potrebama, s jasnim opsegom i rokovima — bez fiksnih paketa." },
  { question: "Koliko brzo možemo krenuti?", answer: "Najčešće u 24h. Naš tim priprema sve potrebne postavke prema vašim specifikacijama." },
  { question: "Je li rješenje prilagođeno baš nama?", answer: "Da. Svaki projekt kreće od razgovora — ne nudimo gotove pakete, već rješenje koje ima smisla za vaše poslovanje." },
  { question: "Što ako trebam podršku?", answer: "Pružamo kontinuiranu podršku putem emaila, a po potrebi i prioritetnu podršku s bržim vremenom odgovora — sve dogovaramo individualno." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Često postavljana <span className="gradient-text">pitanja</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Odgovori na najčešća pitanja o Automind platformi
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 rounded-xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
