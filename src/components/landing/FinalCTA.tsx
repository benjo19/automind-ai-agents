import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const FinalCTA = () => (
  <section className="section">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--foreground))] px-6 py-14 text-center sm:px-12 md:py-20">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,hsl(var(--accent))_0%,transparent_55%)] opacity-40" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Prestani gubiti upite dok radiš.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Postavi AI recepcionara u nekoliko dana — i nikad više ne propusti klijenta.
          </p>
          <div className="mt-8">
            <Button variant="hero" size="lg" onClick={() => scrollTo("demo")} className="group">
              Zatraži demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;
