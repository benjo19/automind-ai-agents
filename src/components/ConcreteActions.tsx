import { FileText, MessageSquareText, PhoneCall, RefreshCw, UsersRound } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const actions = [
  {
    icon: MessageSquareText,
    title: "Odgovara na web i WhatsApp upite",
    description: "Klijent pošalje upit, AI odmah odgovara i sprema podatke.",
    color: "text-accent-cyan icon-glow-cyan",
  },
  {
    icon: PhoneCall,
    title: "Prima pozive i zapisuje zahtjeve",
    description: "AI voice agent razgovara na hrvatskom i šalje vam sažetak poziva.",
    color: "text-accent-pink icon-glow-pink",
  },
  {
    icon: FileText,
    title: "Šalje ponude automatski",
    description: "Iz upita generira osnovnu ponudu i šalje je vama na pregled ili direktno klijentu.",
    color: "text-accent-amber icon-glow-amber",
  },
  {
    icon: RefreshCw,
    title: "Podsjeća na follow-up",
    description: "Nijedan lead ne ostaje zaboravljen. Sustav vas podsjeća kada treba nazvati ili poslati poruku.",
    color: "text-accent-emerald icon-glow-emerald",
  },
  {
    icon: UsersRound,
    title: "Sprema leadove u CRM",
    description: "Svi kontakti, upiti i statusi nalaze se na jednom mjestu.",
    color: "text-accent icon-glow",
  },
];

const ConcreteActions = () => {
  const { t } = useLanguage();
  return (
    <section className="py-14 md:py-20 relative glow-bg">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.concreteActions.titleStart} <span className="gradient-text-rainbow">{t.concreteActions.titleHighlight}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const [title, description] = t.concreteActions.actions[index];
            return (
              <ScrollReveal key={action.title} delay={index * 80} className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
                <div className="glass-card hover-lift p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-5">
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConcreteActions;