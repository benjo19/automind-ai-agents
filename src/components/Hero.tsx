import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BADGES = [
  { label: "Aktivacija u 7 dana", color: "text-accent-amber icon-glow-amber" },
  { label: "Hrvatski jezik i glas", color: "text-accent-cyan icon-glow-cyan" },
  { label: "GDPR-ready", color: "text-accent-emerald icon-glow-emerald" },
  { label: "Bez tehničkog znanja", color: "text-accent-pink icon-glow-pink" },
];

const Hero = () => {
  const { t } = useLanguage();
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
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[radial-gradient(ellipse,hsl(160_60%_30%/0.10)_0%,transparent_70%)] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[450px] bg-[radial-gradient(ellipse,hsl(44_55%_48%/0.09)_0%,transparent_70%)] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[400px] bg-[radial-gradient(ellipse,hsl(160_70%_22%/0.08)_0%,transparent_70%)] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>




      {/* Content */}
      <div className="container relative z-10 px-4 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tagline */}
          <p className="mb-6 text-sm md:text-base tracking-[0.3em] text-muted-foreground font-light uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t.hero.tagline}
          </p>

          {/* Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {BADGES.map((badge, index) => (
              <span key={badge.label} className="glass-card inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                <CheckCircle2 className={`h-4 w-4 ${badge.color}`} />
                {t.hero.badges[index]}
              </span>
            ))}
          </div>

          {/* Heading with rotating word */}
          <h1 className="mb-6 font-playfair text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up text-foreground" style={{ animationDelay: '0.3s' }}>
            {t.hero.title}
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToDemo}
              className="group"
            >
              {t.hero.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              onClick={scrollToHowItWorks}
            >
              {t.hero.secondaryCta}
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
              {t.hero.proof}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
