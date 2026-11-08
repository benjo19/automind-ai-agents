import { Bot, Zap, CalendarClock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Bot,
    title: "AI Agenti",
    description: "Chat i voice agenti koji razgovaraju s klijentima na hrvatskom — kad ih trebate.",
    features: ["Chat na webu i porukama", "Voice agent za pozive", "Prebacivanje na čovjeka"],
    color: "text-accent",
    glow: "icon-glow",
    check: "text-accent",
  },
  {
    icon: Zap,
    title: "Automatizacija prodaje",
    description: "Ponude, follow-up i evidencija klijenata — automatski, bez gubljenja u administraciji.",
    features: ["Auto-ponude u vašem stilu", "Pravovremeni follow-up", "Pregled klijenata na jednom mjestu"],
    color: "text-accent-pink",
    glow: "icon-glow-pink",
    check: "text-accent-pink",
  },
  {
    icon: CalendarClock,
    title: "Zakazivanje i evidencija",
    description: "Termini, sažeci razgovora i leadovi povezani s vašim alatima.",
    features: ["Automatsko zakazivanje", "Sažeci poziva i upita", "CRM i kalendar integracije"],
    color: "text-accent-cyan",
    glow: "icon-glow-cyan",
    check: "text-accent-cyan",
  },
];

const Services = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-14 md:py-20 px-4 relative glow-bg scroll-mt-20">
      <div className="container mx-auto relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mb-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {t.services.title}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const content = t.services.cards[index];
            return (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="rounded-lg border border-border bg-card p-5 md:p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{content.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{content.description}</p>
                <ul className="space-y-2">
                  {content.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className={`${service.check} mt-0.5`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" asChild className="mt-auto pt-5 px-0 justify-start h-auto whitespace-normal">
                  <Link to={["/ai-recepcionar", "/ai-automatizacija-poslovanja", "/ai-agenti-hrvatska"][index]}>
                    {t.solutions.learnMore} <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
