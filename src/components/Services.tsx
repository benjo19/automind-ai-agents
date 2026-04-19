import { Bot, Zap, Globe, Code } from "lucide-react";
import laptopImg from "@/assets/professional-laptop.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: Bot,
    title: "AI Agenti",
    description: "Inteligentni chat i voice agenti koji razgovaraju s klijentima 24/7, odgovaraju na pitanja i vode kroz proces kupnje.",
    features: ["Chat bot na web stranici", "Voice bot za telefonske pozive", "Podrška za hrvatski jezik", "Integracija s CRM sustavom"],
  },
  {
    icon: Zap,
    title: "Automatizacija prodaje",
    description: "Automatski generirani PDF dokumenti, email sekvence i praćenje klijenata kroz prodajni proces.",
    features: ["Auto-ponude i invoice", "Email marketing sekvence", "Mini-CRM dashboard", "Automatizirane integracije"],
  },
  {
    icon: Globe,
    title: "Web scraping & Analitika",
    description: "Prikupljanje podataka o konkurenciji, tržišnim trendovima i ROI izvještaji za donošenje boljih poslovnih odluka.",
    features: ["Praćenje cijena konkurencije", "Prikupljanje lead podataka", "Analytics dashboard", "Izvještaji o performansama"],
  },
  {
    icon: Code,
    title: "Web stranice",
    description: "Moderni, brzi i responzivni web. Od landing stranica do kompleksnih web aplikacija.",
    features: ["Landing stranice", "Web shopovi", "SEO optimizacija", "Hosting i održavanje"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 relative glow-bg scroll-mt-20">
      <div className="container mx-auto relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 tracking-tight gradient-text">
                Naše usluge
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Kompletan AI ekosustav za automatizaciju i optimizaciju vašeg poslovanja
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={laptopImg} alt="Profesionalno rješenje za vaš posao" className="w-full h-64 lg:h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="glass-card hover-lift p-8 group h-full">
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
