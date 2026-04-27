import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const MissedLeadCost = () => {
  const { t } = useLanguage();
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20 relative glow-bg">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/60 to-transparent" />
            <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center">
              <AlertCircle className="h-7 w-7 text-accent-amber icon-glow-amber" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.missedLead.titleStart} <span className="gradient-text-rainbow">{t.missedLead.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.missedLead.text}
            </p>
            <Button variant="hero" size="lg" onClick={scrollToDemo} className="group">
              {t.missedLead.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MissedLeadCost;