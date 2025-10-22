import { Bot, Zap, Globe } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Agenti",
    description: "Inteligentni chat i voice agenti koji razgovaraju s klijentima 24/7, odgovaraju na pitanja i vode kroz proces kupnje.",
    features: [
      "Chat bot na web stranici",
      "Voice bot za telefonske pozive",
      "Podrška za hrvatski jezik",
      "Integracija s CRM sustavom"
    ],
    color: "text-neon-purple",
    gradient: "from-neon-purple/20 to-transparent"
  },
  {
    icon: Zap,
    title: "Automatizacija prodaje",
    description: "Automatski generirani PDF dokumenti, email sekvence i praćenje klijenata kroz prodajni proces.",
    features: [
      "Auto-ponude i invoice",
      "Email marketing sekvence",
      "Mini-CRM dashboard",
      "Make.com integracije"
    ],
    color: "text-neon-cyan",
    gradient: "from-neon-cyan/20 to-transparent"
  },
  {
    icon: Globe,
    title: "Web scraping & Analitika",
    description: "Prikupljanje podataka o konkurenciji, tržišnim trendovima i ROI izvještaji za donošenje boljih poslovnih odluka.",
    features: [
      "Praćenje cijena konkurencije",
      "Prikupljanje lead podataka",
      "Analytics dashboard",
      "Izvještaji o performansama"
    ],
    color: "text-neon-purple",
    gradient: "from-neon-purple/20 to-transparent"
  }
];

const Services = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Naše usluge
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Kompletan AI ekosustav za automatizaciju i optimizaciju vašeg poslovanja
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 ${service.color}`}>
                {service.title}
              </h3>
              
              <p className="text-white/70 mb-6">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className={`${service.color} mt-1`}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
