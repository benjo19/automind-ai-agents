import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Koliko brzo možemo krenuti?",
    answer: "U 24h s gotovim predlošcima. Naš tim priprema sve potrebne postavke i integracije prema vašim specifikacijama."
  },
  {
    question: "Je li moguć white-label?",
    answer: "Da, vaši logotipi i API ključevi. Možete potpuno prilagoditi brand i izgled prema vašim potrebama."
  },
  {
    question: "Podržavate li hrvatski voice?",
    answer: "Da, HR glasovi + ASR (automatsko prepoznavanje govora). Koristimo najnovije AI modele za prirodan hrvatski govor."
  },
  {
    question: "Kako funkcionira model naplate?",
    answer: "Mjesečno + trošak trećih servisa. Fiksna mjesečna pretplata plus varijabilni troškovi prema korištenju AI servisa i integracija."
  },
  {
    question: "Mogu li integrirati s postojećim sustavima?",
    answer: "Da, radimo prilagođene integracije s vašim CRM-om, ERP-om ili drugim poslovnim alatima putem API-ja i webhookova."
  },
  {
    question: "Što ako trebam podršku?",
    answer: "Basic plan: email podrška. Pro plan: prioritetna podrška. Premium plan: dedicirani support manager dostupan u realnom vremenu."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Često postavljana <span className="gradient-text">pitanja</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Odgovori na najčešća pitanja o Automind platformi
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="glass-card p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-neon-cyan transition-colors">
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
      </div>
    </section>
  );
};

export default FAQ;
