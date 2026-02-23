import { X, Check } from "lucide-react";
import callAgentImg from "@/assets/call-agent.jpg";

const BeforeAfter = () => {
  const before = [
    "Ručni odgovori na upite",
    "Izgubljeni leadovi",
    "Kašnjenje s ponudama",
    "Zaboravljeni follow-upovi"
  ];

  const after = [
    "AI odgovara 24/7",
    "Svaki lead bilježen",
    "Auto-ponuda u minuti",
    "Follow-up bez zaborava"
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
            Prije i <span className="gradient-text">poslije</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Before */}
          <div className="glass-card p-8 rounded-xl border border-destructive/20 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <X className="h-8 w-8 text-destructive" />
              Prije
            </h3>
            <ul className="space-y-4">
              {before.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Image */}
          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img 
                src={callAgentImg} 
                alt="AI agent u akciji" 
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* After */}
          <div className="glass-card p-8 rounded-xl border border-accent/30 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Check className="h-8 w-8 text-accent" />
              Poslije
            </h3>
            <ul className="space-y-4">
              {after.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
