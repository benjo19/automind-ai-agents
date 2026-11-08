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
      {/* Content */}
      <div className="container relative z-10 px-4 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tagline */}
          <p className="mb-6 text-sm md:text-base tracking-[0.3em] text-muted-foreground font-light uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t.hero.tagline}
          </p>

          {/* Heading with rotating word */}
          <h1 className="hero-title mb-6 text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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

          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {BADGES.map((badge, index) => (
              <span key={badge.label} className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {t.hero.badges[index]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
