import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "49",
    period: "/mj",
    description: "Web chat + Sheets, e-mail obavijesti, do 1.000 poruka",
    features: [
      "Web chat bot",
      "Google Sheets integracija",
      "E-mail obavijesti",
      "Do 1.000 poruka/mj",
      "Email podrška"
    ],
    highlighted: false
  },
  {
    name: "Pro",
    price: "149",
    period: "/mj",
    description: "WhatsApp/Telegram, PDF ponude, e-mail sekvence, prioritetna podrška",
    features: [
      "Sve iz Basic plana",
      "WhatsApp/Telegram integracija",
      "Auto-PDF ponude",
      "E-mail sekvence",
      "Do 5.000 poruka/mj",
      "Lead scoring",
      "Prioritetna podrška"
    ],
    highlighted: true
  },
  {
    name: "Premium",
    price: "299",
    period: "/mj",
    description: "Voice outbound, prilagodbe, CRM izvještaji & dashboard",
    features: [
      "Sve iz Pro plana",
      "Voice outbound pozivi",
      "Prilagođene integracije",
      "CRM dashboard & izvještaji",
      "Neograničeno poruka",
      "White-label opcija",
      "Dedicirani support"
    ],
    highlighted: false
  }
];

const Pricing = () => {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32 relative bg-gradient-to-b from-secondary/20 to-background">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Jednostavni <span className="gradient-text">planovi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Odaberite plan koji najbolje odgovara vašim potrebama
          </p>
          <p className="text-sm text-muted-foreground">
            + trošak trećih servisa (OpenAI/Make/Vapi)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-xl relative transition-all duration-300 hover:scale-105 animate-fade-in ${
                plan.highlighted ? 'border-2 border-neon-purple glow-purple' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-hero px-4 py-1 rounded-full text-sm font-semibold">
                    <Star className="h-4 w-4" />
                    Najpopularniji
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-5xl font-bold gradient-text">{plan.price}€</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground min-h-[3rem]">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "hero-outline"}
                className="w-full"
                onClick={scrollToDemo}
              >
                Odaberi plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
