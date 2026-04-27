import { Building2, Car, Hammer, Home, Scissors, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const industries = [
  { icon: Car, label: "Automehaničari i servisi", color: "text-accent-cyan icon-glow-cyan" },
  { icon: Scissors, label: "Frizerski i beauty saloni", color: "text-accent-pink icon-glow-pink" },
  { icon: Home, label: "Apartmani i turizam", color: "text-accent-amber icon-glow-amber" },
  { icon: Building2, label: "Nekretnine", color: "text-accent-emerald icon-glow-emerald" },
  { icon: Hammer, label: "Građevina i majstori", color: "text-accent icon-glow" },
  { icon: Sparkles, label: "Praonice i lokalne usluge", color: "text-accent-cyan icon-glow-cyan" },
];

const TargetIndustries = () => {
  const { t } = useLanguage();
  return (
    <section className="py-14 md:py-20 relative">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.targetIndustries.titleStart} <span className="gradient-text-rainbow">{t.targetIndustries.titleHighlight}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal key={industry.label} delay={index * 70}>
                <div className="glass-card hover-lift p-5 h-full flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex shrink-0 items-center justify-center">
                    <Icon className={`h-5 w-5 ${industry.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{t.targetIndustries.labels[index]}</h3>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetIndustries;