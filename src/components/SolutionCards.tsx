import { Phone, MessageSquare, FileText, Mail, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const solutions = [
  { icon: Phone, title: "Voice agent", description: "Preuzima pozive umjesto vas i zakazuje sljedeći korak — prirodno, na hrvatskom.", span: "md:col-span-2", color: "text-accent", glow: "icon-glow", hover: "hover:border-accent/40", bg: "bg-accent/15", waveColor: "bg-accent", showWave: true, extraBorder: "border-accent/20" },
  { icon: MessageSquare, title: "Chat agent", description: "Odgovara klijentima na webu i porukama, 24/7, i prebaci razgovor kad treba čovjek.", span: "", color: "text-accent-pink", glow: "icon-glow-pink", hover: "hover:border-accent-pink/40", bg: "bg-accent-pink/15", waveColor: "", showWave: false },
  { icon: FileText, title: "Auto-ponude (PDF)", description: "Profesionalna ponuda u vašem stilu — pripremljena i poslana automatski.", span: "", color: "text-accent-amber", glow: "icon-glow-amber", hover: "hover:border-accent-amber/40", bg: "bg-accent-amber/15", waveColor: "", showWave: false },
  { icon: Mail, title: "E-mail follow-up", description: "Pravovremene poruke koje održavaju razgovor živim i vode klijenta do odluke.", span: "md:col-span-2", color: "text-accent-cyan", glow: "icon-glow-cyan", hover: "hover:border-accent-cyan/40", bg: "bg-accent-cyan/15", waveColor: "", showWave: false },
];

const Waveform = () => (
  <div className="absolute bottom-4 right-4 flex items-end gap-1 h-10 opacity-30 pointer-events-none">
    {[0, 0.15, 0.3, 0.45, 0.6, 0.45, 0.3].map((delay, i) => (
      <div
        key={i}
        className="w-1 h-full bg-accent rounded-full animate-wave"
        style={{ animationDelay: `${delay}s` }}
      />
    ))}
  </div>
);

const SolutionCards = () => {
  const { t } = useLanguage();
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="solutions" className="py-14 md:py-20 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.solutions.titleStart} <span className="gradient-text-rainbow">{t.solutions.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.solutions.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const [title, description] = t.solutions.cards[index];
            return (
              <ScrollReveal key={index} delay={index * 80} className={solution.span}>
                <div className={`relative overflow-hidden glass-card hover-lift p-6 group h-full transition-colors ${solution.hover} ${(solution as { extraBorder?: string }).extraBorder ?? ""}`}>
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-full ${solution.bg} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${solution.color} ${solution.glow}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  <a
                    href="#demo"
                    onClick={scrollToDemo}
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    {t.solutions.learnMore} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  {solution.showWave && <Waveform />}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;
