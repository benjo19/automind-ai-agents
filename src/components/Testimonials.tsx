import { Quote, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  { quote: "Chat na webu hvata upite i navečer i vikendom — više nam ne bježe potencijalni klijenti dok ne stignemo odgovoriti.", author: "Marko H.", company: "Mali obrt, Zagreb" },
  { quote: "Automatske ponude su nam stvarno olakšale dan. Umjesto pola sata, ponuda ode u par minuta i izgleda profesionalno.", author: "Ana K.", company: "Uslužna djelatnost" },
  { quote: "Postavili smo sve brzo i bez komplikacija. Tim je bio dostupan za pitanja i prilagodbe nakon pokretanja.", author: "Ivan N.", company: "Lokalni poduzetnik" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Što kažu <span className="gradient-text-rainbow">naši klijenti</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((t, index) => {
            const isMiddle = index === 1;
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <div
                  className={`glass-card p-6 md:p-8 rounded-2xl text-center h-full flex flex-col ${
                    isMiddle ? "md:scale-105 shadow-glow border-accent/30" : ""
                  }`}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-accent-amber fill-current icon-glow-amber"
                      />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-accent-pink icon-glow-pink mx-auto mb-4 opacity-60" />
                  <p className="text-base md:text-lg mb-6 leading-relaxed flex-1">"{t.quote}"</p>

                  <div className="flex items-center justify-center gap-3 mt-auto">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(t.author)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                      alt={t.author}
                      loading="lazy"
                      className="w-12 h-12 rounded-full bg-secondary"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-sm">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.company}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
