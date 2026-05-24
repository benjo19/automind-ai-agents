import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS: [string, string][] = [
  ["Je li AI na hrvatskom?", "Da. AutoMind komunicira prirodnim hrvatskim jezikom — i u pismu i glasom — s razumijevanjem lokalnih izraza."],
  ["Može li preuzeti WhatsApp?", "Može. Povezujemo službeni WhatsApp Business broj i AI odgovara direktno klijentima u istom razgovoru."],
  ["Što ako klijent pita nešto komplicirano?", "Ako AI procijeni da je upit izvan njegovog opsega, automatski vas obavijesti i prebaci razgovor čovjeku."],
  ["Trebam li mijenjati postojeću stranicu?", "Ne. AutoMind se dodaje na vašu postojeću stranicu jednim retkom koda — za nekoliko minuta."],
  ["Koliko traje postavljanje?", "Tipično 3 do 7 dana — od prvog razgovora do aktivnog AI recepcionara prilagođenog vašem biznisu."],
];

const FAQReceptionist = () => (
  <section id="faq" className="section scroll-mt-20 surface-muted">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Česta pitanja
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-2xl card-elevated px-2 sm:px-6">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQReceptionist;
