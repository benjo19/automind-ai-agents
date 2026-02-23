import { Settings, Link2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Postavke",
    description: "Sheets (Postavke/Leads/Razgovori), Docs predložak, cjenici.",
    step: "01"
  },
  {
    icon: Link2,
    title: "Poveži",
    description: "Automatski povezujemo sve vaše sustave - forme, AI, email, poruke.",
    step: "02"
  },
  {
    icon: Rocket,
    title: "Kreni",
    description: "Bot odgovara, šalje PDF, pokreće e-mail sekvencu, bilježi u CRM.",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
            Kako <span className="gradient-text">radi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tri jednostavna koraka do potpune automatizacije
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step Number */}
                  <div className="text-8xl font-bold text-foreground/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="glass-card p-6 rounded-2xl inline-block">
                      <Icon className="h-12 w-12 text-accent" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-full w-full h-px bg-gradient-to-r from-foreground/20 to-transparent -z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
