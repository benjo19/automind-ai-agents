import { Phone, MessageSquare, FileText, Mail, Target, BarChart3, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const solutions = [
  { icon: Phone, title: "Voice bot koji zove", description: "Automatski pozivi s HR glasom, live transkript i zakazivanje follow-upa.", span: "md:col-span-2" },
  { icon: MessageSquare, title: "Chat koji zatvara", description: "Web, WhatsApp i Telegram — daje cijene, odgovara i prebacuje na čovjeka.", span: "" },
  { icon: FileText, title: "Auto-ponude (PDF)", description: "Google Docs → PDF s logom, uvjetima i cijenama. U minuti.", span: "" },
  { icon: Mail, title: "E-mail sekvence", description: "Zahvalnica, ponuda, podsjetnik — automatski, s mogućnošću odjave.", span: "" },
  { icon: Target, title: "Lead scoring", description: "UTM tracking, hot lead pravila i Telegram alert kad netko čeka.", span: "" },
  { icon: BarChart3, title: "Mini-CRM + Analytics", description: "Faze (NEW/WON/LOST), dashboard s ROI-em i izvještaji.", span: "" },
  { icon: Globe, title: "Web scraping", description: "Cijene konkurencije, tržišni trendovi — automatski, svaki dan.", span: "md:col-span-2" },
];

const SolutionCards = () => {
  return (
    <section className="py-20 md:py-32 relative glow-bg">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Kompletno <span className="gradient-text">AI rješenje</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sve što vam treba za automatizaciju prodaje i podrške
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal key={index} delay={index * 80} className={solution.span}>
                <div className="glass-card hover-lift p-8 group h-full">
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
