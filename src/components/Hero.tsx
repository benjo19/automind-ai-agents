import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img src={logo} alt="Automind logo" className="h-24 md:h-32 w-auto invert" />
          </div>

          {/* Tagline */}
          <p className="mb-6 text-sm md:text-base tracking-[0.3em] text-muted-foreground font-light uppercase">
            Automatiziraj. Optimiziraj. Napreduj.
          </p>

          {/* Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <span className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              GDPR-ready
            </span>
            <span className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              HR voice
            </span>
            <span className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Aktivacija 24h
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI koji odgovara, prodaje, zove i šalje ponude za vas.
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Chat + Voice agenti. Pametne integracije, jednostavni CRM, auto-PDF ponude i e-mail sekvence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
