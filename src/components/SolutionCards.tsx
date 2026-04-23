import { Phone, MessageSquare, FileText, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const solutions = [
  { icon: Phone, title: "Voice agent", description: "Preuzima pozive umjesto vas i zakazuje sljedeći korak — prirodno, na hrvatskom.", span: "md:col-span-2" },
  { icon: MessageSquare, title: "Chat agent", description: "Odgovara klijentima na webu i porukama, 24/7, i prebaci razgovor kad treba čovjek.", span: "" },
  { icon: FileText, title: "Auto-ponude (PDF)", description: "Profesionalna ponuda u vašem stilu — pripremljena i poslana automatski.", span: "" },
  { icon: Mail, title: "E-mail follow-up", description: "Pravovremene poruke koje održavaju razgovor živim i vode klijenta do odluke.", span: "md:col-span-2" },
];

const SolutionCards = () => {
  return (
    <section id="solutions" className="py-14 md:py-20 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Što <span className="gradient-text">gradimo za vas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Svako rješenje je prilagođeno vašem poslu — bez gotovih paketa.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal key={index} delay={index * 80} className={solution.span}>
                <div className="glass-card hover-lift p-6 group h-full">
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-accent icon-glow" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;
