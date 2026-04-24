import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ROTATING_WORDS = ["odgovara", "prodaje", "zove", "organizira podatke"];

const AVATARS = [
  { initials: "MK", from: "from-accent", to: "to-accent-pink" },
  { initials: "AN", from: "from-accent-pink", to: "to-accent-amber" },
  { initials: "IN", from: "from-accent-cyan", to: "to-accent-emerald" },
  { initials: "JT", from: "from-accent-amber", to: "to-accent-pink" },
];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Multi-color radial glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[radial-gradient(ellipse,hsl(245_70%_65%/0.18)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[450px] bg-[radial-gradient(ellipse,hsl(320_85%_65%/0.14)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[400px] bg-[radial-gradient(ellipse,hsl(180_75%_55%/0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Decorative robot SVG (desktop only) */}
      <div
        className="hidden md:block absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-64 h-80 opacity-25 pointer-events-none animate-robot-float"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Antennas */}
          <line x1="70" y1="40" x2="70" y2="15" stroke="hsl(180 75% 55%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="130" y1="40" x2="130" y2="15" stroke="hsl(180 75% 55%)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="70" cy="12" r="3" stroke="hsl(180 75% 55%)" strokeWidth="1.5" fill="hsl(180 75% 55%)" fillOpacity="0.1" />
          <circle cx="130" cy="12" r="3" stroke="hsl(180 75% 55%)" strokeWidth="1.5" fill="hsl(180 75% 55%)" fillOpacity="0.1" />

          {/* Head */}
          <rect x="50" y="40" width="100" height="80" rx="20" stroke="hsl(245 70% 65%)" strokeWidth="1.5" fill="hsl(245 70% 65%)" fillOpacity="0.08" />

          {/* Eyes (pulsing) */}
          <circle cx="80" cy="78" r="7" fill="hsl(320 85% 65%)" fillOpacity="0.1" stroke="hsl(320 85% 65%)" strokeWidth="1.5" className="animate-pulse" />
          <circle cx="120" cy="78" r="7" fill="hsl(320 85% 65%)" fillOpacity="0.1" stroke="hsl(320 85% 65%)" strokeWidth="1.5" className="animate-pulse" />

          {/* Visor / mouth */}
          <line x1="78" y1="100" x2="122" y2="100" stroke="hsl(180 75% 55%)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Neck */}
          <rect x="85" y="120" width="30" height="14" rx="3" stroke="hsl(245 70% 65%)" strokeWidth="1.5" fill="hsl(245 70% 65%)" fillOpacity="0.08" />

          {/* Body */}
          <rect x="40" y="134" width="120" height="100" rx="14" stroke="hsl(245 70% 65%)" strokeWidth="1.5" fill="hsl(245 70% 65%)" fillOpacity="0.08" />

          {/* Body grid - vertical */}
          <line x1="70" y1="140" x2="70" y2="228" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="100" y1="140" x2="100" y2="228" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="130" y1="140" x2="130" y2="228" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />

          {/* Body grid - horizontal */}
          <line x1="46" y1="160" x2="154" y2="160" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="46" y1="184" x2="154" y2="184" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="46" y1="208" x2="154" y2="208" stroke="hsl(180 75% 55%)" strokeWidth="1" strokeOpacity="0.4" />

          {/* Core */}
          <circle cx="100" cy="184" r="9" stroke="hsl(320 85% 65%)" strokeWidth="1.5" fill="hsl(320 85% 65%)" fillOpacity="0.1" />

          {/* Arms */}
          <rect x="20" y="144" width="14" height="70" rx="6" stroke="hsl(245 70% 65%)" strokeWidth="1.5" fill="hsl(245 70% 65%)" fillOpacity="0.08" />
          <rect x="166" y="144" width="14" height="70" rx="6" stroke="hsl(245 70% 65%)" strokeWidth="1.5" fill="hsl(245 70% 65%)" fillOpacity="0.08" />
        </svg>
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
            {[
              { label: "GDPR-ready", color: "text-accent-emerald icon-glow-emerald" },
              { label: "HR voice", color: "text-accent-cyan icon-glow-cyan" },
              { label: "Aktivacija 24h", color: "text-accent-amber icon-glow-amber" },
            ].map((badge) => (
              <span key={badge.label} className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm">
                <CheckCircle2 className={`h-4 w-4 ${badge.color}`} />
                {badge.label}
              </span>
            ))}
          </div>

          {/* Heading with rotating word */}
          <h1 className="mb-6 font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up text-foreground" style={{ animationDelay: '0.3s' }}>
            AI koji{" "}
            <span className="relative inline-flex align-baseline justify-center" style={{ minWidth: "10ch" }}>
              <span
                key={wordIndex}
                className="inline-block animate-word-cycle gradient-text-rainbow"
              >
                {ROTATING_WORDS[wordIndex]},
              </span>
            </span>
            <br className="hidden sm:block" />
            {" "}za vas.
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

          {/* Social proof */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex -space-x-3">
              {AVATARS.map((a) => (
                <div
                  key={a.initials}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${a.from} ${a.to} ring-2 ring-background flex items-center justify-center text-xs font-semibold text-white shadow-md`}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Već koristi <span className="text-foreground font-semibold">46+ tvrtki</span> u Hrvatskoj
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
