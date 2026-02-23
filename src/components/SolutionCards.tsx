import { Phone, MessageSquare, FileText, Mail, Target, BarChart3, Globe } from "lucide-react";

const solutions = [
  {
    icon: Phone,
    title: "Voice bot koji zove",
    description: "HR glas, live transkript, zakazivanje follow-upa.",
  },
  {
    icon: MessageSquare,
    title: "Chat koji zatvara",
    description: "Web/WhatsApp/Telegram, daje cijene, prebacuje na čovjeka.",
  },
  {
    icon: FileText,
    title: "Auto-ponude (PDF)",
    description: "Google Docs → PDF s logom, uvjetima i cijenama.",
  },
  {
    icon: Mail,
    title: "E-mail sekvence",
    description: "Zahvalnica, ponuda, podsjetnik + mogućnost odjave.",
  },
  {
    icon: Target,
    title: "Lead collecting + scoring",
    description: "UTM tracking, hot lead pravila, Telegram alert.",
  },
  {
    icon: BarChart3,
    title: "Mini-CRM + Analytics",
    description: "Faze (NEW/WON/LOST), dashboard, ROI i izvještaji.",
  },
  {
    icon: Globe,
    title: "Web scraping",
    description: "Automatsko prikupljanje podataka - cijene konkurencije, tržišni trendovi.",
  }
];

const SolutionCards = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
            Kompletno <span className="gradient-text">AI rješenje</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sve što vam treba za automatizaciju prodaje i podrške
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-xl hover:scale-105 transition-all duration-300 group animate-fade-in hover:border-foreground/15"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;
