import { Settings, Link2, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { icon: Settings, title: "Razgovor", description: "Upoznamo vaš posao, izazove i ciljeve — bez obveza.", step: "01" },
  { icon: Link2, title: "Prijedlog", description: "Dobivate prilagođeno rješenje s jasnim opsegom i rokovima.", step: "02" },
  { icon: Rocket, title: "Pokretanje", description: "Postavljamo, povezujemo i ostajemo uz vas nakon lansiranja.", step: "03" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Kako <span className="gradient-text">radi</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tri jednostavna koraka — od prvog razgovora do gotovog rješenja
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
