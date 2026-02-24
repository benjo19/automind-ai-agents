import { Settings, Link2, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { icon: Settings, title: "Postavke", description: "Sheets (Postavke/Leads/Razgovori), Docs predložak, cjenici.", step: "01" },
  { icon: Link2, title: "Poveži", description: "Automatski povezujemo sve vaše sustave - forme, AI, email, poruke.", step: "02" },
  { icon: Rocket, title: "Kreni", description: "Bot odgovara, šalje PDF, pokreće e-mail sekvencu, bilježi u CRM.", step: "03" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative glow-bg">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Kako <span className="gradient-text">radi</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tri jednostavna koraka do potpune automatizacije
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="relative text-center">
                    <div className="text-8xl font-bold text-foreground/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 select-none">
                      {step.step}
                    </div>
                    <div className="relative z-10 mb-6 flex justify-center">
                      <div className="glass-card p-6 rounded-2xl inline-block">
                        <Icon className="h-12 w-12 text-accent icon-glow" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
