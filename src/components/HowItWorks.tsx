import { Settings, Link2, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const steps = [
  { icon: Settings, title: "Razgovor", description: "Upoznamo vaš posao, izazove i ciljeve — bez obveza.", step: "01", color: "text-accent-cyan", glow: "icon-glow-cyan", numColor: "text-accent-cyan/20" },
  { icon: Link2, title: "Prijedlog", description: "Dobivate prilagođeno rješenje s jasnim opsegom i rokovima.", step: "02", color: "text-accent-pink", glow: "icon-glow-pink", numColor: "text-accent-pink/20" },
  { icon: Rocket, title: "Pokretanje", description: "Postavljamo, povezujemo i ostajemo uz vas nakon lansiranja.", step: "03", color: "text-accent-emerald", glow: "icon-glow-emerald", numColor: "text-accent-emerald/20" },
];

const HowItWorks = () => {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.howItWorks.titleStart} <span className="gradient-text-rainbow">{t.howItWorks.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Animated connector line (desktop only) */}
            <div className="hidden md:block absolute top-[4.5rem] left-[18%] right-[18%] h-px pointer-events-none">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(var(--accent-cyan)), hsl(var(--accent-pink)), hsl(var(--accent-emerald)))",
                  maskImage:
                    "repeating-linear-gradient(to right, black 0 8px, transparent 8px 16px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to right, black 0 8px, transparent 8px 16px)",
                }}
              />
              <div className="absolute top-1/2 left-0 w-4 h-4 -translate-y-1/2 animate-arrow-slide text-accent-pink">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full drop-shadow-[0_0_6px_hsl(var(--accent-pink)/0.7)]">
                  <path d="M3 2l10 6-10 6V2z" />
                </svg>
              </div>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const [title, description] = t.howItWorks.steps[index];
              return (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="relative text-center">
                    <div className={`text-8xl font-bold ${step.numColor} absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 select-none`}>
                      {step.step}
                    </div>
                    <div className="relative z-10 mb-6 flex justify-center">
                      <div className="glass-card p-6 rounded-2xl inline-block">
                        <Icon className={`h-12 w-12 ${step.color} ${step.glow}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
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
