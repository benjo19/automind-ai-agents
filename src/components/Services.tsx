import { Bot, Zap, Code } from "lucide-react";
import laptopImg from "@/assets/professional-laptop.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: Bot,
    title: "AI Agenti",
    description: "Chat i voice agenti koji razgovaraju s klijentima na hrvatskom — kad ih trebate.",
    features: ["Chat na webu i porukama", "Voice agent za pozive", "Prebacivanje na čovjeka"],
  },
  {
    icon: Zap,
    title: "Automatizacija prodaje",
    description: "Ponude, follow-up i evidencija klijenata — automatski, bez gubljenja u administraciji.",
    features: ["Auto-ponude u vašem stilu", "Pravovremeni follow-up", "Pregled klijenata na jednom mjestu"],
  },
  {
    icon: Code,
    title: "Web stranice",
    description: "Moderni, brzi i responzivni web — od landing stranica do kompleksnijih projekata.",
    features: ["Landing stranice", "Web shopovi", "SEO i održavanje"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-14 md:py-20 px-4 relative glow-bg scroll-mt-20">
      <div className="container mx-auto relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12 md:mb-16">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 tracking-tight gradient-text">
                Naše usluge
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Razgovaramo, slušamo, predlažemo rješenje koje ima smisla baš za vaš posao.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={laptopImg} alt="Profesionalno rješenje za vaš posao" className="w-full h-64 lg:h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="glass-card hover-lift p-6 group h-full">
                <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-accent icon-glow" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
