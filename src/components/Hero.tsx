import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const [quickEmail, setQuickEmail] = useState("");

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickLead = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = quickEmail.trim();
    if (!trimmed) return;
    try {
      sessionStorage.setItem("prefill_email", trimmed);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    scrollToDemo();
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,hsl(245_58%_60%/0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tagline */}
          <p className="mb-6 text-sm md:text-base tracking-[0.3em] text-muted-foreground font-light uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Automatiziraj. Optimiziraj. Napreduj.
          </p>

          {/* Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {["GDPR-ready", "HR voice", "Aktivacija 24h"].map((badge) => (
              <span key={badge} className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent icon-glow" />
                {badge}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up gradient-text" style={{ animationDelay: '0.3s' }}>
            AI koji odgovara, prodaje, zove i šalje ponude za vas.
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Prilagođena AI rješenja za vaš posao — od prvog razgovora do pokretanja.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToDemo}
              className="group"
            >
              Zatraži demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="hero-outline" 
              size="lg"
              onClick={scrollToHowItWorks}
            >
              Kako radi
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
