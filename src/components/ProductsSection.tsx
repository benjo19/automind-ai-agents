import { ArrowRight, Bot, CalendarCheck, ClipboardList, PhoneCall, ShoppingCart, Truck, Workflow } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductsSection = () => {
  const navigate = useNavigate();

  const goToOrderly = () => {
    navigate("/#orderly");
    setTimeout(() => {
      document.getElementById("orderly")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <section id="proizvodi" className="relative py-16 md:py-24 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">Automind proizvodi</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Gotovi sustavi za procese koji troše najviše vremena.</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Uz automatizacije po mjeri razvijamo vlastite proizvode za tvrtke različitih djelatnosti — od nabave do AI telefonskih agenata koji preuzimaju pozive i rutinske zadatke.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="group rounded-3xl border border-foreground/10 bg-foreground/[0.025] p-6 md:p-8 transition-all hover:border-accent/35 hover:bg-foreground/[0.04]">
            <div className="flex items-start justify-between gap-4 mb-7">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border border-foreground/10 rounded-full px-3 py-1.5">B2B SaaS</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Orderly</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Centralizirana nabava za restorane i više lokacija. Zahtjevi osoblja, grupiranje po dobavljačima, odobravanje, narudžbenice i zaprimanje robe na jednom mjestu.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-accent" /> Zahtjevi i narudžbenice</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent" /> Dobavljači i zaprimanje</div>
            </div>
            <Button variant="outline" onClick={goToOrderly} className="group/btn">
              Pogledaj Orderly <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 via-accent-pink/5 to-accent-cyan/10 p-6 md:p-8 transition-all hover:border-accent/45">
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 rounded-full px-3 py-1.5">AI Voice</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">AI Voice Agent</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                AI telefonski agent za sve djelatnosti. Prima i obrađuje pozive, odgovara na pitanja, zakazuje termine, kvalificira upite, prima narudžbe i povezuje se s vašim poslovnim sustavima.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-accent" /> AI pozivi 24/7</div>
                <div className="flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-accent" /> Termini i upiti</div>
                <div className="flex items-center gap-2"><Workflow className="w-4 h-4 text-accent" /> CRM i integracije</div>
              </div>
              <Button variant="hero" asChild className="group/btn">
                <Link to="/proizvodi/orderflow">
                  Pogledaj AI Voice Agent <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
