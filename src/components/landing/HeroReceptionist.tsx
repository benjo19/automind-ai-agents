import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMockup from "./ChatMockup";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const HeroReceptionist = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent-soft))_0%,transparent_60%)]" />
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="eyebrow mb-5">AI recepcionar za lokalne biznise</span>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              AI recepcionar koji odgovara dok vi radite
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-xl">
              AutoMind preuzima propuštene pozive, poruke i upite, kvalificira klijente i pretvara ih u rezervacije ili dogovorene termine.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => scrollTo("demo")} className="group">
                Zatraži demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="hero-outline" size="lg" onClick={() => scrollTo("how-it-works")}>
                Pogledaj kako radi
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Za salone, praonice, servise, ordinacije i lokalne uslužne biznise.
            </p>
          </div>

          <div className="relative">
            <ChatMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroReceptionist;
